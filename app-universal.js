
// Application Data - Universal Version (Complete logic)
const INITIAL_SETTINGS = {
    societyName: "New Golf Society",
    societyYear: "2026",
    courses: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"]
};

// Fallback player data shown to new devices when no cloud/localStorage data exists
const INITIAL_DATA = [
    { "id": "p1774052136931", "name": "Adam O'Keefe", "handicap": 19.8, "category": "member", "c1_handicap": "19.8", "c2_handicap": "17", "c3_handicap": "17" },
    { "id": "p33", "name": "Ashley Tagell", "handicap": 28, "category": "member", "c1_handicap": "28", "c2_handicap": "28", "c3_handicap": "28" },
    { "id": "p23", "name": "CHRIS KEENAN", "handicap": 28, "category": "member", "c1_handicap": "23.2", "c2_handicap": "28", "c3_handicap": "23.2" },
    { "id": "p18", "name": "DAVE GENTLE Jnr", "handicap": 24.6, "category": "member", "c1_handicap": "24.6", "c2_handicap": "23", "c3_handicap": "23.6" },
    { "id": "p20", "name": "DAVE GOODCHILD", "handicap": 19.2, "category": "member", "c1_handicap": "19.2", "c2_handicap": "19.2", "c3_handicap": "19.8" },
    { "id": "p8", "name": "DAVE HOSKINS", "handicap": 28, "category": "member", "c1_handicap": "28", "c2_handicap": "28", "c3_handicap": "28" },
    { "id": "p27", "name": "DOUG WATSON", "handicap": 18.8, "category": "member", "c1_handicap": "18.8", "c2_handicap": "19.4", "c3_handicap": "20" },
    { "id": "p1774051887456", "name": "Jamie Brown", "handicap": 17.2, "category": "member", "c1_handicap": "17.2", "c2_handicap": "17.8", "c3_handicap": "17.8" },
    { "id": "p22", "name": "JOHN GILES", "handicap": 0.6, "category": "member", "c1_handicap": "0.6", "c2_handicap": "1", "c3_handicap": "0" },
    { "id": "p9", "name": "LARRY (Mark Knight)", "handicap": 12.4, "category": "member", "c1_handicap": "12.4", "c2_handicap": "13", "c3_handicap": "13.6" },
    { "id": "p1774051941036", "name": "Lee Bridge", "handicap": 14, "category": "member", "c1_handicap": "14", "c2_handicap": "14.6", "c3_handicap": "15.2" },
    { "id": "p19", "name": "RAV", "handicap": 13.6, "category": "member", "c1_handicap": "13.6", "c2_handicap": "13.6", "c3_handicap": "13.6" },
    { "id": "p11", "name": "REAGAN CORNISH", "handicap": 25.6, "category": "member", "c1_handicap": "25.6", "c2_handicap": "20.4", "c3_handicap": "21" },
    { "id": "p13", "name": "ROBBO", "handicap": 32, "category": "member", "c1_handicap": "32", "c2_handicap": "32", "c3_handicap": "32" },
    { "id": "p7", "name": "ROSS LAWSON", "handicap": 24, "category": "member", "c1_handicap": "24", "c2_handicap": "24.6", "c3_handicap": "25.2" },
    { "id": "p2", "name": "SEAMUS MURPHY", "handicap": 19.6, "category": "member", "c1_handicap": "19.6", "c2_handicap": "20.2", "c3_handicap": "20.8" },
    { "id": "p1", "name": "TONY SPICER", "handicap": 27, "category": "member", "c1_handicap": "27", "c2_handicap": "27.5", "c3_handicap": "28" },
    { "id": "p10", "name": "TONY WHITELOCK", "handicap": 18, "category": "member", "c1_handicap": "18", "c2_handicap": "18", "c3_handicap": "18" },
    { "id": "p3", "name": "WARREN EVERITT", "handicap": 28, "category": "member", "c1_handicap": "28", "c2_handicap": "28", "c3_handicap": "26" },
    { "id": "p32", "name": "Wayne Tagell", "handicap": 26.6, "category": "member", "c1_handicap": "26.6", "c2_handicap": "27.2", "c3_handicap": "27.2" },
    { "id": "p6", "name": "DEAN DALE", "handicap": 14.8, "category": "member", "c1_handicap": "14.8", "c2_handicap": "14.8", "c3_handicap": "15.4" },
    { "id": "p25", "name": "JAY TYLER", "handicap": 28, "category": "guest", "c1_handicap": "28", "c2_handicap": "28", "c3_handicap": "28" },
    { "id": "p17", "name": "JORDAN DALE", "handicap": 22.2, "category": "guest", "c1_handicap": "22.2", "c2_handicap": "22.2", "c3_handicap": "22.2" },
    { "id": "p16", "name": "JOSH DALE", "handicap": 19.8, "category": "guest", "c1_handicap": "19.8", "c2_handicap": "19.8", "c3_handicap": "19.8" },
    { "id": "p31", "name": "Martin", "handicap": 28, "category": "guest", "c1_handicap": "28", "c2_handicap": "28", "c3_handicap": "28" },
    { "id": "p15", "name": "STEVE SMITH", "handicap": 17.6, "category": "guest", "c1_handicap": "17.6", "c2_handicap": "17.6", "c3_handicap": "17.6" }
];

