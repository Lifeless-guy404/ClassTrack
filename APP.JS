
/*
    CLASSTRACK - FRONTEND CONTROLLER

    Temporary demonstration data.
    Later, replace this data source with API responses
    from Justin's Flask backend.
*/

// ==========================================
// 1. TEMPORARY DASHBOARD DATA
// ==========================================

const dashboardData = {
    totalStudents: 120,
    presentToday: 96,
    absentToday: 24,
    attendanceRate: 80,

    session: {
        name: "Morning Session",
        status: "Active",
        startTime: "08:30 AM",
        marked: 96
    },

    device: {
        connected: true,
        name: "RFID Reader 01",
        lastCommunication: "Just now"
    },

    recentActivity: [
        {
            name: "Aarav Sharma",
            studentId: "CT001",
            time: "09:12 AM",
            status: "Present"
        },
        {
            name: "Riya Verma",
            studentId: "CT002",
            time: "09:10 AM",
            status: "Present"
        },
        {
            name: "Kabir Mehta",
            studentId: "CT003",
            time: "09:08 AM",
            status: "Present"
        },
        {
            name: "Ananya Gupta",
            studentId: "CT004",
            time: "09:04 AM",
            status: "Present"
        },
        {
            name: "Unknown Card",
            studentId: "Unregistered",
            time: "09:02 AM",
            status: "Rejected"
        }
    ],

    weeklyAttendance: [
        { day: "Mon", percentage: 85 },
        { day: "Tue", percentage: 92 },
        { day: "Wed", percentage: 78 },
        { day: "Thu", percentage: 95 },
        { day: "Fri", percentage: 88 },
        { day: "Sat", percentage: 70 },
        { day: "Sun", percentage: 0 }
    ]
};


// ==========================================
// 2. DASHBOARD ELEMENT REFERENCES
// ==========================================

const elements = {
    totalStudents: document.getElementById("totalStudents"),
    presentToday: document.getElementById("presentToday"),
    absentToday: document.getElementById("absentToday"),
    attendanceRate: document.getElementById("attendanceRate"),

    sessionName: document.getElementById("sessionName"),
    sessionBadge: document.getElementById("sessionBadge"),
    sessionStart: document.getElementById("sessionStart"),
    sessionMarked: document.getElementById("sessionMarked"),
    sessionProgress: document.getElementById("sessionProgress"),
    sessionProgressText: document.getElementById("sessionProgressText"),

    deviceStatus: document.getElementById("deviceStatus"),
    deviceDescription: document.getElementById("deviceDescription"),
    deviceDot: document.getElementById("deviceDot"),
    lastCommunication: document.getElementById("lastCommunication"),

    recentActivity: document.getElementById("recentActivity"),
    weeklyChart: document.getElementById("weeklyChart"),

    currentDate: document.getElementById("currentDate")
};


// ==========================================
// 3. RENDER DASHBOARD STATISTICS
// ==========================================

function renderStatistics(data) {
    elements.totalStudents.textContent = data.totalStudents;
    elements.presentToday.textContent = data.presentToday;
    elements.absentToday.textContent = data.absentToday;
    elements.attendanceRate.textContent = `${data.attendanceRate}%`;
}


// ==========================================
// 4. RENDER CURRENT SESSION
// ==========================================

function renderSession(session, totalStudents) {
    elements.sessionName.textContent = session.name;
    elements.sessionBadge.textContent = session.status;
    elements.sessionStart.textContent = session.startTime;
    elements.sessionMarked.textContent = session.marked;

    const progress = totalStudents > 0
        ? Math.min((session.marked / totalStudents) * 100, 100)
        : 0;

    elements.sessionProgress.style.width = `${progress}%`;
    elements.sessionProgressText.textContent = `${Math.round(progress)}%`;

    const isActive = session.status.toLowerCase() === "active";

    elements.sessionBadge.style.background = isActive
        ? "rgba(32,184,117,0.13)"
        : "rgba(100,116,139,0.13)";

    elements.sessionBadge.style.color = isActive
        ? "#087a4b"
        : "#475569";
}


// ==========================================
// 5. RENDER RFID DEVICE STATUS
// ==========================================

function renderDevice(device) {
    elements.deviceStatus.textContent = device.connected
        ? "Connected"
        : "Disconnected";

    elements.deviceDescription.textContent = device.connected
        ? `${device.name} is communicating with the system.`
        : `${device.name} is currently unavailable.`;

    elements.lastCommunication.textContent =
        device.lastCommunication;

    elements.deviceDot.style.background = device.connected
        ? "#20b875"
        : "#d34c57";

    elements.deviceDot.style.boxShadow = device.connected
        ? "0 0 8px rgba(32,184,117,0.55)"
        : "0 0 8px rgba(211,76,87,0.55)";
}


// ==========================================
// 6. RENDER RECENT ACTIVITY
// ==========================================

