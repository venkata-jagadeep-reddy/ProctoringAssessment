document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 600; // 10 minutes in seconds
    let timerElement = document.getElementById("time");
    let videoElement = document.getElementById("quiz-video");
    let submitButton = document.getElementById("submit-btn");

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            alert("Time is up! Submitting your answers.");
            document.getElementById("quiz-form").submit();
        }
    }

    updateTimer();

    // Prevent submission before watching the full video
    videoElement.addEventListener("ended", function () {
        submitButton.disabled = false;
        alert("You can now submit your answers.");
    });

    // Handle Form Submission
    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your answers have been submitted successfully!");
        window.location.href = "index.html"; // Redirect after submission
    });
});
