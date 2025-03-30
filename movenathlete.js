document.addEventListener("DOMContentLoaded", function () {
    const futureSection = document.querySelector(".future-section");
    const communityPocket = document.querySelector(".community-pocket");
    const firstSection = document.getElementById("first-section");
    const secondPocket = document.getElementById("second-pocket");

    window.addEventListener("scroll", function () {
        const futureSectionTop = futureSection.getBoundingClientRect().top;
        const communityPocketTop = communityPocket.getBoundingClientRect().top;
        const pocketPosition = secondPocket.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        // Move "Future Moven Athletes" when scrolling
        if (futureSectionTop <= viewportHeight * 0.5) {
            futureSection.style.transform = "translateY(-100px)";
        } else {
            futureSection.style.transform = "translateY(0)";
        }

        // Move "Community Section" when scrolling
        if (communityPocketTop <= viewportHeight * 0.5) {
            communityPocket.style.transform = "translateY(-100px)";
        } else {
            communityPocket.style.transform = "translateY(0)";
        }

        // Hide/show "first-section" when it reaches "second-pocket"
        if (pocketPosition <= viewportHeight * 0.5) {
            firstSection.classList.add("hidden"); // Hide the first section
        } else {
            firstSection.classList.remove("hidden"); // Show the first section
        }
    });
});
