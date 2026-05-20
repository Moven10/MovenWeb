// Socials.js

window.API_BASE = window.API_BASE || 'https://api.startmoven.com';

function waitForUsername(maxAttempts = 20) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const check = () => {
      const el = document.getElementById('account-username');
      const username = el?.textContent?.trim();

      console.log(`🔍 [Attempt ${attempts + 1}] Found username: "${username}"`);

      if (username && username !== 'Guest') {
        console.log('✅ Username loaded:', username);
        resolve(username);
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          console.warn('⚠️ Username not detected after max attempts.');
          reject('Username not loaded');
        } else {
          setTimeout(check, 250);
        }
      }
    };

    check();
  });
}

let followersList = [];
let followingList = [];

async function fetchFollowingCount(username) {
  const url = `${window.API_BASE}/get-follower-moven-accounts?username=${encodeURIComponent(username)}`;
  console.log('📡 Fetching FOLLOWING from:', url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    followingList = await res.json();

    console.log('📦 Followed accounts:', followingList);
    const el = document.getElementById('following-count');
    if (el) el.textContent = followingList.length;

  } catch (err) {
    console.error('❌ Failed to fetch following:', err.message);
  }
}

async function fetchFollowersCount(username) {
  const url = `${window.API_BASE}/get-mover-followers?username=${encodeURIComponent(username)}`;
  console.log('📡 Fetching FOLLOWERS from:', url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    followersList = await res.json();

    console.log('📦 Follower accounts:', followersList);
    const el = document.getElementById('followers-count');
    if (el) el.textContent = followersList.length;

  } catch (err) {
    console.error('❌ Failed to fetch followers:', err.message);
  }
}

function computeAndShowMutuals() {
  if (!followersList.length || !followingList.length) {
    console.log('⚠️ Missing followers or following data');
    return;
  }

  // Extract usernames
  const followerUsernames = followersList.map(u => u.username);
  const followingUsernames = followingList.map(u => u.username);

  console.log('👥 Followers usernames:', followerUsernames);
  console.log('➡️ Following usernames:', followingUsernames);

  // Find intersection
  const mutuals = followingUsernames.filter(username =>
    followerUsernames.includes(username)
  );

  console.log('🤝 Mutual Friends:', mutuals);

  const el = document.getElementById('friends-count');
  if (el) el.textContent = mutuals.length;
}


window.addEventListener('DOMContentLoaded', async () => {
  console.log('🌐 DOM ready — starting Socials.js');
  try {
    const username = await waitForUsername();

    await Promise.all([
      fetchFollowingCount(username),
      fetchFollowersCount(username)
    ]);

    computeAndShowMutuals();

  } catch (err) {
    console.warn('⚠️ Could not run Socials.js:', err);
  }
});
