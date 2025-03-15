document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 600; // 10 minutes in seconds
    let timerElement = document.getElementById("time");
    let currentAudioIndex = 0;
    const audioElements = ["audio1.mp3", "audio2.mp3","audio3.mp3"];
    const questions = document.querySelectorAll(".question");

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

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.style.display = "block";
                i += 3;
                index += 3;
            } else {
                  question.style.display = "none";
            }
            
            question.style.opacity = (i === index) ? 1 : 0; // Set opacity for fade effect
        });
    }

    function loadNextAudio() {
        if (currentAudioIndex < audioElements.length - 1) {
            currentAudioIndex++;
            showQuestion(currentAudioIndex);
        }
    }

    function loadPreviousAudio() {
        if (currentAudioIndex > 0) {
            currentAudioIndex--;
            showQuestion(currentAudioIndex);
        }
    }

    document.getElementById("next-btn").addEventListener("click", loadNextAudio);
    document.getElementById("prev-btn").addEventListener("click", loadPreviousAudio);

    document.getElementById("quiz-audio").addEventListener("ended", loadNextAudio);

    updateTimer();
    
    // Handle Form Submission
    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Your answers have been submitted successfully!");
        window.location.href = "choice.html"; // Redirect after submission
    });

    // Initialize the first question
    showQuestion(currentAudioIndex);
});