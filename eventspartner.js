// Select all dropdown links
document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent navigation

        let dropdown = this.parentElement;
        let footer = document.querySelector(".footer");

        // Close any other open dropdowns and reset chevrons
        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== dropdown) {
                d.classList.remove("active");
                d.querySelector(".chevron").style.transform = "rotate(0deg)"; // Reset chevron
            }
        });

        // Toggle the clicked dropdown
        dropdown.classList.toggle("active");

        // If a dropdown is active, make the footer white and rotate chevron up
        if (dropdown.classList.contains("active")) {
            footer.classList.add("active");
            dropdown.querySelector(".chevron").style.transform = "rotate(180deg)";
        } else {
            footer.classList.remove("active");
            dropdown.querySelector(".chevron").style.transform = "rotate(0deg)";
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown").forEach(d => {
            d.classList.remove("active");
            d.querySelector(".chevron").style.transform = "rotate(0deg)"; // Reset all chevrons
        });
        document.querySelector(".footer").classList.remove("active");
    }
});
