// Toggle visibility for New Password
function toggleNewPassword() {
    let passwordField = document.getElementById("new-password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Toggle visibility for Confirm New Password
function toggleConfirmPassword() {
    let confirmPasswordField = document.getElementById("confirm-new-password");
    confirmPasswordField.type = confirmPasswordField.type === "password" ? "text" : "password";
}
