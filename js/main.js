// Simple user "database" in localStorage for demo
const usersKey = 'earnweb_users';
const currentUserKey = 'earnweb_currentUser';

function loadUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(currentUserKey) || 'null');
}

function saveCurrentUser(user) {
  localStorage.setItem(currentUserKey, JSON.stringify(user));
}

// Login form handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      saveCurrentUser(user);
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  });
}

// Registration form handler
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    let users = loadUsers();
    if (users.some(u => u.email === email)) {
      alert('Email already registered');
      return;
    }
    const newUser = { name, email, password, balance: 0 };
    users.push(newUser);
    saveUsers(users);
    alert('Registration successful! Please login.');
    // Switch to login form
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('form-title').textContent = 'Login to EarnWeb';
  });
}
