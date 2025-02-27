document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    // Login Form Submission Handling
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
  
        if (email === "test@sundorzon.com" && password === "password123") {
          alert("Login Successful!");
          window.location.href = "index.html"; // Redirect to home page
        } else {
          alert("Invalid credentials. Please try again.");
        }
      });
    }
  
    // Registration Form Submission Handling
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
  
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        alert(`Registration Successful! Welcome, ${name}`);
        window.location.href = "login.html"; // Redirect to login page
      });
    }
  });
  