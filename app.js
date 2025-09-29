// Civic Issue Reporting System - JavaScript Implementation
// Government of Jharkhand

// Global configuration and data
const CATEGORIES = ["Pothole", "Streetlight", "Garbage", "Water Leakage", "Illegal Dumping", "Tree/Green", "Other"];

const DEPARTMENT_RULES = {
    "Pothole": "Public Works",
    "Streetlight": "Electrical",
    "Garbage": "Sanitation",
    "Water Leakage": "Water Board",
    "Illegal Dumping": "Sanitation",
    "Tree/Green": "Horticulture",
    "Other": "General Admin"
};

const STATUS_FLOW = ["Submitted", "Acknowledged", "In-Progress", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

// Sample data from provided JSON
const SAMPLE_REPORTS = [
    {
        "id": "JHR-2025-001",
        "category": "Pothole",
        "description": "Large pothole on Main Road near Government College causing vehicle damage and traffic issues",
        "priority": "High",
        "status": "In-Progress",
        "department": "Public Works",
        "assignee": "A. Kumar",
        "location": { "lat": 23.3441, "lng": 85.3096, "accuracy": 15 },
        "createdAt": "2025-08-25T10:30:00.000Z",
        "updatedAt": "2025-08-30T14:20:00.000Z",
        "reporter": { "name": "Rajesh Kumar", "phone": "+91-9876543210", "email": "rajesh.kumar@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-25T10:30:00.000Z", "event": "Submitted" },
            { "at": "2025-08-26T09:15:00.000Z", "event": "Acknowledged" },
            { "at": "2025-08-28T11:45:00.000Z", "event": "In-Progress" }
        ]
    },
    {
        "id": "JHR-2025-002",
        "category": "Streetlight",
        "description": "Street light not working in residential area for 2 weeks, creating safety concerns",
        "priority": "Medium",
        "status": "Resolved",
        "department": "Electrical",
        "assignee": "P. Singh",
        "location": { "lat": 22.8046, "lng": 86.2029, "accuracy": 12 },
        "createdAt": "2025-08-20T16:45:00.000Z",
        "updatedAt": "2025-08-28T13:30:00.000Z",
        "reporter": { "name": "Priya Sharma", "phone": "+91-9876543211", "email": "priya.sharma@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-20T16:45:00.000Z", "event": "Submitted" },
            { "at": "2025-08-21T08:00:00.000Z", "event": "Acknowledged" },
            { "at": "2025-08-25T10:30:00.000Z", "event": "In-Progress" },
            { "at": "2025-08-28T13:30:00.000Z", "event": "Resolved" }
        ]
    },
    {
        "id": "JHR-2025-003",
        "category": "Garbage",
        "description": "Overflowing garbage bins in Central Market area causing hygiene and health issues",
        "priority": "High",
        "status": "Acknowledged",
        "department": "Sanitation",
        "assignee": "M. Gupta",
        "location": { "lat": 23.7957, "lng": 86.4304, "accuracy": 8 },
        "createdAt": "2025-08-28T08:15:00.000Z",
        "updatedAt": "2025-08-29T09:30:00.000Z",
        "reporter": { "name": "Mohammad Ali", "phone": "+91-9876543212", "email": "mohammad.ali@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-28T08:15:00.000Z", "event": "Submitted" },
            { "at": "2025-08-29T09:30:00.000Z", "event": "Acknowledged" }
        ]
    },
    {
        "id": "JHR-2025-004",
        "category": "Water Leakage",
        "description": "Water pipeline burst causing road damage and water wastage near hospital",
        "priority": "Critical",
        "status": "In-Progress",
        "department": "Water Board",
        "assignee": "R. Verma",
        "location": { "lat": 23.3629, "lng": 85.3371, "accuracy": 20 },
        "createdAt": "2025-08-27T12:00:00.000Z",
        "updatedAt": "2025-08-30T16:45:00.000Z",
        "reporter": { "name": "Sunita Devi", "phone": "+91-9876543213", "email": "sunita.devi@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-27T12:00:00.000Z", "event": "Submitted" },
            { "at": "2025-08-27T14:30:00.000Z", "event": "Acknowledged" },
            { "at": "2025-08-28T08:00:00.000Z", "event": "In-Progress" }
        ]
    },
    {
        "id": "JHR-2025-005",
        "category": "Illegal Dumping",
        "description": "Construction waste dumped illegally in residential area blocking drainage",
        "priority": "Medium",
        "status": "Submitted",
        "department": "Sanitation",
        "assignee": "",
        "location": { "lat": 23.6693, "lng": 86.1511, "accuracy": 10 },
        "createdAt": "2025-08-30T10:20:00.000Z",
        "updatedAt": "2025-08-30T10:20:00.000Z",
        "reporter": { "name": "Amit Gupta", "phone": "+91-9876543214", "email": "amit.gupta@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-30T10:20:00.000Z", "event": "Submitted" }
        ]
    },
    {
        "id": "JHR-2025-006",
        "category": "Tree/Green",
        "description": "Dead tree branches hanging dangerously over school playground",
        "priority": "High",
        "status": "Acknowledged",
        "department": "Horticulture",
        "assignee": "S. Yadav",
        "location": { "lat": 23.9981, "lng": 85.3644, "accuracy": 5 },
        "createdAt": "2025-08-26T14:30:00.000Z",
        "updatedAt": "2025-08-29T11:00:00.000Z",
        "reporter": { "name": "School Principal", "phone": "+91-9876543215", "email": "principal.school@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-26T14:30:00.000Z", "event": "Submitted" },
            { "at": "2025-08-29T11:00:00.000Z", "event": "Acknowledged" }
        ]
    },
    {
        "id": "JHR-2025-007",
        "category": "Other",
        "description": "Bus stop shelter damaged and needs repair for commuter safety",
        "priority": "Medium",
        "status": "In-Progress",
        "department": "Public Works",
        "assignee": "D. Sharma",
        "location": { "lat": 22.7868, "lng": 86.1890, "accuracy": 18 },
        "createdAt": "2025-08-22T09:45:00.000Z",
        "updatedAt": "2025-08-31T08:30:00.000Z",
        "reporter": { "name": "Commuter Association", "phone": "+91-9876543216", "email": "commuters.jsr@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-22T09:45:00.000Z", "event": "Submitted" },
            { "at": "2025-08-23T10:15:00.000Z", "event": "Acknowledged" },
            { "at": "2025-08-31T08:30:00.000Z", "event": "In-Progress" }
        ]
    },
    {
        "id": "JHR-2025-008",
        "category": "Garbage",
        "description": "Missed garbage collection for residential colony for one week",
        "priority": "Medium",
        "status": "Resolved",
        "department": "Sanitation",
        "assignee": "K. Das",
        "location": { "lat": 23.3558, "lng": 85.3100, "accuracy": 12 },
        "createdAt": "2025-08-24T07:30:00.000Z",
        "updatedAt": "2025-08-30T17:00:00.000Z",
        "reporter": { "name": "Colony Secretary", "phone": "+91-9876543217", "email": "colony.secretary@email.com" },
        "photo": null,
        "history": [
            { "at": "2025-08-24T07:30:00.000Z", "event": "Submitted" },
            { "at": "2025-08-25T09:00:00.000Z", "event": "Acknowledged" },
            { "at": "2025-08-27T11:30:00.000Z", "event": "In-Progress" },
            { "at": "2025-08-30T17:00:00.000Z", "event": "Resolved" }
        ]
    }
];