// State
let players = [];
let settings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));
let currentView = 'handicaps'; 
let isEditMode = false;
let highlightState = 0; // 0: off, 1: placement, 2: skill
let isAuthenticated = false;
let isGuest = false;
let lastFocusedField = { playerId: null, property: null };

// Course Sync (JSONBin.io)
const JSONBIN_API_BASE = 'https://api.jsonbin.io/v3';
let syncTimeout = null;

// Initialize
async function init() {
    try {
        setupEventListeners();
        
        // If this is a snapshot, use the injected data
        if (window.SNAPSHOT_DATA) {
            players = window.SNAPSHOT_DATA.players || [];
            settings = window.SNAPSHOT_DATA.settings || JSON.parse(JSON.stringify(INITIAL_SETTINGS));
            if (!settings.courses || !Array.isArray(settings.courses)) {
                settings.courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];
            }
            currentView = window.SNAPSHOT_DATA.currentView || 'handicaps';
            isGuest = true;
            isAuthenticated = false;
            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.classList.add('hidden');
        } else {
            loadData();
            loadSettings();
            await loadFromCloud();
            // Always fallback to INITIAL_DATA if no players loaded (new device/empty localStorage)
            if (!players || players.length === 0) {
                players = JSON.parse(JSON.stringify(INITIAL_DATA));
                saveData();
            }
            checkAuthentication();
        }
        
        applySettings();
        renderPlayers();
        updateUIForAuth();
    } catch (err) {
        console.error("Initialization error:", err);
        // Emergency fallback - always show data even if something fails
        if (!players || players.length === 0) {
            players = JSON.parse(JSON.stringify(INITIAL_DATA));
        }
        renderPlayers();
    }
}

function setupEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.onclick = attemptLogin;

    const guestBtn = document.getElementById('guestLoginBtn');
    if (guestBtn) guestBtn.onclick = () => {
        isGuest = true;
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.add('hidden');
        updateUIForAuth();
        renderPlayers(); // Ensure data is always visible after guest login
    };

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.onclick = () => {
        isAuthenticated = false;
        isGuest = false;
        location.reload();
    };

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.oninput = () => renderPlayers();

    const addPlayerBtn = document.getElementById('addPlayerBtn');
    if (addPlayerBtn) addPlayerBtn.onclick = openModal;

    const editModeBtn = document.getElementById('editModeBtn');
    if (editModeBtn) editModeBtn.onclick = toggleEditMode;

    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) resetBtn.onclick = resetToDefaults;

    const downloadBtn = document.getElementById('downloadDataBtn');
    if (downloadBtn) downloadBtn.onclick = downloadData;

    const importBtn = document.getElementById('importDataBtn');
    const importInput = document.getElementById('importInput');
    if (importBtn && importInput) {
        importBtn.onclick = () => importInput.click();
        importInput.onchange = importData;
    }

    const cancelAddBtn = document.getElementById('cancelAddBtn');
    if (cancelAddBtn) cancelAddBtn.onclick = closeModal;

    const confirmAddBtn = document.getElementById('confirmAddBtn');
    if (confirmAddBtn) confirmAddBtn.onclick = addNewPlayer;
}

