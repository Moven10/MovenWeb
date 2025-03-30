document.addEventListener("DOMContentLoaded", function () {
    let countedStats = false; // Prevent multiple triggers
    let countedProfile = false; // Prevent multiple triggers for profile section

    function countUp(element, target, speed) {
        let count = 0;
        let increment = Math.ceil(target / (1000 / speed));

        let interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = count + (element.dataset.suffix || ""); // Add % or M if needed
        }, speed);
    }

    function startCountingStats() {
        if (!countedStats) {
            countUp(document.getElementById("counter1"), 190, 10); // Count to 190
            countUp(document.getElementById("counter2"), 12, 100); // Count to 12M
            setTimeout(() => {
                document.getElementById("fade-in-text").style.opacity = "1"; // Fade-in $0
            }, 500);
            countedStats = true;
        }
    }

    function startCountingProfile() {
        if (!countedProfile) {
            countUp(document.getElementById("profile-counter1"), 72, 20); // Count to 72%
            countUp(document.getElementById("profile-counter2"), 85, 20); // Count to 85%
            countUp(document.getElementById("profile-counter3"), 1.4, 50); // Count to 1.4M
            countedProfile = true;
        }
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function onScroll() {
        if (isInViewport(document.getElementById("stats-section"))) {
            startCountingStats();
        }
        if (isInViewport(document.getElementById("profile-rectangle-section"))) {
            startCountingProfile();
        }

        if (countedStats && countedProfile) {
            window.removeEventListener("scroll", onScroll); // Stop checking once both are counted
        }
    }

    window.addEventListener("scroll", onScroll);
});
