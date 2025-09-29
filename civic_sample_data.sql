
-- =================================================================
-- SAMPLE DATA INSERTION SCRIPT
-- Civic Issue Reporting System - Government of Jharkhand
-- =================================================================

-- =================================================================
-- 1. INSERT CATEGORIES
-- =================================================================
INSERT INTO categories (name, description, default_department) VALUES
('Pothole', 'Road surface damage, potholes, and road maintenance issues', 'Public Works'),
('Streetlight', 'Street lighting issues, broken lights, electrical problems', 'Electrical'),
('Garbage', 'Waste management, garbage collection, overflowing bins', 'Sanitation'),
('Water Leakage', 'Water pipeline issues, leaks, supply problems', 'Water Board'),
('Illegal Dumping', 'Illegal waste disposal, unauthorized dumping', 'Sanitation'),
('Tree/Green', 'Tree maintenance, parks, green spaces, horticulture', 'Horticulture'),
('Other', 'Other civic issues not covered in specific categories', 'General Admin');

-- =================================================================
-- 2. INSERT DEPARTMENTS
-- =================================================================
INSERT INTO departments (name, description, contact_email, contact_phone, head_name) VALUES
('Public Works', 'Road construction, maintenance, and infrastructure development', 'publicworks@jharkhand.gov.in', '+91-651-2401234', 'Rajesh Kumar Singh'),
('Electrical', 'Street lighting, electrical infrastructure, power distribution', 'electrical@jharkhand.gov.in', '+91-651-2401235', 'Priya Sharma'),
('Sanitation', 'Waste management, garbage collection, cleanliness drives', 'sanitation@jharkhand.gov.in', '+91-651-2401236', 'Mohammad Ali Khan'),
('Water Board', 'Water supply, pipeline maintenance, quality control', 'waterboard@jharkhand.gov.in', '+91-651-2401237', 'Sunita Devi'),
('Horticulture', 'Parks, gardens, tree maintenance, green initiatives', 'horticulture@jharkhand.gov.in', '+91-651-2401238', 'Amit Gupta'),
('General Admin', 'General administration and coordination', 'admin@jharkhand.gov.in', '+91-651-2401239', 'Ravi Shankar');

-- =================================================================
-- 3. INSERT SAMPLE USERS
-- =================================================================
INSERT INTO users (username, email, phone, full_name, role, department_id) VALUES
-- Admin users
('admin', 'admin@jharkhand.gov.in', '+91-9876543200', 'System Administrator', 'admin', NULL),
('publicworks_head', 'rajesh.singh@jharkhand.gov.in', '+91-9876543201', 'Rajesh Kumar Singh', 'staff', 1),
('electrical_head', 'priya.sharma@jharkhand.gov.in', '+91-9876543202', 'Priya Sharma', 'staff', 2),
('sanitation_head', 'mohammad.khan@jharkhand.gov.in', '+91-9876543203', 'Mohammad Ali Khan', 'staff', 3),

-- Staff members
('a.kumar', 'a.kumar@jharkhand.gov.in', '+91-9876543211', 'A. Kumar', 'staff', 1),
('p.singh', 'p.singh@jharkhand.gov.in', '+91-9876543212', 'P. Singh', 'staff', 2),
('m.gupta', 'm.gupta@jharkhand.gov.in', '+91-9876543213', 'M. Gupta', 'staff', 3),
('r.verma', 'r.verma@jharkhand.gov.in', '+91-9876543214', 'R. Verma', 'staff', 4),
('s.yadav', 's.yadav@jharkhand.gov.in', '+91-9876543215', 'S. Yadav', 'staff', 5),
('d.sharma', 'd.sharma@jharkhand.gov.in', '+91-9876543216', 'D. Sharma', 'staff', 1),

-- Citizens (reporters of sample issues)
(NULL, 'rajesh.kumar@email.com', '+91-9876543210', 'Rajesh Kumar', 'citizen', NULL),
(NULL, 'priya.sharma@email.com', '+91-9876543221', 'Priya Sharma', 'citizen', NULL),
(NULL, 'mohammad.ali@email.com', '+91-9876543222', 'Mohammad Ali', 'citizen', NULL),
(NULL, 'sunita.devi@email.com', '+91-9876543223', 'Sunita Devi', 'citizen', NULL),
(NULL, 'amit.gupta@email.com', '+91-9876543224', 'Amit Gupta', 'citizen', NULL);

-- =================================================================
-- 4. INSERT SAMPLE LOCATIONS
-- =================================================================
INSERT INTO locations (name, address, city, latitude, longitude, type) VALUES
('Government College', 'Main Road, Near Government College', 'Ranchi', 23.3441, 85.3096, 'landmark'),
('Ashok Nagar Block B', 'Ashok Nagar, Block B', 'Jamshedpur', 22.8046, 86.2029, 'area'),
('Central Market', 'Central Market Area', 'Dhanbad', 23.7957, 86.4304, 'market'),
('Hospital Road', 'Near General Hospital', 'Ranchi', 23.3629, 85.3371, 'landmark'),
('Children Park', 'Children Park Area', 'Bokaro', 23.6693, 86.1511, 'park'),
('School Road', 'Main School Road', 'Hazaribagh', 23.9981, 85.3644, 'area'),
('Industrial Area', 'Industrial Area Zone', 'Jamshedpur', 22.7868, 86.1890, 'industrial'),
('Green Valley Colony', 'Green Valley Residential Colony', 'Ranchi', 23.3558, 85.3100, 'residential');