// Settings Management
function loadSettings() {
    const stored = localStorage.getItem('universalSettings');
    if (stored) settings = JSON.parse(stored);
    if (!settings.courses || !Array.isArray(settings.courses)) {
        settings.courses = ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"];
    }
}

function saveSettings() {
    localStorage.setItem('universalSettings', JSON.stringify(settings));
    applySettings();
    saveData();
}

function applySettings() {
    const titleEl = document.querySelector('.logo-area h1');
    if (titleEl) {
        titleEl.innerHTML = `${settings.societyName} <span class="accent">${settings.societyYear}</span>`;
    }
    document.title = `${settings.societyName} ${settings.societyYear}`;

    const headers = document.querySelectorAll('.list-header span');
    if (headers.length >= 7) {
        headers[1].textContent = currentView === 'handicaps' ? 'HCP' : 'POINTS';
        (settings.courses || []).forEach((name, i) => {
            if (headers[i + 2]) headers[i + 2].textContent = name;
        });
    }
    
    const tabHcp = document.getElementById('tabHandicaps');
    const tabScores = document.getElementById('tabScores');
    if (tabHcp && tabScores) {
        tabHcp.classList.toggle('active', currentView === 'handicaps');
        tabScores.classList.toggle('active', currentView === 'scores');
    }

    if (currentView === 'scores') {
        document.body.classList.add('scores-theme');
    } else {
        document.body.classList.remove('scores-theme');
    }
}

window.setView = function(view) {
    currentView = view;
    applySettings();
    renderPlayers();
}

