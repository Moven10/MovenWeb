document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    const speed = 200;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute("data-target");
                        const count = +counter.innerText;

                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };

                    updateCount();
                });

                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById("statsGrid"));
});










document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("sliderTrack");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;

    function updateSlider(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"));
            updateSlider(index);
        });
    });

});
