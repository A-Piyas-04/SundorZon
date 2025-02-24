document.addEventListener('DOMContentLoaded', () => {
    // Get Firebase auth instance and helper functions from window object
    const auth = window.firebaseAuth;
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = window.firebaseAuthHelpers;

    // DOM Elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const signupError = document.getElementById('signup-error');
    const loginError = document.getElementById('login-error');

    // Sign Up Handler
    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            signupError.textContent = error.message;
        }
    });

    // Login Handler
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            loginError.textContent = error.message;
        }
    });

    // Add smooth transition effects
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.style.transition = 'opacity 0.3s ease-in-out';
    });

    // Enhanced form toggle with fade effect
    window.toggleForms = () => {
        const loginSection = document.getElementById('login-section');
        const signupSection = document.getElementById('signup-section');
        
        if (loginSection.style.display === 'none') {
            signupSection.style.opacity = '0';
            setTimeout(() => {
                signupSection.style.display = 'none';
                loginSection.style.display = 'block';
                setTimeout(() => {
                    loginSection.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            loginSection.style.opacity = '0';
            setTimeout(() => {
                loginSection.style.display = 'none';
                signupSection.style.display = 'block';
                setTimeout(() => {
                    signupSection.style.opacity = '1';
                }, 50);
            }, 300);
        }
    };
});
