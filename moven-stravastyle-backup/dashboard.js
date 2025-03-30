document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const logoutButton = document.getElementById('logout-btn');
    const followersTitle = document.getElementById('followers-title');
    const followingTitle = document.getElementById('following-title');
    const friendsTitle = document.getElementById('friends-title');
    const claimedImagesList = document.getElementById('claimed-images-list');
    const totalDistanceElement = document.getElementById('total-distance-value');
    const profileInitial = document.getElementById('profile-initial');
    const usernameInitial = document.getElementById('username-initial');

    // ✅ Modal elements
    const followersModal = document.getElementById('followers-modal');
    const followingModal = document.getElementById('following-modal');
    const friendsModal = document.getElementById('friends-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // ✅ Get stored username from localStorage
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'youraccount.html';
        return;
    }

    // ✅ Display username immediately from localStorage
    if (usernameElement) {
        usernameElement.textContent = username;
    }

    // ✅ Function to set the initial letter in the circle
    function setInitialLetter(username) {
        if (username) {
            const firstLetter = username.charAt(0).toUpperCase();
            if (profileInitial) profileInitial.innerText = firstLetter;
            if (usernameInitial) usernameInitial.innerText = firstLetter;
        }
    }

    // ✅ Set the initial letter from the stored username
    setInitialLetter(username);

    // ✅ Function to close all modals
    function closeAllModals() {
        closeModal(followersModal);
        closeModal(followingModal);
        closeModal(friendsModal);
    }

    // ✅ Function to open a modal (closes any open one first)
    function openModal(modal) {
        closeAllModals(); // Close any open modal before opening a new one
        modal.classList.add('show');
        modalBackdrop.style.display = 'block';
    }

    // ✅ Function to close a modal
    function closeModal(modal) {
        modal.classList.remove('show');
        modalBackdrop.style.display = 'none';
    }

    // ✅ Close modal when clicking outside of it (EXCLUDES the modal itself)
document.addEventListener('click', (event) => {
    const isOutsideClick =
        !followersModal.contains(event.target) &&
        !followingModal.contains(event.target) &&
        !friendsModal.contains(event.target) &&
        !followersTitle.contains(event.target) &&
        !followingTitle.contains(event.target) &&
        !friendsTitle.contains(event.target);
    
    if (isOutsideClick) {
        closeAllModals();
    }
});

// ✅ Open Followers Modal on Click (Fixed)
if (followersTitle) {
    followersTitle.addEventListener('click', async (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up
        const followers = await fetchFollowers();
        populateModal('followers-modal', 'followers-modal-list', followers, 'Followers');
    });
}

