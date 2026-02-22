document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("clubToggle");
    const label = document.getElementById("toggleLabel");
    const icon = document.getElementById("toggleIcon");

    let isActive = false;

    toggle.addEventListener("click", () => {
        isActive = !isActive;
        toggle.classList.toggle("active", isActive);

        if (isActive) {
            label.textContent = "Run Club";
            icon.src = "IconJog.svg";
        } else {
            label.textContent = "Walk Club";
            icon.src = "IconWalk.svg";
        }
    });
});
