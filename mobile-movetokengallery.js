document.addEventListener("DOMContentLoaded", function () {
    // === Slide-Out Menu (Fixes Opening & Closing) ===
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu"); // Static X button in HTML
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0";  // Slide menu into view
        menuOverlay.style.display = "block"; // Show overlay
        document.body.classList.add("menu-open"); // Prevent background scrolling
    }

    function closeMenu() {
        sideMenu.style.left = "-250px"; // Hide menu
        menuOverlay.style.display = "none"; // Hide overlay
        document.body.classList.remove("menu-open"); // Restore background scrolling
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);

    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);

    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);

    // Close menu when pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // === Card Popup Functionality ===
    const cards = document.querySelectorAll(".card");

    // Create the popup container dynamically
    const popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.innerHTML = `
        <div class="popup">
            <span class="close-btn">&times;</span>
            <img src="" alt="Token Image" class="popup-image">
            <div class="popup-title">
                <span class="popup-name"></span>
                <img src="" class="popup-icon" alt="Activity Icon">
            </div>
            <p class="popup-description"></p>
        </div>
    `;
    document.body.appendChild(popup);

    const popupImage = popup.querySelector(".popup-image");
    const popupName = popup.querySelector(".popup-name");
    const popupIcon = popup.querySelector(".popup-icon");
    const popupDescription = popup.querySelector(".popup-description");
    const closeBtn = popup.querySelector(".close-btn");

    // Icon map for each category
    const iconMap = {
        "Walker": "walking.png",
        "Jogger": "run.png",
        "Swimmer": "swim.png",
        "Bike": "cycling.png",
        "Golf": "golf-player.png",
        "Pickle": "game.png",
        "Paddle": "paddle.png",
        "Tennis": "player.png",
        "Squash": "squash.png",
        "Row": "row.png",
        "Soccer": "soccer.png"
    };

    const descriptions = {
        "Walker Stroll": "WalkerStroll is designed for your casual walk, specifically if you\'re walking daily between 2km-5km. It is the perfect choice for you. WalkerStroll has a pace requirement, meaning you must stay between 1kmh-7kmh. If you drop out of the pace for 10 seconds the session will be paused, this is to stop invalid MT obtainment.",
        "Walker Trek": "WalkerTrek is perfect for those who enjoy longer walks, specifically between 2km-8km daily. This tracker is tailored for dedicated walkers who aim to maintain a consistent pace while allowing an extra 2km if needed. WalkerTrek has a pace requirement, ensuring you stay between 2kmh-9kmh. If your pace drops out of this range for more than 10 seconds, the session will pause to prevent invalid MT obtainment.",
        "Walker Strider": "WalkerStrider', 'WalkerStrider is designed for those who embark on longer walks, ranging between 5km-15km daily. Ideal for avid walkers looking to cover significant distances, this tracker ensures you maintain a steady pace. WalkerStrider has a pace requirement, keeping you between 3kmh-10kmh. If your pace falls outside this range for more than 10 seconds, the session will pause to ensure accurate MT obtainment.",
        "Walker Hiker": "WalkerHiker is tailored for those who enjoy long walks, specifically ranging from 12km-20km daily. If you love going for extended strolls, this tracker could definitely be for you. Users earn more MT the farther they walk, with maximum MT obtainable up to 20km. WalkerHiker enforces a pace range of 3kmh-10kmh. If your pace falls outside this range for more than 10 seconds, the session will pause to ensure accurate MT obtainment",
        "Jogger Pace": "JoggerPace is designed for the casual jog. If you tend to run anywhere between 2km-5km, then JoggerPace is the perfect choice for you. JoggerPace has a pace requirement, which is to maintain a pace between 3kmh-18kmh. If you drop out of the pace for 10 seconds, the session will be automatically paused.",
        "Jogger Ultra": "JoggerUltra is perfect for those who enjoy longer casual jogs. If you typically run distances between 4km-8km, then JoggerUltra is the ideal tracker for you. JoggerUltra has a pace requirement, which is to maintain a pace between 3kmh-18kmh. If you drop out of the pace for 10 seconds, the session will be automatically paused.",
        "Jogger Pro": "JoggerPro is designed for the slightly more fit movers who enjoy longer jogs. If you typically run distances between 8km-15km, JoggerPro is the perfect choice for you. JoggerPro has a pace requirement, which is to maintain a pace between 3kmh-18kmh. If you drop out of the pace for 10 seconds, the session will be automatically paused.",
        "Jogger Max": "JoggerMax is tailored for marathon-type movers who take on longer distances. If you regularly jog between 15km-23km, JoggerMax is the ultimate choice for you. JoggerMax has a pace requirement, which is to maintain a pace between 3kmh-18kmh. If you drop out of the pace for 10 seconds, the session will be automatically paused.",
        "Swimmer Stroke": "SwimmerStroke is designed for beginners who are just taking up swimming as a starting point. The SwimmerStroke is perfect for swimmers who can swim between 1km-1.5km. If you are a casual swimmer, then the SwimmerStroke is the perfect choice for you.",
        "Swimmer Flow": "SwimmerFlow is for the more advanced side of swimmers. If you tend to swim a few laps at the pool, the SwimmerFlow could be perfect for you! The SwimmerFlow is designed for swimmers who can cover distances between 1km-3km.",
        "Swimmer Pro": "SwimmerPro is for advanced swimmers. If swimming is your pure passion and you feel like you’re partially from Atlantis, then the SwimmerPro is perfect for you! The SwimmerPro is designed for swimmers who can cover distances between 4km-8km.",
        "Bike Cruiser": "BikeCruiser is designed for your casual bike ride, whether you’re going for a ride down the road or down a tricky path. BikeCruiser is the perfect Move Token for your casual bike riding activity. The distance for BikeCruiser and MT earning periods are optimal from distances between 2km-8km, giving you just the right amount of distance for your casual bike ride with BikeCruiser. You must maintain a pace between 7kmh-20kmh; otherwise, the session will pause.",
        "Bike Dasher": "BikeDasher is tailored for those who enjoy a slightly more intense bike ride. Whether you’re pushing yourself on a road or tackling a challenging path, BikeDasher is the ideal Move Token for you. The distance range for BikeDasher and MT earning periods is optimal between 4km-15km, perfect for those who like to take their rides up a notch. You must maintain a pace between 7kmh-20kmh; otherwise, the session will pause.",
        "Bike Pacer": "BikePacer is designed for the more extreme bike riders who take their rides seriously. Whether you’re training on roads or navigating challenging paths, BikePacer is the ultimate Move Token for dedicated cyclists. The distance range for BikePacer and MT earning periods is optimal between 15km-30km, making it perfect for those who push their limits on every ride. You must maintain a pace between 30kmh-40kmh; otherwise, the session will pause.",
        "Golf Precision": "GolfPrecision is the perfect Move Token for your typical 9-hole casual game. If you tend to find yourself playing a 9-hole game often, then the GolfPrecision Move Token could be perfect for you! MT is earned through steps with golf Move Tokens, which is slightly different from distance-based MT earning. At Moven, our team has conducted an in-depth analysis of how many steps a regular golfer takes, on what type of course, and in what specific conditions. So if you find yourself playing just 9 holes, then the GolfPrecision is just for you!",
        "Golf Pro": "GolfPro is the ultimate Move Token for your typical 18-hole golf game. If you’re a dedicated golfer who regularly takes on full courses, the GolfPro Move Token is perfect for you! MT is earned through steps with golf Move Tokens, offering a tailored experience for golfers who love the challenge of completing 18 holes. At Moven, our team has analyzed step counts across various conditions and courses to ensure accurate MT earning for dedicated players. If you’re an 18-hole enthusiast, GolfPro is the token for you!'",
        "Golf Max": "GolfMax is perfect for when you’re playing on a larger golf course than usual or if you fancy playing the back nine or the entire 18 again! The GolfMax Move Token is often unnecessary for casual golfers. However, we understand the love of golf and are here to help you achieve new heights. For the most dedicated players looking to go beyond the usual, GolfMax is your ideal companion.",
        "Pickle Blast": "PickleBlast is designed for your casual game of pickleball, if you are someone who casually plays pickleball and going for a casual hit of the pickle, then the PickleBlast is the perfect Move Token for you! Pickleball Move Tokens are step based MT thresholds, not distance based. Our team at Moven have designed and gone into in-depth detail and analysis on how many steps on average a regular human would take during a casual hit of Pickleball",
        "Pickle Pro": "PicklePro is tailored for players who take their pickleball game to the next level. If you are someone who thrives on intense rallies and competitive matches, then the PicklePro Move Token is the perfect choice for you! Unlike casual options, PicklePro is designed with step-based MT thresholds that align with the dynamic and energetic nature of advanced pickleball games. Our team at Moven has carefully analyzed the step patterns of competitive pickleball players to ensure accuracy and optimal performance tracking",
        "Pickle Max": "PickleMax is the ultimate Move Token for professional pickleball players who demand precision and peak performance tracking. Designed for those who engage in high-intensity games and tournaments, PickleMax provides advanced step-based MT thresholds, capturing the unique movements of professional-level play. At Moven, we have meticulously analyzed the rigorous demands of elite pickleball athletes to deliver unparalleled accuracy and insight, making PickleMax the definitive choice for professionals.",
        "Tennis Blast": "TennisBlast is designed for your casual game of tennis. Whether you’re looking to rally with a mate or against the wall, the TennisBlast is the perfect Move Token! Tennis Move Tokens are step-based MT thresholds, designed to accurately track the movements and effort typical of casual tennis games. With TennisBlast, you can enjoy your game while earning MT effortlessly.",
        "Tennis Pro": "TennisPro is designed for players who take their tennis game to the next level. Whether you’re competing in matches or pushing yourself in intense practice sessions, the TennisPro Move Token is tailored for your advanced gameplay. Tennis Move Tokens are step-based MT thresholds, carefully crafted to capture the dynamic footwork and movements of competitive tennis players. With TennisPro, you can track your performance with precision while pushing yourself to achieve peak performance.",
        "Tennis Max": "TennisMax is the ultimate Move Token for elite tennis players who compete at the highest levels. Designed for full-length matches played at intense speeds and stamina demands, TennisMax offers unparalleled tracking precision. Tennis Move Tokens are step-based MT thresholds, specifically optimized to capture the fast-paced movements, rapid direction changes, and sustained effort of high-intensity tennis. Whether on the court in tournaments or during rigorous training, TennisMax ensures your performance is monitored with unmatched accuracy.",
        "Squash Blast": "SquashBlast is perfect for beginners or those just getting into squash. Whether you’re playing a light game with a friend or practicing your shots solo, SquashBlast is the ideal Move Token for casual players. Squash Move Tokens are step-based MT thresholds, making it easy to track your movements without the need for advanced tracking. With SquashBlast, you can enjoy the game while earning MT at your own pace.",
        "Squash Pro": "SquashPro is designed for players who take their squash game to the next level. Whether you’re pushing through intense rallies or training for competitive matches, SquashPro is the perfect Move Token for advanced gameplay. Squash Move Tokens are step-based MT thresholds, optimized to capture the quick movements and agility required in fast-paced squash games. With SquashPro, you can track your performance with precision while staying focused on improving your skills.",
        "Squash Max": "SquashMax is the ultimate Move Token for elite squash players who demand the best from their performance tracking. Designed for high-intensity games and rigorous training sessions, SquashMax captures every rapid movement and explosive rally with unmatched precision. Squash Move Tokens are step-based MT thresholds, engineered to keep up with the fast-paced and highly strategic nature of professional-level squash. With SquashMax, you can push your limits, knowing every step is accounted for.",
        "Paddle Strike": "PaddleStrike is designed for amateur and beginner paddle players. Whether you’re just learning the ropes or enjoying a casual game, PaddleStrike is the perfect Move Token to get started. Paddle Move Tokens are step-based MT thresholds, providing a simple yet effective way to track your movements as you build confidence on the court. With PaddleStrike, you can enjoy the game while earning MT effortlessly.",
        "Paddle Pro": "PaddlePro is tailored for players who take their paddle game more seriously. If you’re consistently on the court and looking to refine your skills, PaddlePro is the ideal Move Token for you. Paddle Move Tokens are step-based MT thresholds, optimized for tracking the fast-paced rallies and precise footwork typical of dedicated players. With PaddlePro, you can stay on top of your performance and push your game to the next level.",
        "Paddle Max": "PaddleMax is the ultimate Move Token for professional paddle players who demand precision and peak performance tracking. Designed for high-intensity games and tournaments, PaddleMax captures every movement with unparalleled accuracy. Paddle Move Tokens are step-based MT thresholds, specifically crafted to match the energy and strategy of elite-level paddle play. With PaddleMax, you can push your limits and dominate the court like a true professional.",
        "Row Pace": "RowPace is the ideal Move Token for your casual row. If you’re just getting into rowing or are slightly experienced, RowPace is the perfect Move Token for you. It features distance-based MT thresholds, and you must maintain a pace between 3kmh-13kmh; otherwise, the session will be paused. The optimal MT earning periods for RowPace are between 2km-4km. So if you’re looking to casually row a few times a week, the RowPace Move Token is perfect for you!",
        "Row Pro": "RowPro is designed for more experienced rowers who aim to push themselves further. It features distance-based MT thresholds, and you must maintain a pace between 3kmh-13kmh; otherwise, the session will be paused. The optimal MT earning periods for RowPro are between 3km-10km, making it the perfect Move Token for those looking to consistently challenge themselves and achieve greater distances.",
        "Soccer Speed": "SoccerSpeed is perfect for casual soccer players or those just starting out. Whether you’re kicking the ball around with friends or playing a light game, SoccerSpeed is the ideal Move Token to track your steps. Soccer Move Tokens are step-based MT thresholds, designed to help you ease into the game while enjoying every moment on the field.",
        "Soccer Pro": "SoccerPro is designed for dedicated players who take their soccer game more seriously. Whether you’re training hard or competing in regular matches, SoccerPro tracks your performance with precision. Soccer Move Tokens are step-based MT thresholds, crafted to capture the effort and energy of consistent players looking to improve their game.",
        "Soccer Max": "SoccerMax is the ultimate Move Token for professional-level soccer players. Built for high-intensity games and rigorous training sessions, SoccerMax ensures that every sprint, tackle, and goal is tracked with unmatched accuracy. Soccer Move Tokens are step-based MT thresholds, designed to keep up with the demands of elite players. With SoccerMax, you can push your limits and dominate the field."
    };
    // Functionality for card click event
    cards.forEach(card => {
        card.addEventListener("click", function () {
            const imgSrc = card.querySelector("img").src;
            const tokenName = card.getAttribute("data-name");
            const firstWord = tokenName.split(" ")[0];
            const iconSrc = iconMap[firstWord] || "default-icon.png";
            const descriptionText = descriptions[tokenName] || "No description available.";

            popupImage.src = imgSrc;
            popupName.textContent = tokenName;
            popupIcon.src = iconSrc;
            popupDescription.textContent = descriptionText;

            popup.classList.add("show");
        });
    });

    // Close popup when clicking on close button
    closeBtn.addEventListener("click", () => popup.classList.remove("show"));

    // Close popup when clicking outside of it
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.classList.remove("show");
    });

    // Close popup when pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") popup.classList.remove("show");
    });
});