// ✅ Open Following Modal on Click (Fixed)
if (followingTitle) {
    followingTitle.addEventListener('click', async (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up
        const following = await fetchFollowingAccounts();
        populateModal('following-modal', 'following-modal-list', following, 'Following');
    });
}


    // ✅ Load user data from backend
    async function loadUserData() {
        const url = `http://52.62.119.117:8080/get-user-details?username=${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch user data: ${response.status}`);
            const userData = await response.json();

            // ✅ Update username
            if (usernameElement) usernameElement.textContent = userData.username;

            // ✅ Update the initial letter after fetching the username
            setInitialLetter(userData.username);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // ✅ Load total distance from backend
    async function loadTotalDistance() {
        const url = `http://52.62.119.117:8080/get-total-distance?username=${username}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch total distance: ${response.status}`);
            const data = await response.json();

            if (totalDistanceElement) {
                totalDistanceElement.textContent = `${data.totalDistance.toFixed(2)} km`;
            }
        } catch (error) {
            console.error('Error fetching total distance:', error);
        }
    }

    // ✅ Logout Button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.href = 'youraccount.html';
        });
    }

    function createUserItem(user) {
        const userElement = document.createElement('div');
        userElement.className = 'user-item';
        userElement.style.display = 'flex';
        userElement.style.alignItems = 'center';
        userElement.style.padding = '12px 16px'; // Add horizontal padding for better alignment
        userElement.style.width = '100%'; // ✅ Full width
        userElement.style.minWidth = '100%'; // ✅ Ensure full width
        userElement.style.flexGrow = '1'; // ✅ Allow it to grow and fill the space
    
        if (user.profileImageUrl) {
            userElement.innerHTML = `
                <img src="${user.profileImageUrl}" alt="${user.username}" class="profile-picture"
                    onerror="this.src='assets/default-profile.jpg';" />
                <span class="user-name">${user.username}</span>
            `;
        } else {
            userElement.innerHTML = `
                <div class="profile-initial" style="margin-right: 8px;">
                    ${user.username.charAt(0).toUpperCase()}
                </div>
                <span class="user-name">${user.username}</span>
            `;
        }
    
        // ✅ Add spacing between items (instead of dividers)
        userElement.style.marginBottom = '8px';
    
        return userElement;
    }
    
    
    

    // ✅ Populate Modal with User Data
    function populateModal(modalId, listContainerId, data, title) {
        const modal = document.getElementById(modalId);
        const listContainer = document.getElementById(listContainerId);

        listContainer.innerHTML = '';

        if (data.length === 0) {
            listContainer.innerHTML = `<p class="error-message">No ${title.toLowerCase()} yet.</p>`;
        } else {
            data.forEach(user => {
                const userElement = createUserItem(user);
                listContainer.appendChild(userElement);
            });
        }

        openModal(modal);
    }

    // ✅ Fetch Followers
    async function fetchFollowers() {
        const url = `http://52.62.119.117:8080/get-followers?username=${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch followers: ${response.status}`);
            const followers = await response.json();

            followersTitle.innerHTML = `Followers<br><span>${followers.length}</span>`;
            return followers;
        } catch (error) {
            console.error('Error fetching followers:', error);
            return [];
        }
    }

    // ✅ Fetch Following Accounts
    async function fetchFollowingAccounts() {
        const url = `http://52.62.119.117:8080/get-followed-accounts?username=${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch following accounts: ${response.status}`);
            const following = await response.json();

            followingTitle.innerHTML = `Following<br><span>${following.length}</span>`;
            return following;
        } catch (error) {
            console.error('Error fetching following accounts:', error);
            return [];
        }
    }

    // ✅ Find Mutual Friends
    function findMutualFriends(followers, following) {
        const followerUsernames = new Set(followers.map(user => user.username));
        const mutualFriends = following.filter(user => followerUsernames.has(user.username));

        friendsTitle.innerHTML = `Friends<br><span>${mutualFriends.length}</span>`;
        friendsTitle.addEventListener('click', () => 
            populateModal('friends-modal', 'friends-modal-list', mutualFriends, 'Friends')
        );
    }

    // ✅ Load Claimed Sneakers (UNCHANGED)
    async function loadClaimedImages() {
        const url = `http://52.62.119.117:8080/get-claimed-sneakers?username=${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch claimed sneakers: ${response.status}`);
            const claimedSneakers = await response.json();

            claimedImagesList.innerHTML = '';

            Object.keys(claimedSneakers).forEach(key => {
                if (claimedSneakers[key]) {
                    const imgElement = document.createElement('img');
                    imgElement.className = 'claimed-image';
                    imgElement.src = `assets/${key.toLowerCase().replace(/ /g, '')}.jpg`;
                    imgElement.alt = key;
                    claimedImagesList.appendChild(imgElement);
                }
            });
        } catch (error) {
            console.error('Error fetching claimed sneakers:', error);
        }
    }

    // ✅ Load All Data
    async function loadData() {
        const [followers, following] = await Promise.all([
            fetchFollowers(),
            fetchFollowingAccounts()
        ]);
        findMutualFriends(followers, following);
        await loadClaimedImages();
        await loadUserData();
        await loadTotalDistance();
    }

    // ✅ Start Loading Data
    loadData();
});