function renderActivity(activity) {
    elements.recentActivity.innerHTML = "";

    if (!activity.length) {
        elements.recentActivity.innerHTML =
            '<p class="empty-activity">No recent attendance activity.</p>';
        return;
    }

    activity.forEach(record => {
        const row = document.createElement("div");
        row.className = "activity-row";

        const isRejected = record.status === "Rejected";

        const avatar = document.createElement("div");
        avatar.className = "activity-avatar";

        const avatarIcon = document.createElement("span");
        avatarIcon.className = "material-symbols-outlined";
        avatarIcon.textContent = isRejected ? "warning" : "person";

        avatar.appendChild(avatarIcon);

        const info = document.createElement("div");
        info.className = "activity-info";

        const name = document.createElement("strong");
        name.textContent = record.name;

        const id = document.createElement("span");
        id.textContent = `${record.studentId} • ${record.status}`;

        info.append(name, id);

        const time = document.createElement("span");
        time.className = "activity-time";
        time.textContent = record.time;

        row.append(avatar, info, time);

        elements.recentActivity.appendChild(row);
    });
}


// ==========================================
// 7. RENDER WEEKLY ATTENDANCE CHART
// ==========================================

function renderWeeklyChart(records) {
    elements.weeklyChart.innerHTML = "";

    records.forEach(record => {
        const column = document.createElement("div");
        column.className = "chart-column";

        const value = document.createElement("span");
        value.className = "chart-value";
        value.textContent = `${record.percentage}%`;  

        const barArea = document.createElement("div");
        barArea.className = "chart-bar-area";

        const bar = document.createElement("div");
        bar.className = "chart-bar";

        bar.style.height = `${record.percentage}%`;

        const label = document.createElement("span");
        label.className = "chart-label";
        label.textContent = record.day;

        barArea.appendChild(bar);
        column.append(value, barArea, label);

        elements.weeklyChart.appendChild(column);
    });
}


// ==========================================
// 8. DATE DISPLAY
// ==========================================

function renderDate() {
    const now = new Date();

    elements.currentDate.textContent = now.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


// ==========================================
// 9. INITIALIZE DASHBOARD
// ==========================================

function initializeDashboard() {
    renderStatistics(dashboardData);

    renderSession(
        dashboardData.session,
        dashboardData.totalStudents
    );

    renderDevice(dashboardData.device);
    renderActivity(dashboardData.recentActivity);
    renderWeeklyChart(dashboardData.weeklyAttendance);
    renderDate();
}


// ==========================================
// 10. SIDEBAR NAVIGATION
// ==========================================


// ==========================================
// 10. SIDEBAR NAVIGATION SYSTEM
// ==========================================

const pageConfig = {
    dashboard: {
        title: "Dashboard",
        icon: "dashboard"
    },

    attendance: {
        title: "Attendance",
        icon: "show_chart"
    },

    students: {
        title: "Students",
        icon: "group"
    },

    sessions: {
        title: "Sessions",
        icon: "event"
    },

    reports: {
        title: "Reports & Analytics",
        icon: "bar_chart"
    },

    devices: {
        title: "RFID Devices",
        icon: "devices"
    },

    notifications: {
        title: "Notifications",
        icon: "notifications"
    },

    settings: {
        title: "Settings",
        icon: "settings"
    }
};


// Register all page sections here
const pages = {
    dashboard: document.getElementById("dashboardPage"),
    attendance: document.getElementById("placeholderPage"),
    students: document.getElementById("placeholderPage"),
    sessions: document.getElementById("placeholderPage"),
    reports: document.getElementById("placeholderPage"),
    devices: document.getElementById("placeholderPage"),
    notifications: document.getElementById("placeholderPage"),
    settings: document.getElementById("placeholderPage")
};

const navLinks = document.querySelectorAll(".nav-link");

const pageTitle = document.getElementById("pageTitle");
const placeholderTitle = document.getElementById("placeholderTitle");
const placeholderIcon = document.getElementById("placeholderIcon");


// Main navigation function
function navigateTo(page) {

    // Validate requested page
    if (!pageConfig[page]) return;

    // Handle logout
    if (page === "logout") {
        if (confirm("Are you sure you want to log out?")) {
            alert("Demo logout successful.");
        }
        return;
    }

    // Update sidebar active state
    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });

    // Update page heading
    pageTitle.textContent = pageConfig[page].title;

    // Show dashboard or placeholder
    const isDashboard = page === "dashboard";

    document.getElementById("dashboardPage").hidden = !isDashboard;
    document.getElementById("placeholderPage").hidden = isDashboard;

    // Update placeholder information
    if (!isDashboard) {
        placeholderTitle.textContent = pageConfig[page].title;
        placeholderIcon.textContent = pageConfig[page].icon;
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Attach click events to sidebar links
navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const selectedPage = link.dataset.page;

        navigateTo(selectedPage);

    });

});


// Handle other navigation links, such as View All
document.querySelectorAll('[data-page]:not(.nav-link)').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        navigateTo(link.dataset.page);

    });

});



// ==========================================
// 11. START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initializeDashboard();
});
