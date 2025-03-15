// Toggle Login & Signup Forms
function toggleForms() {
    let loginBox = document.querySelector(".login-box");
    let signupBox = document.querySelector(".signup-box");
    let forgotPasswordBox = document.querySelector(".forgot-password-box");

    // Hide forgot password form if switching between login/signup
    forgotPasswordBox.classList.add("hidden");

    // Toggle visibility with animation
    if (loginBox.classList.contains("hidden")) {
        loginBox.classList.remove("hidden");
        signupBox.classList.add("hidden");
    } else {
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    }
}

// Show Forgot Password Form
function showForgotPassword() {
    document.querySelector(".login-box").classList.add("hidden");
    document.querySelector(".signup-box").classList.add("hidden");
    document.querySelector(".forgot-password-box").classList.remove("hidden");
}

// Show Login Form
function showLogin() {
    document.querySelector(".login-box").classList.remove("hidden");
    document.querySelector(".signup-box").classList.add("hidden");
    document.querySelector(".forgot-password-box").classList.add("hidden");
}

// Toggle password visibility
function togglePassword() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

//verification
document.querySelector(".login-box form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token in local storage (optional)
            localStorage.setItem("authToken", data.token);
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred. Please try again.");
    }
});


// Handle Registration Form Submission
document.querySelector(".signup-box form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            // Redirect to login form
            showLogin();
        } else {
            alert(data.message || "Registration failed.");
        }
    } catch (err) {
        console.error("Registration error:", err);
        alert("An error occurred. Please try again.");
    }
});