// Global state
let allReports = [];
let currentLocation = null;
let citizenMap = null;
let adminMap = null;
let citizenMarkersLayer = null;
let adminMarkersLayer = null;
let charts = {};

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function generateUID() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `JHR-${timestamp}-${random}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showToast(message, duration = 3000) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, duration);
}

function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        if (!file || !file.type.startsWith('image/')) {
            resolve(null);
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };

        img.src = URL.createObjectURL(file);
    });
}

// Data management
function initializeData() {
    try {
        const stored = localStorage.getItem('jharkhand_civic_reports');
        if (stored) {
            allReports = JSON.parse(stored);
        } else {
            allReports = [...SAMPLE_REPORTS];
            saveData();
        }
    } catch (error) {
        console.error('Error loading data:', error);
        allReports = [...SAMPLE_REPORTS];
    }
}

function saveData() {
    try {
        localStorage.setItem('jharkhand_civic_reports', JSON.stringify(allReports));
    } catch (error) {
        console.error('Error saving data:', error);
        showToast('Error saving data. Please try again.');
    }
}

function addReport(reportData) {
    allReports.unshift(reportData);
    saveData();
}

function updateReport(id, updates) {
    const index = allReports.findIndex(r => r.id === id);
    if (index !== -1) {
        allReports[index] = { ...allReports[index], ...updates, updatedAt: new Date().toISOString() };
        saveData();
        return allReports[index];
    }
    return null;
}

// Map functionality
function initializeMaps() {
    // Initialize citizen map
    citizenMap = L.map('map').setView([23.36, 85.33], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(citizenMap);
    citizenMarkersLayer = L.layerGroup().addTo(citizenMap);

    // Initialize admin map
    adminMap = L.map('adminMap').setView([23.36, 85.33], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(adminMap);
    adminMarkersLayer = L.layerGroup().addTo(adminMap);

    // Add click handler to citizen map
    citizenMap.on('click', function (e) {
        currentLocation = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            accuracy: 10
        };
        updateLocationDisplay();
        addLocationMarker(citizenMap, e.latlng, 'Selected Location');
    });

    renderCitizenMapMarkers();
    renderAdminMapMarkers();
}

function addLocationMarker(map, latlng, popupText) {
    // Clear existing location markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.options.isLocationMarker) {
            map.removeLayer(layer);
        }
    });

    // Add new location marker
    const marker = L.marker(latlng, { isLocationMarker: true })
        .bindPopup(popupText)
        .addTo(map);

    if (popupText.includes('Your Location')) {
        marker.openPopup();
    }
}

function getStatusColor(status) {
    const colors = {
        'Submitted': '#6aa9ff',
        'Acknowledged': '#ffb020',
        'In-Progress': '#58c19c',
        'Resolved': '#4cd964'
    };
    return colors[status] || '#6aa9ff';
}

function createCustomMarker(report) {
    const color = getStatusColor(report.status);
    const icon = L.divIcon({
        className: 'custom-pin',
        html: `<div style="background: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    return L.marker([report.location.lat, report.location.lng], { icon })
        .bindPopup(`
            <div style="color: #333;">
                <strong>${report.category}</strong><br>
                <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 10px; font-size: 11px;">${report.status}</span><br>
                <small>${report.description}</small><br>
                <small><strong>ID:</strong> ${report.id}</small>
            </div>
        `);
}

