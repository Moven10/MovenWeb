document.addEventListener("DOMContentLoaded", function () {
    const viewTokensBtn = document.getElementById("scrollToTokens");
    const transitionSections = [
        document.getElementById("transition1"),
        document.getElementById("transition2"),
        document.getElementById("transition3")
    ];
    const cardsSection = document.getElementById("cards-section");

    // Hide sections initially
    transitionSections.forEach(section => section.style.display = "none");
    cardsSection.style.display = "none";

    if (viewTokensBtn) {
        viewTokensBtn.addEventListener("click", function () {
            transitionSections.forEach(section => {
                section.style.display = "block";
                section.style.opacity = "0";
            });

            cardsSection.style.display = "block";
            cardsSection.style.opacity = "0";

            setTimeout(() => {
                transitionSections.forEach(section => section.style.opacity = "1");
                cardsSection.style.opacity = "1";
            }, 100);

            slowScrollTo(cardsSection, 3000);

            setTimeout(() => {
                window.dispatchEvent(new Event("scroll"));
            }, 500);
        });
    }

    function slowScrollTo(target, duration) {
        const startPosition = window.scrollY;
        const endPosition = target.getBoundingClientRect().top + window.scrollY;
        const distance = endPosition - startPosition;
        const startTime = performance.now();

        function animationStep(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (elapsedTime < duration) {
                requestAnimationFrame(animationStep);
            }
        }

        requestAnimationFrame(animationStep);
    }

    document.addEventListener("scroll", function () {
        document.querySelectorAll(".parallax-image").forEach((img) => {
            let speed = img.getBoundingClientRect().top * 0.06;
            img.style.transform = `translateY(${speed}px)`;
        });
    });

});