// Formatting
function formatDisplayName(name) {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) return name;
    return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}`;
}

// Rendering
function renderPlayers() {
    const playerGrid = document.getElementById('playerGrid');
    if (!playerGrid) return;
    playerGrid.innerHTML = '';
    
    const searchInput = document.getElementById('searchInput');
    const text = searchInput ? searchInput.value.toLowerCase() : '';

    players.sort((a, b) => a.name.localeCompare(b.name));
    const filtered = players.filter(p => p.name.toLowerCase().includes(text));

    filtered.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        const displayName = formatDisplayName(player.name);
        const nameHtml = `<div class="player-name" ${isAuthenticated ? `onclick="window.openEditModal('${player.id}')"` : ''} style="${isAuthenticated ? 'cursor:pointer;' : ''}">${displayName}</div>`;
        const disabled = isAuthenticated ? '' : 'disabled';
        const isReadOnly = highlightState > 0 ? 'readonly' : '';

        let totalScore = 0;
        [1, 2, 3, 4, 5].forEach(i => {
            const s = parseFloat(player[`c${i}_score`]);
            if (!isNaN(s)) totalScore += s;
        });

        const mainVal = currentView === 'handicaps' ? parseFloat(player.handicap || 28).toFixed(1) : totalScore;

        card.innerHTML = `
            <div class="player-header">${nameHtml}</div>
            <div class="handicap-display" style="grid-column: 2;">
                <div class="handicap-value">${mainVal}</div>
            </div>
            ${[1, 2, 3, 4, 5].map((i) => {
                const prop = currentView === 'handicaps' ? `c${i}_handicap` : `c${i}_score`;
                const colorProp = `c${i}_color`;
                const skillProp = `c${i}_skill`;
                const val = player[prop] || '';
                const colorClass = player[colorProp] || 'h-none';
                const skillClass = player[skillProp] || 's-none';
                return `
                    <div class="handicap-display ${colorClass} ${skillClass}" style="grid-column: ${i + 2};">
                        <input type="text" class="course-input ${colorClass}" value="${val}" 
                               onfocus="window.setFocusedField('${player.id}', '${prop}')" 
                               oninput="window.updateCourseManual('${player.id}', '${prop}', this.value)" 
                               onclick="if(highlightState === 1) window.cycleColor('${player.id}', '${colorProp}'); else if(highlightState === 2) window.cycleSkill('${player.id}', '${skillProp}');"
                               ondblclick="if(highlightState === 0) window.cycleColor('${player.id}', '${colorProp}')"
                               oncontextmenu="event.preventDefault(); window.cycleSkill('${player.id}', '${skillProp}')"
                               ${disabled} ${isReadOnly}>
                    </div>
                `;
            }).join('')}
            <div class="actions" style="grid-column: 8;">
                ${isEditMode && isAuthenticated ? `
                    <button class="btn-adjust" style="background:var(--danger); color:white;" onclick="window.deletePlayer('${player.id}')">
                        <span class="material-symbols-rounded" style="font-size:1.1rem;">delete</span>
                    </button>
                ` : `
                    <button class="btn-adjust" onclick="window.updateGlobalHandicaps('${player.id}', -1)" ${disabled}>-</button>
                    <button class="btn-adjust" onclick="window.updateGlobalHandicaps('${player.id}', 1)" ${disabled}>+</button>
                `}
            </div>
        `;
        playerGrid.appendChild(card);
    });
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    renderPlayers();
}

window.toggleHighlightMode = function() {
    highlightState = (highlightState + 1) % 3;
    const btn = document.getElementById('highlightModeBtn');
    if (btn) {
        btn.classList.toggle('active', highlightState > 0);
        if (highlightState === 0) {
            btn.innerHTML = '<span class="material-symbols-rounded">palette</span>';
            btn.style.color = '';
        } else if (highlightState === 1) {
            btn.innerHTML = '<span class="material-symbols-rounded">palette</span>';
            btn.style.color = '#22c55e'; // Green
        } else if (highlightState === 2) {
            btn.innerHTML = '<span class="material-symbols-rounded">rocket_launch</span>';
            btn.style.color = '#eab308'; // Yellow
        }
    }
    renderPlayers();
}

window.cycleColor = function (id, colorProperty) {
    if (!isAuthenticated) return;
    const p = players.find(x => x.id === id);
    if (!p) return;
    const colors = ['h-none', 'h-winner', 'h-runner', 'h-last'];
    const current = p[colorProperty] || 'h-none';
    const nextIndex = (colors.indexOf(current) + 1) % colors.length;
    p[colorProperty] = colors[nextIndex];
    saveData();
    renderPlayers();
}

window.cycleSkill = function (id, skillProperty) {
    if (!isAuthenticated) return;
    const p = players.find(x => x.id === id);
    if (!p) return;
    const skills = ['s-none', 's-longest', 's-nearest', 's-both'];
    const current = p[skillProperty] || 's-none';
    const nextIndex = (skills.indexOf(current) + 1) % skills.length;
    p[skillProperty] = skills[nextIndex];
    saveData();
    renderPlayers();
}

function resetToDefaults() {
    if (confirm('Are you sure you want to reset the app? This will clear all data.')) {
        players = [];
        settings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));
        saveData();
        saveSettings();
        location.reload();
    }
}

function openModal() { document.getElementById('addPlayerModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('addPlayerModal').classList.add('hidden'); }

function addNewPlayer() {
    const name = document.getElementById('newPlayerName').value.trim();
    const hcp = parseFloat(document.getElementById('newPlayerHcp').value) || 28.0;
    const cat = document.getElementById('newPlayerCategory').value;
    
    if (!name) {
        alert('Please enter a name.');
        return;
    }
    
    const newPlayer = {
        id: 'p' + Date.now(),
        name: name.toUpperCase(),
        handicap: hcp,
        category: cat
    };
    
    [1,2,3,4,5].forEach(i => {
        newPlayer[`c${i}_handicap`] = '';
        newPlayer[`c${i}_score`] = '';
    });
    
    players.push(newPlayer);
    saveData();
    renderPlayers();
    closeModal();
    
    document.getElementById('newPlayerName').value = '';
    document.getElementById('newPlayerHcp').value = '28.0';
}

window.openEditModal = function(id) {
    if (!isAuthenticated) return;
    const p = players.find(x => x.id === id);
    if (!p) return;
    editingPlayerId = id;
    document.getElementById('editPlayerName').value = p.name;
    document.getElementById('editPlayerCategory').value = p.category;
    document.getElementById('editPlayerModal').classList.remove('hidden');
}

window.closeEditModal = function() {
    document.getElementById('editPlayerModal').classList.add('hidden');
    editingPlayerId = null;
}

window.saveEditPlayer = function() {
    if (!editingPlayerId) return;
    const p = players.find(x => x.id === editingPlayerId);
    if (p) {
        p.name = document.getElementById('editPlayerName').value.trim().toUpperCase();
        p.category = document.getElementById('editPlayerCategory').value;
        saveData();
        renderPlayers();
    }
    window.closeEditModal();
}

window.deletePlayer = function(id) {
    if (!confirm('Delete this player?')) return;
    players = players.filter(x => x.id !== id);
    saveData();
    renderPlayers();
}

// Auth Logic
function hashPassword(password) {
    let h = 0;
    for (let i = 0; i < password.length; i++) {
        h = ((h << 5) - h + password.charCodeAt(i)) | 0;
    }
    return 'fb_' + (h >>> 0).toString(16);
}

function checkAuthentication() {
    const storedHash = localStorage.getItem('adminPasswordHash');
    if (!storedHash) {
        document.getElementById('loginTitle').textContent = 'Create Admin Password';
    }
    document.getElementById('loginModal').classList.remove('hidden');
}

function attemptLogin() {
    const loginPassword = document.getElementById('loginPassword');
    const password = loginPassword.value;
    const storedHash = localStorage.getItem('adminPasswordHash');

    if (password === 'RESET') {
        localStorage.removeItem('adminPasswordHash');
        alert('Password reset! Please refresh.');
        location.reload();
        return;
    }

    if (!password) return;
    const inputHash = hashPassword(password);
    
    if (!storedHash || inputHash === storedHash) {
        if (!storedHash) localStorage.setItem('adminPasswordHash', inputHash);
        isAuthenticated = true;
        document.getElementById('loginModal').classList.add('hidden');
        updateUIForAuth();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function updateUIForAuth() {
    const tabs = document.querySelector('.view-tabs');
    if (tabs) tabs.style.display = (isAuthenticated || isGuest) ? 'flex' : 'none';
    
    const settingsBtn = document.getElementById('settingsBtn');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const editModeBtn = document.getElementById('editModeBtn');
    const highlightModeBtn = document.getElementById('highlightModeBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const cloudBtn = document.getElementById('cloudSetupBtn');
    const importBtn = document.getElementById('importDataBtn');
    const backupBtn = document.getElementById('downloadDataBtn');
    const shareBtn = document.getElementById('shareSnapshotBtn');
    const passBtn = document.getElementById('changePasswordBtn');
    const resetBtn = document.getElementById('resetDataBtn');

    if (logoutBtn) logoutBtn.style.display = (isAuthenticated || isGuest) ? 'flex' : 'none';
    
    if (isAuthenticated) {
        if (settingsBtn) settingsBtn.style.display = 'flex';
        if (addPlayerBtn) addPlayerBtn.style.display = 'flex';
        if (editModeBtn) editModeBtn.style.display = 'flex';
        if (highlightModeBtn) highlightModeBtn.style.display = 'flex';
        if (cloudBtn) cloudBtn.style.display = 'flex';
        if (importBtn) importBtn.style.display = 'inline-block';
        if (backupBtn) backupBtn.style.display = 'inline-block';
        if (shareBtn) shareBtn.style.display = 'inline-block';
        if (passBtn) passBtn.style.display = 'inline-block';
        if (resetBtn) resetBtn.style.display = 'inline-block';
    } else {
        if (settingsBtn) settingsBtn.style.display = 'none';
        if (addPlayerBtn) addPlayerBtn.style.display = 'none';
        if (editModeBtn) editModeBtn.style.display = 'none';
        if (highlightModeBtn) highlightModeBtn.style.display = 'none';
        if (cloudBtn) cloudBtn.style.display = 'none';
        if (importBtn) importBtn.style.display = 'none';
        if (backupBtn) backupBtn.style.display = 'none';
        if (shareBtn) shareBtn.style.display = 'none';
        if (passBtn) passBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';
    }
    renderPlayers();
}

// Manual Updates
window.updateCourseManual = function (id, property, value) {
    if (!isAuthenticated) return;
    const p = players.find(x => x.id === id);
    if (p) { p[property] = value; saveData(); }
}
window.setFocusedField = function (playerId, property) { lastFocusedField = { playerId, property }; }
window.updateGlobalHandicaps = function (id, delta) {
    if (!isAuthenticated) return;
    const p = players.find(x => x.id === id);
    if (p) {
        const prop = (lastFocusedField.playerId === id && lastFocusedField.property) ? lastFocusedField.property : (currentView === 'handicaps' ? 'handicap' : 'c1_score');
        if (prop === 'handicap') p.handicap = parseFloat((p.handicap + delta * 0.1).toFixed(1));
        else {
            let v = parseFloat(p[prop]) || 0;
            p[prop] = Math.round(v + delta);
        }
        saveData(); renderPlayers();
    }
}

// Data
function loadData() {
    const d = localStorage.getItem('universalData');
    if (d) players = JSON.parse(d);
}
function saveData() {
    localStorage.setItem('universalData', JSON.stringify(players));
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(syncToCloud, 1000);
}

// Cloud
const HARDCODED_API_KEY = '$2a$10$hKjaZqWspLX/xACIgM9hMuYKyeHjv1dBzIoVhENlUaFEQp0CWatBO';
const HARDCODED_BIN_ID = '6a0c15af6610dd3ae86bb8d4';

function getCloudConfig() {
    return {
        apiKey: HARDCODED_API_KEY || localStorage.getItem('jb_api_key') || '',
        binId:  HARDCODED_BIN_ID  || localStorage.getItem('jb_bin_id')  || ''
    };
}

async function loadFromCloud() {
    const { apiKey: k, binId: b } = getCloudConfig();
    if (!k || !b) return;
    try {
        const res = await fetch(`${JSONBIN_API_BASE}/b/${b}/latest`, { headers: { 'X-Master-Key': k }, cache: 'no-store' });
        if (res.ok) {
            const d = await res.json();
            if (d.record) {
                if (d.record.players && d.record.players.length > 0) players = d.record.players;
                if (d.record.settings) {
                    settings = d.record.settings;
                    if (!settings.courses || !Array.isArray(settings.courses)) {
                        settings.courses = ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"];
                    }
                }
                renderPlayers(); applySettings();
            }
        }
    } catch (e) { console.warn('Cloud load failed, using local data'); }
}

// Cloud Setup
window.openCloudSetup = function() {
    const modal = document.getElementById('cloudSetupModal');
    if (!modal) return;
    document.getElementById('cloudApiKey').value = localStorage.getItem('jb_api_key') || '';
    document.getElementById('cloudBinId').value = localStorage.getItem('jb_bin_id') || '';
    modal.classList.remove('hidden');
};

window.closeCloudSetup = function() {
    const modal = document.getElementById('cloudSetupModal');
    if (modal) modal.classList.add('hidden');
};

window.saveCloudSetup = async function() {
    const k = document.getElementById('cloudApiKey').value.trim();
    const b = document.getElementById('cloudBinId').value.trim();
    if (!k || !b) {
        alert('Please enter both keys.');
        return;
    }
    localStorage.setItem('jb_api_key', k);
    localStorage.setItem('jb_bin_id', b);
    window.closeCloudSetup();
    await syncToCloud();
    await loadFromCloud();
    alert('Cloud sync connected!');
};

async function syncToCloud() {
    const { apiKey: k, binId: b } = getCloudConfig();
    if (!k || !b) return;
    try {
        await fetch(`${JSONBIN_API_BASE}/b/${b}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-Master-Key': k },
            body: JSON.stringify({ players, settings })
        });
    } catch (e) { console.warn('Cloud sync failed'); }
}

