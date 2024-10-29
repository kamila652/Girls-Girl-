document.getElementById('loginPrompt').onclick = function() {
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.innerHTML = `
        <div class="mb-3">
            <label for="loginUsername" class="form-label">Username or Email</label>
            <input type="text" class="form-control" id="loginUsername" required>
        </div>
        <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="loginPassword" required>
        </div>
        <button type="button" onclick="handleLogin()" class="btn btn-outline-light">Log in</button>
        <div id="loginErrorMessage" class="error text-danger mt-2"></div>
        <p id="subscribePrompt" class="mt-2" style="cursor: pointer; color: lightblue;">Not registered? Register</p>
    `;
    document.getElementById('welcomeMessage').textContent = 'Log in to Girls Girl💋';
    document.getElementById('loginPrompt').style.display = 'none';
    document.getElementById('subscribePrompt').style.display = 'block';

    document.getElementById('subscribePrompt').onclick = function() {
        displayRegistrationForm();
    };
};

function displayRegistrationForm() {
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.innerHTML = `
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" required>
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPassword" required>
        </div>
        <button type="submit" class="btn btn-outline-light">Register</button>
        <div id="errorMessage" class="error text-danger mt-2"></div>
    `;
    document.getElementById('welcomeMessage').textContent = 'Join to Girls Girl💋';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('loginPrompt').style.display = 'block'; 
    document.getElementById('subscribePrompt').style.display = 'none'; 
    document.getElementById('errorMessage').textContent = ''; 
}

document.getElementById('subscribeForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = 'Password must contain at least 8 characters, one uppercase letter, one number, and one special symbol (!@#$%^&*).';
    } else if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
    } else if (localStorage.getItem(username) || localStorage.getItem(email)) {
        errorMessage.textContent = 'User already exists!';
    } else {
        errorMessage.textContent = '';
        localStorage.setItem(username, JSON.stringify({ email, password }));
        displayWelcomeMessage(username);
    }
};

function displayWelcomeMessage(username) {
    document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
    document.getElementById('subscribeForm').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'inline';
}

function logout() {
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.innerHTML = `
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
        </div>
        <button type="submit" class="btn btn-outline-light">Register</button>
        <div id="errorMessage" class="error text-danger mt-2"></div>
    `;
    document.getElementById('welcomeMessage').textContent = 'Join to Girls Girl💋';
    document.getElementById('subscribeForm').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('loginPrompt').style.display = 'block';
    document.getElementById('errorMessage').textContent = ''; 
}

document.getElementById('logoutButton').onclick = logout;

function handleLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const userData = localStorage.getItem(loginUsername);

    if (!userData) {
        loginErrorMessage.textContent = 'Not registered yet.';
    } else {
        const user = JSON.parse(userData);
        if (user.password === loginPassword) {
            displayWelcomeMessage(loginUsername);
        } else {
            loginErrorMessage.textContent = 'Incorrect password.';
        }
    }
}