-- =================================================================
-- 5. INSERT SAMPLE REPORTS
-- =================================================================
INSERT INTO reports (
    category_id, title, description, priority, status, 
    latitude, longitude, address, location_accuracy,
    reporter_name, reporter_email, reporter_phone,
    department_id, assigned_to,
    created_at, updated_at, assigned_at
) VALUES
-- Report 1: Pothole
(1, 'Large pothole on Main Road', 'Large pothole on Main Road near Government College causing vehicle damage and traffic issues', 'High', 'In-Progress', 
 23.3441, 85.3096, 'Main Road, Near Government College, Ranchi', 15,
 'Rajesh Kumar', 'rajesh.kumar@email.com', '+91-9876543210',
 1, 5, '2025-08-25 10:30:00', '2025-08-30 14:20:00', '2025-08-26 09:15:00'),

-- Report 2: Streetlight
(2, 'Street light not working', 'Street light not working in residential area for 2 weeks, creating safety concerns', 'Medium', 'Resolved',
 22.8046, 86.2029, 'Ashok Nagar, Block B, Jamshedpur', 12,
 'Priya Sharma', 'priya.sharma@email.com', '+91-9876543221',
 2, 6, '2025-08-20 16:45:00', '2025-08-28 13:30:00', '2025-08-21 08:00:00'),

-- Report 3: Garbage
(3, 'Overflowing garbage bins', 'Overflowing garbage bins in Central Market area causing hygiene and health issues', 'High', 'Acknowledged',
 23.7957, 86.4304, 'Central Market, Dhanbad', 8,
 'Mohammad Ali', 'mohammad.ali@email.com', '+91-9876543222',
 3, 7, '2025-08-28 08:15:00', '2025-08-29 09:30:00', '2025-08-29 09:30:00'),

-- Report 4: Water Leakage
(4, 'Water pipeline burst', 'Water pipeline burst causing road damage and water wastage near hospital', 'Critical', 'In-Progress',
 23.3629, 85.3371, 'Near General Hospital, Ranchi', 20,
 'Sunita Devi', 'sunita.devi@email.com', '+91-9876543223',
 4, 8, '2025-08-27 12:00:00', '2025-08-30 16:45:00', '2025-08-27 14:30:00'),

-- Report 5: Illegal Dumping
(5, 'Construction waste dumped illegally', 'Construction waste dumped illegally in residential area blocking drainage', 'Medium', 'Submitted',
 23.6693, 86.1511, 'Children Park Area, Bokaro', 10,
 'Amit Gupta', 'amit.gupta@email.com', '+91-9876543224',
 3, NULL, '2025-08-30 10:20:00', '2025-08-30 10:20:00', NULL),

-- Report 6: Tree/Green
(6, 'Dead tree branches hanging', 'Dead tree branches hanging dangerously over school playground', 'High', 'Acknowledged',
 23.9981, 85.3644, 'Main School Road, Hazaribagh', 5,
 'School Principal', 'principal.school@email.com', '+91-9876543225',
 5, 9, '2025-08-26 14:30:00', '2025-08-29 11:00:00', '2025-08-29 11:00:00'),

-- Report 7: Other
(7, 'Bus stop shelter damaged', 'Bus stop shelter damaged and needs repair for commuter safety', 'Medium', 'In-Progress',
 22.7868, 86.1890, 'Industrial Area, Jamshedpur', 18,
 'Commuter Association', 'commuters.jsr@email.com', '+91-9876543226',
 1, 10, '2025-08-22 09:45:00', '2025-08-31 08:30:00', '2025-08-23 10:15:00'),

-- Report 8: Garbage (Resolved)
(3, 'Missed garbage collection', 'Missed garbage collection for residential colony for one week', 'Medium', 'Resolved',
 23.3558, 85.3100, 'Green Valley Colony, Ranchi', 12,
 'Colony Secretary', 'colony.secretary@email.com', '+91-9876543227',
 3, 7, '2025-08-24 07:30:00', '2025-08-30 17:00:00', '2025-08-25 09:00:00');

-- =================================================================
-- 6. INSERT REPORT HISTORY
-- =================================================================
INSERT INTO report_history (report_id, status, changed_by, change_reason, notes) VALUES
-- History for Report 1 (Pothole)
(1, 'Submitted', NULL, 'Initial submission', 'Report received from citizen'),
(1, 'Acknowledged', 2, 'Report reviewed', 'Issue verified and assigned to field team'),
(1, 'In-Progress', 5, 'Work started', 'Road repair crew deployed to location'),

