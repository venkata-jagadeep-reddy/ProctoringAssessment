document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 600; // 10 minutes in seconds
    let timerElement = document.getElementById("time");
    let slides = document.querySelectorAll(".question-slide");
    let currentSlide = 0;

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            alert("Time is up! Submitting your answers.");
            document.getElementById("blanks-form").submit();
        }
    }

    updateTimer();

    // Slide Navigation
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        // Update progress bar
        let progress = ((index + 1) / slides.length) * 100;
        document.getElementById("progress-bar").style.width = `${progress}%`;

        // Control button visibility
        document.getElementById("prev-btn").disabled = index === 0;
        document.getElementById("next-btn").classList.toggle("hidden", index === slides.length - 1);
        document.getElementById("submit-btn").classList.toggle("hidden", index !== slides.length - 1);
    }

    window.nextQuestion = function () {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    };

    window.prevQuestion = function () {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    };

    // Show first slide initially
    showSlide(currentSlide);

    // Handle Form Submission
    document.getElementById("blanks-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your answers have been submitted successfully!");
        window.location.href = "index.html"; // Redirect after submission
    });
});
