// ==========================================
// CREDENTIALS CONFIGURATION (Edit here)
// ==========================================
const VALID_USERNAME = 'gustavo';
const VALID_PASSWORD = 'UN2026AMS!';
// ==========================================

function getToken() {
    return sessionStorage.getItem('un_ams_token');
}

function isLoggedIn() {
    return getToken() !== null;
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

function loginUser(username, password) {
    if (username.trim().toLowerCase() === VALID_USERNAME.toLowerCase() && password === VALID_PASSWORD) {
        sessionStorage.setItem('un_ams_token', crypto.randomUUID());
        sessionStorage.setItem('un_ams_user', username.trim());
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem('un_ams_token');
    sessionStorage.removeItem('un_ams_user');
    window.location.href = 'login.html';
}