function renderCitizenMapMarkers() {
    citizenMarkersLayer.clearLayers();
    allReports.forEach(report => {
        if (report.location) {
            createCustomMarker(report).addTo(citizenMarkersLayer);
        }
    });
}

function renderAdminMapMarkers(reports = allReports) {
    adminMarkersLayer.clearLayers();
    reports.forEach(report => {
        if (report.location) {
            createCustomMarker(report).addTo(adminMarkersLayer);
        }
    });
}

// Role switching
function setupRoleSwitch() {
    const toggle = $('#roleToggle');
    const label = $('#roleLabel');
    const citizenPanel = $('#citizenPanel');
    const adminPanel = $('#adminPanel');

    toggle.addEventListener('change', () => {
        const isAdmin = toggle.checked;
        label.textContent = isAdmin ? 'Admin' : 'Citizen';

        citizenPanel.classList.toggle('hidden', isAdmin);
        adminPanel.classList.toggle('hidden', !isAdmin);

        if (isAdmin) {
            setTimeout(() => {
                adminMap.invalidateSize();
                loadAdminDashboard();
            }, 200);
        } else {
            setTimeout(() => {
                citizenMap.invalidateSize();
            }, 200);
        }
    });
}

// Location handling
function setupLocationHandling() {
    const locateBtn = $('#locateBtn');

    locateBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showToast('Geolocation not supported on this device');
            return;
        }

        locateBtn.textContent = '📍 Getting location...';
        locateBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };

                updateLocationDisplay();
                citizenMap.setView([currentLocation.lat, currentLocation.lng], 16);
                addLocationMarker(citizenMap, [currentLocation.lat, currentLocation.lng], 'Your Location');

                locateBtn.textContent = '📍 Use My Location';
                locateBtn.disabled = false;
                showToast('Location captured successfully');
            },
            (error) => {
                console.error('Geolocation error:', error);
                showToast('Could not get location. Please allow permission and try again.');
                locateBtn.textContent = '📍 Use My Location';
                locateBtn.disabled = false;
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    });
}

