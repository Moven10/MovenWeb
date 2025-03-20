// Get the verified video and content section
const verifiedVideo = document.getElementById('verified-video');
const contentSection = document.getElementById('content-section');

// When the verified video finishes playing
verifiedVideo.addEventListener('ended', () => {
    // Hide the verified video
    verifiedVideo.style.display = 'none';

    // Show the rest of the content
    contentSection.classList.remove('hidden');
});
