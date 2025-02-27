const API_URL = "https://yourbackendapi.com/api"; // Replace with actual backend URL

// AUTHENTICATION FUNCTIONS
async function loginUser(email, password) {
    try {
        let response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        let data = await response.json();
        if (!response.ok) throw new Error(data.message);

        localStorage.setItem("token", data.token);
        alert("Login Successful");
        toggleAuthUI(true);
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

async function registerUser(email, password) {
    try {
        let response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        let data = await response.json();
        if (!response.ok) throw new Error(data.message);

        alert("Registration Successful! Please login.");
        toggleAuthUI(false);
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    alert("Logged out!");
    toggleAuthUI(false);
}

// CRUD OPERATIONS
async function addItem(itemName) {
    try {
        let response = await fetch(`${API_URL}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name: itemName }),
        });

        let data = await response.json();
        if (!response.ok) throw new Error(data.message);

        displayItems(); // Refresh item list
    } catch (error) {
        alert("Error adding item: " + error.message);
    }
}

async function displayItems() {
    try {
        let response = await fetch(`${API_URL}/items`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        let items = await response.json();
        let itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";

        items.forEach((item) => {
            let li = document.createElement("li");
            li.innerHTML = `${item.name} 
                <button onclick="deleteItem('${item.id}')">Delete</button>`;
            itemsList.appendChild(li);
        });
    } catch (error) {
        alert("Error fetching items: " + error.message);
    }
}

async function deleteItem(itemId) {
    try {
        let response = await fetch(`${API_URL}/items/${itemId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        let data = await response.json();
        if (!response.ok) throw new Error(data.message);

        displayItems(); // Refresh list after deletion
    } catch (error) {
        alert("Error deleting item: " + error.message);
    }
}

// UI HANDLING
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        loginUser(
            document.getElementById("login-email").value,
            document.getElementById("login-password").value
        );
    });

    document.getElementById("register-form").addEventListener("submit", function (e) {
        e.preventDefault();
        registerUser(
            document.getElementById("register-email").value,
            document.getElementById("register-password").value
        );
    });

    document.getElementById("logout-btn").addEventListener("click", logoutUser);

    document.getElementById("add-item-form").addEventListener("submit", function (e) {
        e.preventDefault();
        addItem(document.getElementById("item-name").value);
    });

    document.getElementById("show-register").addEventListener("click", function () {
        toggleAuthUI(false, true);
    });

    if (localStorage.getItem("token")) {
        toggleAuthUI(true);
        displayItems();
    }
});

function toggleAuthUI(isLoggedIn, isRegister = false) {
    document.getElementById("login-form").style.display = isLoggedIn ? "none" : isRegister ? "none" : "block";
    document.getElementById("register-form").style.display = isRegister ? "block" : "none";
    document.getElementById("register-heading").style.display = isRegister ? "block" : "none";
    document.getElementById("logout-btn").style.display = isLoggedIn ? "block" : "none";
    document.querySelector(".crud-container").style.display = isLoggedIn ? "block" : "none";
}
