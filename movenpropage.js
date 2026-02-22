// MoverPro.js
document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".proai-pill");
  const titleEl = document.getElementById("proai-title");
  const textEl = document.getElementById("proai-text");
  const imgEl = document.getElementById("proai-image");

  // Data for each pill
  const proaiData = {
    track: {
      title: "Track progress over time",
      text: "Track progress over time using patterns in your activity to reveal meaningful improvements beyond single sessions. Built to show your true progress.",
      image: "mockup101.jpg"
    },
    analyse: {
      title: "Performance predictions",
      text: "Performance outlook uses patterns in your training to estimate how your performance may trend over time.",
      image: "mockup102.jpg"
    },
    plan: {
      title: "Pro-exclusive gear",
      text: "Access exclusive gear reserved for MoverPro members, designed to reflect progression and commitment.",
      image: "mockup103.jpg"
    },
    recover: {
      title: "Recover Smarter",
      text: "Understand recovery trends using patterns in your training to help you balance effort and rest more effectively.",
      image: "mockup104.jpg"
    },
    learn: {
      title: "Learn & Improve",
      text: "Learn from your training history and use clear insights to make gradual, noticeable improvements over time.",
      image: "mockup105.jpg"
    }
  };

  // Function to update content
  const updateProAISection = (key) => {
    const data = proaiData[key];
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    imgEl.src = data.image;
  };

  // Initialize with default
  updateProAISection("track");

  // Event listeners
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      // Remove active class
      pills.forEach(p => p.classList.remove("active"));
      // Add to clicked
      pill.classList.add("active");
      // Update content
      updateProAISection(pill.dataset.key);
    });
  });
});