function updateLocationDisplay() {
    const status = $('#locationStatus');
    if (currentLocation) {
        status.textContent = `Location set (${currentLocation.lat.toFixed(5)}, ${currentLocation.lng.toFixed(5)})`;
        status.style.color = '#58c19c';
    } else {
        status.textContent = 'Location not set';
        status.style.color = '#9aa3b2';
    }
}

// Form handling
function setupForms() {
    // Report form
    const reportForm = $('#reportForm');
    reportForm.addEventListener('submit', handleReportSubmission);
    reportForm.addEventListener('reset', handleFormReset);

    // Photo handling
    const photoInput = $('#photo');
    const photoPreview = $('#photoPreview');

    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            const compressed = await compressImage(file);
            if (compressed) {
                photoPreview.src = compressed;
                photoPreview.classList.remove('hidden');
                photoPreview.dataset.dataurl = compressed;
            }
        } else {
            photoPreview.classList.add('hidden');
            delete photoPreview.dataset.dataurl;
        }
    });

    // Search and filters
    setupCitizenFilters();
    setupAdminFilters();

    // Assignment form
    setupAssignmentForm();
}

async function handleReportSubmission(e) {
    e.preventDefault();

    const category = $('#category').value;
    const priority = $('#priority').value;
    const description = $('#description').value.trim();
    const reporterName = $('#reporterName').value.trim();
    const reporterEmail = $('#reporterEmail').value.trim();
    const reporterPhone = $('#reporterPhone').value.trim();
    const photoPreview = $('#photoPreview');

    if (!category) {
        showToast('Please select a category');
        return;
    }

    if (!currentLocation) {
        showToast('Please set your location');
        return;
    }

    if (!reporterName || !reporterEmail || !reporterPhone) {
        showToast('Please fill in all required contact information');
        return;
    }

    const reportData = {
        id: generateUID(),
        category,
        priority,
        description,
        status: 'Submitted',
        department: DEPARTMENT_RULES[category] || 'General Admin',
        assignee: '',
        location: currentLocation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: {
            name: reporterName,
            email: reporterEmail,
            phone: reporterPhone
        },
        photo: photoPreview.dataset.dataurl || null,
        history: [
            { at: new Date().toISOString(), event: 'Submitted' }
        ]
    };

    addReport(reportData);
    showToast(`Report submitted successfully! ID: ${reportData.id}`);

    e.target.reset();
    handleFormReset();
    refreshCitizenReports();
    renderCitizenMapMarkers();

    if (!$('#adminPanel').classList.contains('hidden')) {
        loadAdminDashboard();
    }
}

function handleFormReset() {
    currentLocation = null;
    updateLocationDisplay();
    const photoPreview = $('#photoPreview');
    photoPreview.classList.add('hidden');
    delete photoPreview.dataset.dataurl;
}

// Citizen reports management
function setupCitizenFilters() {
    const searchInput = $('#mySearch');
    const statusFilter = $('#myStatusFilter');

    searchInput.addEventListener('input', refreshCitizenReports);
    statusFilter.addEventListener('change', refreshCitizenReports);
}

