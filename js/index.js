let login = document.querySelector('.login');
let email = document.querySelector('.email');
let password = document.querySelector('.password');
let userName = document.querySelector('.username');
let userPassword = document.querySelector('.user-password');
let loginButton = document.querySelector('.login-btn');
let regButton =  document.querySelector('.btn');
let regForm = document.querySelector('.register-form');
let logForm = document.querySelector('.login-form');
let signUp = document.querySelector('.sign-up');
let logIn = document.querySelector('.log-in');
let backRegButton = document.querySelector('.back-reg-button');
let backLogButton = document.querySelector('.back-log-button');
let loginLabel = document.querySelector('.label-login');
let passwordLabel = document.querySelector('.label-password')
let users = localStorage.users ? JSON.parse(localStorage.users) : [];

function loginFormToggle() {
    logForm.classList.toggle('login-form-display-block');
    regForm.classList.remove('reg-form-display-block');
}

function authenticationButtonsRemove() {
    signUp.classList.remove('login-form');
    logIn.classList.remove('login-form');
}

function authenticationButtonsAdd() {
    signUp.classList.add('login-form');
    logIn.classList.add('login-form');
}

backRegButton.addEventListener('click', () => {
    if (regForm.classList.contains('reg-form-display-block')) {
        regForm.classList.remove('reg-form-display-block');
    }
    authenticationButtonsRemove();
})

backLogButton.addEventListener('click', () => {
    if (logForm.classList.contains('login-form-display-block')) {
        logForm.classList.remove('login-form-display-block');
    }
    authenticationButtonsRemove();
})

signUp.addEventListener('click', () => {
    regForm.classList.toggle('reg-form-display-block');
    logForm.classList.remove('login-form-display-block');
    authenticationButtonsAdd();
})

logIn.addEventListener('click', () => {
    loginFormToggle();
    authenticationButtonsAdd();
})

regButton.addEventListener('click', () => {
    regForm.addEventListener('submit', event => {
        event.preventDefault();
    })
    if (login.value && email.value && password.value) {
        users.push({'username': login.value, 'email': email.value,'password': password.value});
        regForm.classList.toggle('reg-form-display-block');
        logForm.classList.remove('login-form-display-block');
        localStorage.users = JSON.stringify(users);   
        document.location.href = 'task-manager.html';
    }
})

loginButton.addEventListener('click', () => {
    logForm.addEventListener('submit', event => {
        event.preventDefault();
    })
    users.forEach(user => {
        if (userName.value === user.username && userPassword.value === user.password) {
            document.location.href = 'task-manager.html';
            localStorage.setItem('loginedUser', userName.value)
            loginFormToggle();
        } else if (userName.value !== user.username) {
            loginLabel.textContent = 'Unknown username';
            loginLabel.classList.add('red');
            userName.classList.add('border-red');
        } else {
            loginLabel.textContent = 'Username';
            loginLabel.classList.remove('red');
            userName.classList.remove('border-red');
        }
        if (userPassword.value !== user.password) {
            passwordLabel.textContent = 'Wrong password';
            passwordLabel.classList.add('red');
            userPassword.classList.add('border-red');
        } else {
            passwordLabel.textContent = 'our password';
            passwordLabel.classList.remove('red');
            userPassword.classList.remove('border-red');
        }
    })
});