// Settings Modals
window.openSettingsModal = function() {
    document.getElementById('setSocietyName').value = settings.societyName || '';
    document.getElementById('setSocietyYear').value = settings.societyYear || '';
    if (!settings.courses || !Array.isArray(settings.courses)) {
        settings.courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];
    }
    [1,2,3,4,5].forEach(i => document.getElementById(`setCourse${i}`).value = settings.courses[i-1] || '');
    document.getElementById('settingsModal').classList.remove('hidden');
}
window.closeSettingsModal = function() { document.getElementById('settingsModal').classList.add('hidden'); }
window.confirmSaveSettings = function() {
    settings.societyName = document.getElementById('setSocietyName').value;
    settings.societyYear = document.getElementById('setSocietyYear').value;
    settings.courses = [1,2,3,4,5].map(i => document.getElementById(`setCourse${i}`).value);
    saveSettings(); closeSettingsModal();
}

// Password Management
window.openChangePasswordModal = function() {
    document.getElementById('changePasswordModal').classList.remove('hidden');
}
window.closeChangePasswordModal = function() {
    document.getElementById('changePasswordModal').classList.add('hidden');
    document.getElementById('changePassError').style.display = 'none';
}
window.saveNewPassword = function() {
    const p1 = document.getElementById('newAdminPassword').value;
    const p2 = document.getElementById('confirmAdminPassword').value;
    if (!p1) return;
    if (p1 !== p2) {
        document.getElementById('changePassError').style.display = 'block';
        return;
    }
    localStorage.setItem('adminPasswordHash', hashPassword(p1));
    alert('Password updated successfully!');
    window.closeChangePasswordModal();
}

