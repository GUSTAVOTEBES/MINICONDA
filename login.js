if (isLoggedIn()) {
    window.location.href = 'index.html';
}

const formLogin = document.getElementById('form-login');
const loginError = document.getElementById('login-error');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (loginUser(username, password)) {
        window.location.href = 'index.html';
    } else {
        loginError.classList.remove('d-none');
    }
});