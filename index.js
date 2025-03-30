// 📲 Mobile Redirect
if (/iPhone|Android|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = "mobile.html"; // Redirect mobile users to mobile.html
}

// Get the dropdown trigger and menu
const dropdownTrigger = document.getElementById('ways-to-move');
const dropdownMenu = dropdownTrigger.querySelector('.dropdown-menu');

// Timer to handle delay
let hideDropdownTimer;

// Add event listeners to manage hover behavior
dropdownTrigger.addEventListener('mouseenter', () => {
    clearTimeout(hideDropdownTimer); // Clear any timer to hide
    dropdownTrigger.classList.add('hover'); // Show the dropdown
});

dropdownTrigger.addEventListener('mouseleave', (event) => {
    // Delay hiding the dropdown when mouse leaves
    hideDropdownTimer = setTimeout(() => {
        dropdownTrigger.classList.remove('hover');
    }, 200); // 200ms delay
});

dropdownMenu.addEventListener('mouseenter', () => {
    clearTimeout(hideDropdownTimer); // Cancel hiding if mouse enters the dropdown
    dropdownTrigger.classList.add('hover'); // Keep dropdown open
});

dropdownMenu.addEventListener('mouseleave', (event) => {
    // Delay hiding the dropdown when mouse leaves
    hideDropdownTimer = setTimeout(() => {
        dropdownTrigger.classList.remove('hover');
    }, 200); // 200ms delay
});

// --- New functionality for updating the headline and content ---

// Select the main headline, subheadline, and paragraph elements
const mainHeadline = document.querySelector('.white-headline');
const subHeadline = document.querySelector('.image-headline');
const mainParagraph = document.querySelector('.white-paragraph');

// Select the three subheadlines and their respective paragraphs
const subHeadline1 = document.querySelector('.three-images .image-block:nth-child(1) .image-headline');
const subParagraph1 = document.querySelector('.three-images .image-block:nth-child(1) .image-paragraph');

const subHeadline2 = document.querySelector('.three-images .image-block:nth-child(2) .image-headline');
const subParagraph2 = document.querySelector('.three-images .image-block:nth-child(2) .image-paragraph');

const subHeadline3 = document.querySelector('.three-images .image-block:nth-child(3) .image-headline');
const subParagraph3 = document.querySelector('.three-images .image-block:nth-child(3) .image-paragraph');

// Function to update the main content
function updateMainContent(headline, subheadline, paragraph) {
    mainHeadline.textContent = headline;
    subHeadline.textContent = subheadline;
    mainParagraph.textContent = paragraph;
}

// Function to update the three subheadlines and paragraphs
function updateSubContent(subHeadlines, subParagraphs) {
    subHeadline1.textContent = subHeadlines[0];
    subParagraph1.textContent = subParagraphs[0];

    subHeadline2.textContent = subHeadlines[1];
    subParagraph2.textContent = subParagraphs[1];

    subHeadline3.textContent = subHeadlines[2];
    subParagraph3.textContent = subParagraphs[2];
}

// Attach event listeners to all dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // Prevent default link behavior
        event.preventDefault();

        // Get data attributes from the clicked item
        const headline = item.getAttribute('data-headline');
        const subheadline = item.getAttribute('data-subheadline');
        const paragraph = item.getAttribute('data-paragraph');

        // Define subcontent based on the clicked activity
        let subHeadlines, subParagraphs;

        switch (item.textContent.trim()) {
            case 'Walking':
                subHeadlines = [
                    "Track every step with accuracy, move with purpose",
                    "Seamless tracking, built for walkers",
                    "Walk your way to a stronger, better you with Moven"
                ];
                subParagraphs = [
                    "Track every step, stay motivated, and experience a new way to walk.",
                    "Seamless tracking for walkers—sync effortlessly with your favorite devices and apps. More ways to move with Moven coming soon",
                    "Move Tokens redefine walking—track your journey, gain insights, and make every step truly yours with Moven"
                ];
                break;
            case 'Running':
                subHeadlines = [
                    "Precision tracking for every run",
                    "More ways to connect",
                    "Smash Your Running Goals"
                ];
                subParagraphs = [
                    "Track your speed, distance, and performance with precision—run smarter, push further",
                    "Sync your running watch, apps, and more for a seamless experience—more ways to connect coming soon",
                    "Break barriers and set new personal bests with Moven’s advanced running insights"
                ];
                break;
            case 'Swimming':
                subHeadlines = [
                    "Measure every stroke, track every lap",
                    "Sync your swim gear and stay in the flow",
                    "Make Every Stroke Count"
                ];
                subParagraphs = [
                    "Track your laps, refine your strokes, and swim smarter with precision insights",
                    "Connect your gear for seamless swim tracking and real-time insights",
                    "Dive deeper, track your progress, and make every swim count"
                ];
                break;
            case 'Cycling':
                subHeadlines = [
                    "Track every ride, measure every mile, and push further",
                    "Connect effortlessly with your cycling gear for a smoother ride",
                    "Ride stronger, push further, and chase your next goal"
                ];
                subParagraphs = [
                    "Track every ride, push your pace, and break down your performance",
                    "Sync your gear, track every ride, and ride more efficiently",
                    "Set big goals, track every ride, and push past your limits"
                ];
                break;
            case 'Hiking':
                subHeadlines = [
                    "Log every trail, track every climb",
                    "Stay Connected on Every Adventure",
                    "Tackle every trail, push past every peak"
                ];
                subParagraphs = [
                    "Track every hike, climb higher, and explore more",
                    "Sync your gear, track every climb, and hike without limits",
                    "Go further, climb higher, and take on every trail with powerful Moven metrics"
                ];
                break;
            default:
                subHeadlines = [
                    "Default Subheadline 1",
                    "Default Subheadline 2",
                    "Default Subheadline 3"
                ];
                subParagraphs = [
                    "Default paragraph for subheadline 1.",
                    "Default paragraph for subheadline 2.",
                    "Default paragraph for subheadline 3."
                ];
        }

        // Update the main and subcontent dynamically
        updateMainContent(headline, subheadline, paragraph);
        updateSubContent(subHeadlines, subParagraphs);
    });
});