// Snapshot
window.downloadSnapshot = function() {
    const snapshotData = { players, settings, currentView };
    let html = document.documentElement.outerHTML;
    html = html.replace(/<script id="snapshot-data">[\s\S]*?<\/script>/, '');
    const injection = `<script id="snapshot-data">window.SNAPSHOT_DATA = ${JSON.stringify(snapshotData)};<\/script></body>`;
    html = html.replace('</body>', injection);
    const blob = new Blob(['<!DOCTYPE html>\n' + html], { type: 'text/html' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    
    // Create a filename with today's date
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `Universal-Golf-Snapshot-${dateStr}.html`;
    a.click();
};

// Data Operations
function downloadData() {
    const backup = {
        players,
        settings,
        version: 'universal-v1'
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `golf-universal-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const data = JSON.parse(ev.target.result);
            // Handle both legacy (just array) and universal (object with players/settings) formats
            if (Array.isArray(data)) {
                players = data;
            } else if (data.players) {
                players = data.players;
                if (data.settings) settings = data.settings;
            }
            saveData();
            saveSettings();
            renderPlayers();
            applySettings();
            alert('Data imported successfully!');
        } catch (err) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}


// Clear all highlights from all players for all courses
window.clearAllHighlights = function() {
    if (!isAuthenticated) return;
    if (!confirm('Clear ALL highlights (Winner/Runner Up/Last/Longest/Nearest) for all players and courses?')) return;
    players.forEach(p => {
        [1,2,3,4,5].forEach(i => {
            p['c' + i + '_color'] = 'h-none';
            p['c' + i + '_skill'] = 's-none';
        });
    });
    saveData();
    renderPlayers();
};

// Clear all score/handicap entries for all players for all courses
window.clearAllScores = function() {
    if (!isAuthenticated) return;
    if (!confirm('Clear ALL scores and course handicaps for every player? This cannot be undone.')) return;
    players.forEach(p => {
        [1,2,3,4,5].forEach(i => {
            p['c' + i + '_score']    = '';
            p['c' + i + '_handicap'] = '';
            p['c' + i + '_color']    = 'h-none';
            p['c' + i + '_skill']    = 's-none';
        });
    });
    saveData();
    renderPlayers();
};

// Startup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}