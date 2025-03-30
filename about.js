document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById("changing-image");
    const imageSequence = ["assets/5051.jpg", "assets/5052.jpg", "assets/5053.jpg", "assets/5054.jpg", "assets/5055.jpg", "assets/5056.jpg", "assets/5057.jpg", "assets/5058.jpg", "assets/5050.jpg"];
    let index = 0;

    function changeImage() {
        image.src = imageSequence[index]; 
        index = (index + 1) % imageSequence.length; // Loops back to 430.jpg after the last image
    }

    setInterval(changeImage, 1500); // Changes image every 1.5s
});
