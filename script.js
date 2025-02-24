document.addEventListener('DOMContentLoaded', () => {
  /* ====================================================
     8. Firebase Authentication Implementation
==================================================== */

// Get Firebase auth instance and helper functions from window object
const auth = window.firebaseAuth;
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = window.firebaseAuthHelpers;

// DOM Elements
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const signupError = document.getElementById('signup-error');
const loginError = document.getElementById('login-error');

// Sign Up Handler
signupForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    closeModal();
    alert('Account created successfully!');
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
    closeModal();
    alert('Logged in successfully!');
  } catch (error) {
    loginError.textContent = error.message;
  }
});

// Logout Handler
logoutButton?.addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert('Logged out successfully!');
  } catch (error) {
    console.error('Error logging out:', error);
  }
});

// Auth State Observer
onAuthStateChanged(auth, (user) => {
  const loginBtn = document.querySelector('.login-btn');
  if (user) {
    // User is signed in
    loginBtn.textContent = 'Logout';
    loginBtn.onclick = () => signOut(auth);
  } else {
    // User is signed out
    loginBtn.textContent = 'Login';
    loginBtn.onclick = openModal;
  }
});

// Modal Functions
function openModal() {
  const modal = document.getElementById('auth-modal');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('auth-modal');
  modal.style.display = 'none';
}

  /* ====================================================
     1. Responsive Navbar Toggle for Mobile Devices
  ==================================================== */
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    });
  }

  /* ====================================================
     2. Smooth Scroll Effect for Navigation
  ==================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Prevent default behavior
      e.preventDefault();
      const targetEl = document.querySelector(this.getAttribute('href'));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ====================================================
     3. On-Scroll Animations using Intersection Observer API
  ==================================================== */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Uncomment the next line if you want the animation to trigger only once
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  /* ====================================================
     4. Advanced Parallax Effect on Homepage Hero Section
  ==================================================== */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      let offset = window.pageYOffset;
      // Adjust the background position for a parallax effect
      heroSection.style.backgroundPositionY = `${offset * 0.5}px`;
    });
  }

  /* ====================================================
     5. Login and Signup Form Validation
  ==================================================== */
  const authForm = document.getElementById('auth-form'); // Ensure your login/signup form has id="auth-form"
  if (authForm) {
    authForm.addEventListener('submit', function (e) {
      const emailInput = authForm.querySelector('input[type="email"]');
      const passwordInput = authForm.querySelector('input[type="password"]');
      let valid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate email format
      if (!emailRegex.test(emailInput.value)) {
        valid = false;
        emailInput.classList.add('error');
        alert('Please enter a valid email address.');
      } else {
        emailInput.classList.remove('error');
      }

      // Validate password length (minimum 6 characters)
      if (passwordInput.value.length < 6) {
        valid = false;
        passwordInput.classList.add('error');
        alert('Password must be at least 6 characters long.');
      } else {
        passwordInput.classList.remove('error');
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  /* ====================================================
     6. Add-to-Cart Functionality with Local Storage
  ==================================================== */
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Assumes each product card includes data attributes: data-id, data-name, data-price, data-img
      const productCard = button.closest('.product-card');
      const product = {
        id: productCard.dataset.id,
        name: productCard.dataset.name,
        price: productCard.dataset.price,
        img: productCard.dataset.img,
        quantity: 1
      };
      addToCart(product);
    });
  });

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
  }

  /* ====================================================
     7. CRUD Operations for Admin (Dynamic Product Management)
  ==================================================== */
  const adminForm = document.getElementById('admin-form'); // Form for adding/updating products
  const adminProductList = document.getElementById('admin-product-list'); // Container for admin product list

  // Helper functions for product management in local storage
  const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];
  const saveProducts = products => localStorage.setItem('products', JSON.stringify(products));

  const renderProducts = () => {
    if (adminProductList) {
      adminProductList.innerHTML = '';
      const products = loadProducts();
      products.forEach(product => {
        const productRow = document.createElement('div');
        productRow.classList.add('admin-product-row');
        productRow.innerHTML = `
          <span>${product.name}</span>
          <span>${product.price}</span>
          <button class="edit-product" data-id="${product.id}">Edit</button>
          <button class="delete-product" data-id="${product.id}">Delete</button>
        `;
        adminProductList.appendChild(productRow);
      });
    }
  };

  if (adminForm) {
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const idField = adminForm.querySelector('input[name="id"]');
      const nameField = adminForm.querySelector('input[name="name"]');
      const priceField = adminForm.querySelector('input[name="price"]');
      let products = loadProducts();

      if (idField.value) {
        // Update existing product
        products = products.map(prod => {
          if (prod.id === idField.value) {
            return { ...prod, name: nameField.value, price: priceField.value };
          }
          return prod;
        });
      } else {
        // Add new product
        const newProduct = {
          id: Date.now().toString(),
          name: nameField.value,
          price: priceField.value
        };
        products.push(newProduct);
      }
      saveProducts(products);
      renderProducts();
      adminForm.reset();
    });
  }

  if (adminProductList) {
    adminProductList.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-product')) {
        const id = e.target.dataset.id;
        let products = loadProducts();
        products = products.filter(prod => prod.id !== id);
        saveProducts(products);
        renderProducts();
      }
      if (e.target.classList.contains('edit-product')) {
        const id = e.target.dataset.id;
        const products = loadProducts();
        const product = products.find(prod => prod.id === id);
        if (product) {
          adminForm.querySelector('input[name="id"]').value = product.id;
          adminForm.querySelector('input[name="name"]').value = product.name;
          adminForm.querySelector('input[name="price"]').value = product.price;
        }
      }
    });
  }

  /* ====================================================
     8. Dark Mode Toggle with Local Storage Persistence
  ==================================================== */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    // Initialize based on saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
});
