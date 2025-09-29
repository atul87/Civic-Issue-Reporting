
-- =================================================================
-- DATABASE MIGRATION AND MAINTENANCE SCRIPTS
-- Civic Issue Reporting System
-- =================================================================

-- =================================================================
-- MIGRATION SCRIPT - Version 1.1 (Add Analytics Tables)
-- =================================================================

-- Create analytics summary table for faster reporting
CREATE TABLE IF NOT EXISTS analytics_summary (
    id SERIAL PRIMARY KEY,
    date_recorded DATE DEFAULT CURRENT_DATE,
    total_reports INTEGER,
    pending_reports INTEGER,
    resolved_reports INTEGER,
    critical_reports INTEGER,
    high_priority_reports INTEGER,
    avg_resolution_time_hours DECIMAL(10,2),
    top_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update analytics daily
CREATE OR REPLACE FUNCTION update_daily_analytics()
RETURNS void AS $$
DECLARE
    report_date DATE := CURRENT_DATE;
    total_count INTEGER;
    pending_count INTEGER;
    resolved_count INTEGER;
    critical_count INTEGER;
    high_count INTEGER;
    avg_resolution DECIMAL(10,2);
    top_cat VARCHAR(50);
BEGIN
    -- Calculate metrics
    SELECT COUNT(*) INTO total_count FROM reports WHERE DATE(created_at) = report_date;
    SELECT COUNT(*) INTO pending_count FROM reports WHERE status != 'Resolved' AND DATE(created_at) = report_date;
    SELECT COUNT(*) INTO resolved_count FROM reports WHERE status = 'Resolved' AND DATE(resolved_at) = report_date;
    SELECT COUNT(*) INTO critical_count FROM reports WHERE priority = 'Critical' AND DATE(created_at) = report_date;
    SELECT COUNT(*) INTO high_count FROM reports WHERE priority = 'High' AND DATE(created_at) = report_date;

    -- Calculate average resolution time in hours
    SELECT AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) 
    INTO avg_resolution 
    FROM reports 
    WHERE resolved_at IS NOT NULL AND DATE(resolved_at) = report_date;

    -- Get top category for the day
    SELECT c.name INTO top_cat
    FROM reports r
    JOIN categories c ON r.category_id = c.id
    WHERE DATE(r.created_at) = report_date
    GROUP BY c.name
    ORDER BY COUNT(*) DESC
    LIMIT 1;

    -- Insert or update analytics record
    INSERT INTO analytics_summary (
        date_recorded, total_reports, pending_reports, resolved_reports,
        critical_reports, high_priority_reports, avg_resolution_time_hours, top_category
    ) VALUES (
        report_date, total_count, pending_count, resolved_count,
        critical_count, high_count, avg_resolution, top_cat
    )
    ON CONFLICT (date_recorded) DO UPDATE SET
        total_reports = EXCLUDED.total_reports,
        pending_reports = EXCLUDED.pending_reports,
        resolved_reports = EXCLUDED.resolved_reports,
        critical_reports = EXCLUDED.critical_reports,
        high_priority_reports = EXCLUDED.high_priority_reports,
        avg_resolution_time_hours = EXCLUDED.avg_resolution_time_hours,
        top_category = EXCLUDED.top_category;
END;
$$ LANGUAGE plpgsql;

-- Create index on date for analytics
CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_date ON analytics_summary(date_recorded);

-- =================================================================
-- MAINTENANCE PROCEDURES
-- =================================================================

