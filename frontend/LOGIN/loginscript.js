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