function refreshCitizenReports() {
    const searchTerm = $('#mySearch').value.toLowerCase();
    const statusFilter = $('#myStatusFilter').value;

    let filtered = allReports.filter(report => {
        const matchesSearch = !searchTerm ||
            report.id.toLowerCase().includes(searchTerm) ||
            (report.description || '').toLowerCase().includes(searchTerm);

        const matchesStatus = !statusFilter || report.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const reportsList = $('#myReports');
    reportsList.innerHTML = filtered.map(report => `
        <li class="report-card">
            <div class="report-header">
                <h4 class="report-title">${report.category}</h4>
                <span class="status-badge status-${report.status}">${report.status}</span>
            </div>
            <div class="report-meta">
                ID: ${report.id} • ${formatDate(report.createdAt)} • Priority: <span class="priority-${report.priority}">${report.priority}</span>
            </div>
            <div class="report-description">${report.description || 'No description provided'}</div>
            ${report.photo ? `<img src="${report.photo}" alt="Report photo" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-top: 8px;">` : ''}
            <div style="margin-top: 12px;">
                <button class="btn btn--sm btn--outline" onclick="copyReportId('${report.id}')">Copy ID</button>
            </div>
        </li>
    `).join('');

    if (filtered.length === 0) {
        reportsList.innerHTML = '<li style="text-align: center; padding: 32px; color: #9aa3b2;">No reports found</li>';
    }
}

function copyReportId(id) {
    navigator.clipboard.writeText(id).then(() => {
        showToast('Report ID copied to clipboard');
    });
}

// Admin dashboard
function setupAdminFilters() {
    const searchInput = $('#adminSearch');
    const categoryFilter = $('#filterCategory');
    const statusFilter = $('#filterStatus');
    const priorityFilter = $('#filterPriority');
    const exportBtn = $('#exportCsv');

    // Populate category filter
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('');

    // Event listeners
    [searchInput, categoryFilter, statusFilter, priorityFilter].forEach(element => {
        element.addEventListener('change', loadAdminDashboard);
        element.addEventListener('input', loadAdminDashboard);
    });

    exportBtn.addEventListener('click', exportCSV);
}

function loadAdminDashboard() {
    const searchTerm = $('#adminSearch').value.toLowerCase();
    const categoryFilter = $('#filterCategory').value;
    const statusFilter = $('#filterStatus').value;
    const priorityFilter = $('#filterPriority').value;

    let filtered = allReports.filter(report => {
        const matchesSearch = !searchTerm ||
            report.id.toLowerCase().includes(searchTerm) ||
            (report.description || '').toLowerCase().includes(searchTerm);

        const matchesCategory = !categoryFilter || report.category === categoryFilter;
        const matchesStatus = !statusFilter || report.status === statusFilter;
        const matchesPriority = !priorityFilter || report.priority === priorityFilter;

        return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    renderAdminTable(filtered);
    renderAdminMapMarkers(filtered);
    renderAnalytics();
}

function renderAdminTable(reports) {
    const tbody = $('#reportsTable tbody');
    tbody.innerHTML = reports.map(report => `
        <tr>
            <td>${report.id}</td>
            <td>${formatDate(report.createdAt)}</td>
            <td>${report.category}</td>
            <td><span class="priority-${report.priority}">${report.priority}</span></td>
            <td>
                <select onchange="updateStatus('${report.id}', this.value)" style="background: #0e1533; color: #e9edf5; border: 1px solid rgba(255,255,255,0.12); padding: 4px; border-radius: 4px;">
                    ${STATUS_FLOW.map(status =>
        `<option value="${status}" ${report.status === status ? 'selected' : ''}>${status}</option>`
    ).join('')}
                </select>
            </td>
            <td>${report.department}</td>
            <td>${report.assignee || '-'}</td>
            <td class="table-actions">
                <button class="btn btn--sm btn--primary" onclick="openAssignModal('${report.id}')">Assign</button>
                <button class="btn btn--sm btn--secondary" onclick="focusOnReport('${report.id}')">Locate</button>
            </td>
        </tr>
    `).join('');
}

function updateStatus(id, newStatus) {
    const updated = updateReport(id, {
        status: newStatus,
        history: [...(allReports.find(r => r.id === id)?.history || []),
        { at: new Date().toISOString(), event: newStatus }]
    });

    if (updated) {
        showToast(`Status updated to ${newStatus}`);
        loadAdminDashboard();
        refreshCitizenReports();
    }
}

function focusOnReport(id) {
    const report = allReports.find(r => r.id === id);
    if (report?.location) {
        adminMap.setView([report.location.lat, report.location.lng], 16);
        showToast(`Focused on report ${id}`);
    }
}

// Assignment functionality
function setupAssignmentForm() {
    const form = $('#assignForm');
    const deptSelect = $('#assignDept');

    // Populate departments
    const departments = [...new Set(Object.values(DEPARTMENT_RULES))];
    deptSelect.innerHTML = departments.map(dept => `<option value="${dept}">${dept}</option>`).join('');

    form.addEventListener('submit', handleAssignment);
}

function openAssignModal(reportId) {
    const report = allReports.find(r => r.id === reportId);
    if (!report) return;

    $('#assignReportId').textContent = `Assign report: ${reportId}`;
    $('#assignDept').value = report.department;
    $('#assignUser').value = report.assignee || '';
    $('#assignForm').dataset.reportId = reportId;
    $('#assignModal').classList.remove('hidden');
}

function closeAssignModal() {
    $('#assignModal').classList.add('hidden');
    delete $('#assignForm').dataset.reportId;
}

function handleAssignment(e) {
    e.preventDefault();
    const reportId = e.target.dataset.reportId;
    const department = $('#assignDept').value;
    const assignee = $('#assignUser').value.trim();

    const updated = updateReport(reportId, { department, assignee });

    if (updated) {
        showToast(`Assignment updated for ${reportId}`);
        loadAdminDashboard();
        closeAssignModal();
    }
}

// Analytics and charts
function renderAnalytics() {
    renderCategoryChart();
    renderAgingChart();
    renderResolutionChart();
}

function renderCategoryChart() {
    const ctx = $('#chartByCategory');
    if (!ctx) return;

    const categoryData = CATEGORIES.reduce((acc, cat) => {
        acc[cat] = allReports.filter(r => r.category === cat).length;
        return acc;
    }, {});

    if (charts.category) {
        charts.category.destroy();
    }

    charts.category = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                label: 'Reports by Category',
                data: Object.values(categoryData),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#e9edf5' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9aa3b2' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#9aa3b2' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

function renderAgingChart() {
    const ctx = $('#chartAging');
    if (!ctx) return;

    const now = Date.now();
    const buckets = [0, 0, 0, 0]; // <24h, 1-3d, 4-7d, >7d

    allReports.filter(r => r.status !== 'Resolved').forEach(report => {
        const ageDays = (now - new Date(report.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays < 1) buckets[0]++;
        else if (ageDays <= 3) buckets[1]++;
        else if (ageDays <= 7) buckets[2]++;
        else buckets[3]++;
    });

    if (charts.aging) {
        charts.aging.destroy();
    }

    charts.aging = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['< 24 hours', '1-3 days', '4-7 days', '> 7 days'],
            datasets: [{
                label: 'Open Reports by Age',
                data: buckets,
                backgroundColor: ['#4cd964', '#58c19c', '#ffb020', '#ff6b6b'],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#e9edf5' }
                }
            }
        }
    });
}

function renderResolutionChart() {
    const ctx = $('#chartResolution');
    if (!ctx) return;

    // Group by status
    const statusCounts = STATUS_FLOW.reduce((acc, status) => {
        acc[status] = allReports.filter(r => r.status === status).length;
        return acc;
    }, {});

    if (charts.resolution) {
        charts.resolution.destroy();
    }

    charts.resolution = new Chart(ctx, {
        type: 'line',
        data: {
            labels: STATUS_FLOW,
            datasets: [{
                label: 'Report Count by Status',
                data: Object.values(statusCounts),
                borderColor: '#58c19c',
                backgroundColor: 'rgba(88, 193, 156, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#e9edf5' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9aa3b2' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#9aa3b2' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

// CSV Export
function exportCSV() {
    const headers = ['ID', 'Created', 'Category', 'Priority', 'Status', 'Department', 'Assignee', 'Latitude', 'Longitude', 'Description'];
    const rows = [headers.join(',')];

    allReports.forEach(report => {
        const row = [
            report.id,
            formatDate(report.createdAt),
            report.category,
            report.priority,
            report.status,
            report.department,
            report.assignee || '',
            report.location?.lat || '',
            report.location?.lng || '',
            `"${(report.description || '').replace(/"/g, '""')}"`
        ];
        rows.push(row.join(','));
    });

    const csvContent = rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `jharkhand_civic_reports_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('CSV exported successfully');
    }
}

// Make functions globally available
window.updateStatus = updateStatus;
window.openAssignModal = openAssignModal;
window.closeAssignModal = closeAssignModal;
window.focusOnReport = focusOnReport;
window.copyReportId = copyReportId;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Civic Issue Reporting System...');

    initializeData();
    initializeMaps();
    setupRoleSwitch();
    setupLocationHandling();
    setupForms();

    refreshCitizenReports();

    console.log('Application initialized successfully');
    showToast('Welcome to Civic Issue Reporting System');
});