-- Function to archive old resolved reports (older than 1 year)
CREATE OR REPLACE FUNCTION archive_old_reports()
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER;
BEGIN
    -- Create archive table if not exists
    CREATE TABLE IF NOT EXISTS reports_archive (LIKE reports INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS report_history_archive (LIKE report_history INCLUDING ALL);
    CREATE TABLE IF NOT EXISTS report_attachments_archive (LIKE report_attachments INCLUDING ALL);

    -- Move old resolved reports to archive
    WITH archived_reports AS (
        DELETE FROM reports 
        WHERE status = 'Resolved' 
        AND resolved_at < CURRENT_DATE - INTERVAL '1 year'
        RETURNING *
    )
    INSERT INTO reports_archive SELECT * FROM archived_reports;

    GET DIAGNOSTICS archived_count = ROW_COUNT;

    -- Move related history records
    WITH archived_history AS (
        DELETE FROM report_history 
        WHERE report_id IN (SELECT id FROM reports_archive)
        RETURNING *
    )
    INSERT INTO report_history_archive SELECT * FROM archived_history;

    -- Move related attachments
    WITH archived_attachments AS (
        DELETE FROM report_attachments 
        WHERE report_id IN (SELECT id FROM reports_archive)
        RETURNING *
    )
    INSERT INTO report_attachments_archive SELECT * FROM archived_attachments;

    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up orphaned records
CREATE OR REPLACE FUNCTION cleanup_orphaned_records()
RETURNS void AS $$
BEGIN
    -- Remove orphaned report history
    DELETE FROM report_history 
    WHERE report_id NOT IN (SELECT id FROM reports);

    -- Remove orphaned attachments
    DELETE FROM report_attachments 
    WHERE report_id NOT IN (SELECT id FROM reports);

    -- Update statistics
    ANALYZE reports;
    ANALYZE report_history;
    ANALYZE report_attachments;
END;
$$ LANGUAGE plpgsql;

-- Function to update report priority based on age and category
CREATE OR REPLACE FUNCTION auto_escalate_priority()
RETURNS INTEGER AS $$
DECLARE
    escalated_count INTEGER;
BEGIN
    -- Escalate high priority reports that are pending for more than 24 hours
    UPDATE reports 
    SET priority = 'Critical',
        updated_at = CURRENT_TIMESTAMP
    WHERE priority = 'High' 
    AND status IN ('Submitted', 'Acknowledged')
    AND created_at < CURRENT_TIMESTAMP - INTERVAL '24 hours'
    AND category_id IN (
        SELECT id FROM categories 
        WHERE name IN ('Water Leakage', 'Pothole')
    );

    GET DIAGNOSTICS escalated_count = ROW_COUNT;

    -- Escalate medium priority reports that are pending for more than 72 hours
    UPDATE reports 
    SET priority = 'High',
        updated_at = CURRENT_TIMESTAMP
    WHERE priority = 'Medium' 
    AND status IN ('Submitted', 'Acknowledged')
    AND created_at < CURRENT_TIMESTAMP - INTERVAL '72 hours';

    RETURN escalated_count;
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- SCHEDULED JOBS (for cron or task scheduler)
-- =================================================================

-- Daily analytics update (run at midnight)
-- 0 0 * * * psql -U civic_user -d civic_issues_db -c "SELECT update_daily_analytics();"

-- Weekly cleanup (run every Sunday at 2 AM)
-- 0 2 * * 0 psql -U civic_user -d civic_issues_db -c "SELECT cleanup_orphaned_records();"

-- Monthly archiving (run on 1st day of month at 3 AM)
-- 0 3 1 * * psql -U civic_user -d civic_issues_db -c "SELECT archive_old_reports();"

-- Daily priority escalation (run every 6 hours)
-- 0 */6 * * * psql -U civic_user -d civic_issues_db -c "SELECT auto_escalate_priority();"

-- =================================================================
-- PERFORMANCE MONITORING QUERIES
-- =================================================================

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_total_relation_size(schemaname||'.'||tablename) as size_bytes
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY size_bytes DESC;

-- Check index usage
SELECT 
    indexrelname as index_name,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;

-- Check slow queries (requires pg_stat_statements extension)
-- SELECT query, mean_time, calls, total_time 
-- FROM pg_stat_statements 
-- ORDER BY mean_time DESC 
-- LIMIT 10;

-- =================================================================
-- BACKUP PROCEDURES
-- =================================================================

-- Function to create automated backup
CREATE OR REPLACE FUNCTION create_backup_info()
RETURNS TABLE(backup_name TEXT, backup_size TEXT, backup_time TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'civic_backup_' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDD_HH24MISS') as backup_name,
        pg_size_pretty(pg_database_size(current_database())) as backup_size,
        CURRENT_TIMESTAMP as backup_time;
END;
$$ LANGUAGE plpgsql;