-- History for Report 2 (Streetlight - Resolved)
(2, 'Submitted', NULL, 'Initial submission', 'Report received from citizen'),
(2, 'Acknowledged', 3, 'Report reviewed', 'Electrical team notified'),
(2, 'In-Progress', 6, 'Repair started', 'Technician dispatched to location'),
(2, 'Resolved', 6, 'Issue fixed', 'New LED streetlight installed and tested'),

-- History for Report 3 (Garbage)
(3, 'Submitted', NULL, 'Initial submission', 'Report received from citizen'),
(3, 'Acknowledged', 4, 'Report reviewed', 'Sanitation team assigned for immediate action'),

-- History for Report 4 (Water Leakage)
(4, 'Submitted', NULL, 'Initial submission', 'Emergency report received'),
(4, 'Acknowledged', 2, 'High priority', 'Classified as critical issue'),
(4, 'In-Progress', 8, 'Emergency response', 'Water supply team working on pipeline repair'),

-- Continue for other reports...
(5, 'Submitted', NULL, 'Initial submission', 'Report received from citizen'),
(6, 'Submitted', NULL, 'Initial submission', 'Report received from school'),
(6, 'Acknowledged', 2, 'Safety priority', 'Horticulture team assigned'),
(7, 'Submitted', NULL, 'Initial submission', 'Report from commuter group'),
(7, 'Acknowledged', 2, 'Report reviewed', 'Public works team notified'),
(7, 'In-Progress', 10, 'Repair initiated', 'Bus shelter repair work started'),
(8, 'Submitted', NULL, 'Initial submission', 'Colony complaint received'),
(8, 'Acknowledged', 4, 'Report reviewed', 'Garbage collection route checked'),
(8, 'In-Progress', 7, 'Collection resumed', 'Special collection arranged'),
(8, 'Resolved', 7, 'Issue resolved', 'Regular collection schedule restored');

-- =================================================================
-- 7. UPDATE RESOLVED TIMESTAMP FOR COMPLETED REPORTS
-- =================================================================
UPDATE reports SET resolved_at = '2025-08-28 13:30:00' WHERE id = 2;
UPDATE reports SET resolved_at = '2025-08-30 17:00:00' WHERE id = 8;

-- =================================================================
-- 8. CREATE USEFUL VIEWS
-- =================================================================

-- View for report summary with department and category names
CREATE VIEW report_summary AS
SELECT 
    r.id,
    r.report_id,
    c.name as category_name,
    r.title,
    r.description,
    r.priority,
    r.status,
    d.name as department_name,
    COALESCE(u.full_name, 'Unassigned') as assignee_name,
    r.reporter_name,
    r.reporter_phone,
    r.latitude,
    r.longitude,
    r.address,
    r.created_at,
    r.updated_at,
    r.resolved_at
FROM reports r
JOIN categories c ON r.category_id = c.id
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN users u ON r.assigned_to = u.id;

-- View for pending reports (not resolved)
CREATE VIEW pending_reports AS
SELECT * FROM report_summary 
WHERE status != 'Resolved' 
ORDER BY 
    CASE priority 
        WHEN 'Critical' THEN 1
        WHEN 'High' THEN 2
        WHEN 'Medium' THEN 3
        WHEN 'Low' THEN 4
    END,
    created_at ASC;

-- View for analytics - reports by category
CREATE VIEW reports_by_category AS
SELECT 
    c.name as category,
    COUNT(r.id) as total_reports,
    COUNT(CASE WHEN r.status = 'Resolved' THEN 1 END) as resolved_count,
    COUNT(CASE WHEN r.status != 'Resolved' THEN 1 END) as pending_count,
    ROUND(
        COUNT(CASE WHEN r.status = 'Resolved' THEN 1 END) * 100.0 / COUNT(r.id), 
        2
    ) as resolution_rate
FROM categories c
LEFT JOIN reports r ON c.id = r.category_id
GROUP BY c.id, c.name
ORDER BY total_reports DESC;

-- View for department workload
CREATE VIEW department_workload AS
SELECT 
    d.name as department,
    COUNT(r.id) as total_reports,
    COUNT(CASE WHEN r.status = 'Submitted' THEN 1 END) as submitted,
    COUNT(CASE WHEN r.status = 'Acknowledged' THEN 1 END) as acknowledged,
    COUNT(CASE WHEN r.status = 'In-Progress' THEN 1 END) as in_progress,
    COUNT(CASE WHEN r.status = 'Resolved' THEN 1 END) as resolved,
    ROUND(AVG(
        CASE WHEN r.resolved_at IS NOT NULL 
        THEN EXTRACT(EPOCH FROM (r.resolved_at - r.created_at))/86400 
        END
    ), 1) as avg_resolution_days
FROM departments d
LEFT JOIN reports r ON d.id = r.department_id
GROUP BY d.id, d.name
ORDER BY total_reports DESC;
