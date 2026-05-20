document.addEventListener("DOMContentLoaded", () => {
  const usernameEl = document.getElementById("account-username");
  if (!usernameEl) return;

  const username = usernameEl.textContent.trim().toLowerCase();
  if (!username || username === "guest") return;

  // ✅ THIS is the function that now renders everything
  fetchAllSessions(username);
});


const API_BASE = "https://api.startmoven.com"; // 🌐 server base


async function fetchAllSessions(username) {
  try {
    // — Fetch saved sessions
    const savedRes = await fetch(
      `${API_BASE}/get-saved-move-sessions?username=${encodeURIComponent(username)}`
    );
    const savedSessionsRaw = await savedRes.json();
    const savedSessions = Array.isArray(savedSessionsRaw) ? savedSessionsRaw : [];

    // — Fetch Apple Watch sessions
    const watchRes = await fetch(`${API_BASE}/fetch-applewatchmovesessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    const watchSessionsRaw = await watchRes.json();
    const appleWatchSessions = Array.isArray(watchSessionsRaw) ? watchSessionsRaw : [];

    console.log("📥 RAW Apple Watch Sessions:", appleWatchSessions);

    // — Normalize saved sessions
    const normalizedSaved = savedSessions.map(item => ({
      ...item,
      __type: "saved",
      __timestamp: item.sessionDate ? new Date(item.sessionDate).getTime() : 0
    }));

    // — Normalize Apple Watch sessions
    const normalizedWatch = appleWatchSessions.map(item => ({
      ...item,
      __type: "watch",
      __timestamp: item.date ? new Date(item.date).getTime() : 0
    }));

    const watchWithPath = normalizedWatch.filter(
      s => Array.isArray(s.path) && s.path.length > 0
    );
    console.log(`📍 Found ${watchWithPath.length} Apple Watch sessions with path data.`);

    // — Combine & sort sessions (newest first)
    const combined = [...normalizedSaved, ...normalizedWatch].sort(
      (a, b) => b.__timestamp - a.__timestamp
    );

    /* ───────────────────────────────────────────── */
    /* 🎯 ACTIVITY CARD — TOTAL SESSION COUNT         */
    /* ───────────────────────────────────────────── */

    const totalCountEl = document.getElementById("total-session-count");
    if (totalCountEl) {
      totalCountEl.textContent = combined.length;
      console.log("🔢 Total session count:", combined.length);
    }

    /* ───────────────────────────────────────────── */
    /* 📊 SESSION FILTER COUNTS                       */
    /* ───────────────────────────────────────────── */

    const iosEl = document.querySelector(".session-type-label:nth-of-type(1)");
    const watchEl = document.querySelector(".session-type-label:nth-of-type(2)");

    if (iosEl) {
      iosEl.textContent = `iOS Sessions (${savedSessions.length})`;
      console.log("📱 iOS Sessions:", savedSessions.length);
    }

    if (watchEl) {
      watchEl.textContent = `Apple Watch Sessions (${appleWatchSessions.length})`;
      console.log("⌚ Apple Watch Sessions:", appleWatchSessions.length);
    }

    /* ───────────────────────────────────────────── */
    /* 🕒 MOST RECENT MOVE (TOP BAR)                  */
    /* ───────────────────────────────────────────── */

    const mostRecent = combined[0];

    if (mostRecent) {
      const dateEl = document.getElementById("most-recent-move-date");
      const typeEl = document.getElementById("recent-move-type");
      const iconEl = document.getElementById("recent-move-icon");

      // 📆 Date
      const date = new Date(mostRecent.__timestamp);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      if (dateEl) {
        dateEl.textContent = formattedDate;
        console.log("📆 Most recent move date:", formattedDate);
      }

      // 🏷️ Session type — GUARANTEED NON-BLANK
      if (typeEl) {
        const sessionType =
          mostRecent.sessionType ||
          mostRecent.sessionTitle ||
          mostRecent.title;

        typeEl.textContent = sessionType?.trim() || "Move Session";
        console.log("🏷️ Most recent move type:", typeEl.textContent);
      }

      // 🖼️ Icon (optional)
      if (iconEl) {
        let icon = "IconMoveblack.svg";

        if (mostRecent.sessionImageName) {
          icon = mostRecent.sessionImageName.endsWith(".svg")
            ? mostRecent.sessionImageName
            : `${mostRecent.sessionImageName}.svg`;
        }

        iconEl.src = icon;
        console.log("🖼️ Most recent move icon:", icon);
      }
    }

    /* ───────────────────────────────────────────── */
    /* 🧱 SESSION LIST RENDERING                      */
    /* ───────────────────────────────────────────── */

    const container = document.getElementById("allSessionsContainer");
    if (!container) {
      console.error("❌ No #allSessionsContainer found in DOM.");
      return;
    }

    container.innerHTML = "";

    combined.forEach(session => {
      const html =
        session.__type === "saved"
          ? renderSavedSessionCard(session)
          : renderAppleWatchSessionCard(session);

      container.insertAdjacentHTML("beforeend", html);
    });

    // 🗺️ Map init (after DOM paint)
    requestAnimationFrame(() => {
      observeMaps([...normalizedSaved, ...normalizedWatch]);
    });

  } catch (err) {
    console.error("❌ Failed to fetch all sessions:", err);
  }
}



function observeMaps(sessions) {
  console.log("🚀 observeMaps called with", sessions.length, "sessions");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        const mapId = entry.target.id;
        console.log(`👁️ IntersectionObserver sees`, mapId, "visible?", entry.isIntersecting);

        const session = sessions.find((s) => `map-${s.id}` === mapId);
        if (!session) {
          console.warn("⚠️ No session found for", mapId);
          return;
        }

        if (entry.isIntersecting) {
          console.log("✅ Entry intersecting — initializing map for", mapId);
          initSessionMaps([session]);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sessions.forEach((session) => {
    const mapEl = document.getElementById(`map-${session.id}`);
    if (mapEl) {
      console.log("🔎 Observing map element:", mapEl.id);
      observer.observe(mapEl);
    } else {
      console.warn("❌ map element not in DOM yet:", session.id);
    }
  });
}




/* ───────────────────────────────────────────── */
/* 🧱 SESSION CARD RENDERERS (WITH SKELETON)     */
/* ───────────────────────────────────────────── */

function renderSavedSessionCard(session) {
  const username = session.username || "Unknown";

  const profilePicEl = document.getElementById("account-avatar");
  const profilePic = profilePicEl ? profilePicEl.src : "default-avatar.jpg";

  const parsedDate = session.sessionDate ? new Date(session.sessionDate) : null;

  const date = parsedDate
    ? parsedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Unknown Date";

  const time = parsedDate
    ? parsedDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "Unknown Time";

  const location = session.location || "Unknown Location";
  const sessionType = session.sessionType || "Session";

  let sessionImg = "IconMoveblack.svg";
  if (session.sessionImageName) {
    sessionImg = session.sessionImageName.endsWith(".png")
      ? session.sessionImageName
      : `${session.sessionImageName}.png`;
  }

  const formattedDistance = `${(session.distance || 0).toFixed(2)} km`;
  const formattedDuration = formatDuration(session.elapsedSeconds || 0);
  const avgPace = session.avgPace ? `${session.avgPace} / km` : "0:00 / km";

  const mapId = `map-${session.id}`;

  return `
    <div class="saved-session-card">
      <div class="session-header">
        <img src="${profilePic}" class="session-profile-pic" />
        <div>
          <span class="session-username">${username}</span>
          <span class="session-date-loc">${date} · ${time} · ${location}</span>
        </div>
      </div>

      <div class="space-small"></div>

      <div class="session-type-row">
        <div class="session-type-title">${sessionType}</div>
        <img src="${sessionImg}" class="session-main-img-inline" />
      </div>

      <div class="space-small"></div>

      <div class="session-stat-labels">
        <span>Time</span><span>Distance</span><span>Pace</span>
      </div>

      <div class="session-stats">
        <span>${formattedDuration}</span>
        <div class="stat-divider"></div>
        <span>${formattedDistance}</span>
        <div class="stat-divider"></div>
        <span>${avgPace}</span>
      </div>

      <div class="space-small"></div>

      <!-- 🦴 Map Skeleton -->
      <div id="${mapId}" class="session-map">
        <div class="map-skeleton"></div>
      </div>
    </div>
  `;
}

function renderAppleWatchSessionCard(session) {
  const usernameEl = document.getElementById("account-username");
  const username =
    usernameEl?.textContent?.trim() || session.username || "Unknown";

  const profilePicEl = document.getElementById("account-avatar");
  const profilePic = profilePicEl ? profilePicEl.src : "default-avatar.jpg";

  const parsedDate = session.date ? new Date(session.date) : null;

  const date = parsedDate
    ? parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "Unknown Date";

  const time = parsedDate
    ? parsedDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      })
    : "Unknown Time";

  const location =
    session.locationName ||
    session.location ||
    (session.suburb && session.city ? `${session.suburb}, ${session.city}` : "Unknown Location");

  const sessionType =
    session.sessionType || session.sessionTitle || session.title || "Apple Watch Move";

  const isSwim = /swim/i.test(sessionType);
  const isMove = /move session/i.test(sessionType);

  // 🖼️ Session Icon
  let sessionImg = "IconMoveblack.svg";

  if (isMove) {
    sessionImg = "IconMoveblack.svg";
  } else if (session.sessionImage) {
    sessionImg = session.sessionImage.endsWith(".png")
      ? session.sessionImage
      : `${session.sessionImage}.png`;
  }

  // 📏 Distance
  const rawDistanceMeters = session.distance || 0;
  let formattedDistance = "0 m";

  if (isSwim) {
    formattedDistance =
      rawDistanceMeters < 1000
        ? `${Math.round(rawDistanceMeters)} m`
        : `${(rawDistanceMeters / 1000).toFixed(2)} km`;
  } else {
    formattedDistance = `${(rawDistanceMeters / 1000).toFixed(2)} km`;
  }

  // ⏱️ Duration
  const durationInSeconds = session.elapsedSeconds || session.elapsedTime || 0;
  const formattedDuration = formatDuration(durationInSeconds);

  // 🏁 Pace
  let avgPace = "0:00";

  if (durationInSeconds > 0 && rawDistanceMeters > 0) {
    if (isSwim && session.lapLength) {
      const lapLength = session.lapLength;
      const lapCount = rawDistanceMeters / lapLength;
      const pacePerLapSec = durationInSeconds / lapCount;

      const mins = Math.floor(pacePerLapSec / 60);
      const secs = Math.round(pacePerLapSec % 60).toString().padStart(2, "0");

      avgPace = `${mins}:${secs} / ${lapLength}m`;
    } else {
      const distanceKm = rawDistanceMeters / 1000;
      const pacePerKmSec = durationInSeconds / distanceKm;

      const mins = Math.floor(pacePerKmSec / 60);
      const secs = Math.round(pacePerKmSec % 60).toString().padStart(2, "0");

      avgPace = `${mins}:${secs} / km`;
    }
  }

  const mapId = `map-${session.id}`;

  return `
    <div class="saved-session-card">
      <div class="session-header">
        <img src="${profilePic}" class="session-profile-pic" />
        <div>
          <span class="session-username">${username}</span>
          <span class="session-date-loc">${date} · ${time} · ${location}</span>
        </div>
      </div>

      <div class="space-small"></div>

      <div class="session-type-row">
        <div class="session-type-title">${sessionType}</div>
        <img src="${sessionImg}" class="session-main-img-inline" />
      </div>

      <div class="space-small"></div>

      <div class="session-stat-labels">
        <span>Time</span><span>Distance</span><span>Pace</span>
      </div>

      <div class="session-stats">
        <span>${formattedDuration}</span>
        <div class="stat-divider"></div>
        <span>${formattedDistance}</span>
        <div class="stat-divider"></div>
        <span>${avgPace}</span>
      </div>

      <div class="space-small"></div>

      <!-- 🦴 Map Skeleton -->
      <div id="${mapId}" class="session-map">
        <div class="map-skeleton"></div>
      </div>
    </div>
  `;
}


/* ───────────────────────────────────────────── */
/* ⏱️ DURATION FORMATTER                         */
/* ───────────────────────────────────────────── */

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h ? h + "h " : ""}${m ? m + "m " : ""}${s}s`;
}

/* ───────────────────────────────────────────── */
/* 🗺️ MAP INITIALIZER (REMOVES SKELETON)         */
/* ───────────────────────────────────────────── */

function initSessionMaps(sessions) {
  if (typeof mapboxgl === "undefined") {
    console.error("❌ MapboxGL not loaded");
    return;
  }

mapboxgl.accessToken = window.MAPBOX_TOKEN;

  sessions.forEach(session => {
    const mapId = `map-${session.id}`;
    const mapEl = document.getElementById(mapId);

    if (!mapEl || !Array.isArray(session.path)) return;

    const coords = session.path
      .filter(p =>
        p &&
        typeof p.lat === "number" &&
        typeof p.lon === "number" &&
        !Number.isNaN(p.lat) &&
        !Number.isNaN(p.lon)
      )
      .map(p => [p.lon, p.lat]);

    if (coords.length === 0) return;

    // 🗺️ Create map
    const map = new mapboxgl.Map({
      container: mapId,
      style: "mapbox://styles/yiannicisjr/cme2m9w0m00ls01refuhe6ask",
      interactive: false,
      center: coords[0],
      zoom: 13
    });

    map.on("load", () => {
      // ➕ Route source
      map.addSource(`${mapId}-route`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coords
          }
        }
      });

      // 🟦 Route layer
      map.addLayer({
        id: `${mapId}-route-layer`,
        type: "line",
        source: `${mapId}-route`,
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#53CAFC",
          "line-width": 4
        }
      });

      // 📐 SAFE bounds calculation
      const bounds = new mapboxgl.LngLatBounds();

      coords.forEach(coord => bounds.extend(coord));

      // 🧠 Handle single-point sessions
      if (coords.length === 1) {
        const [lng, lat] = coords[0];
        bounds.extend([lng + 0.0005, lat + 0.0005]);
      }

      // 🎯 Fit map
      map.fitBounds(bounds, {
        padding: 40,
        maxZoom: 16,
        duration: 0
      });

      // 🧹 Remove skeleton AFTER map is ready
      const skeleton = mapEl.querySelector(".map-skeleton");
      if (skeleton) skeleton.remove();
    });
  });
}


function renderBasicSessionCard(session) {
  const title = session.title || "Apple Watch Session";
  const date = session.date || "Unknown Date";

  return `
    <div class="session-card">
      <div class="session-info">
        <h4>${title}</h4>
        <p>${date}</p>
      </div>
    </div>
  `;
}

function renderMapPath(points) {
  if (!points.length) return `<p class="no-path">No path data available</p>`;

  const svgPoints = points.map(p => `${p.lon},${p.lat}`).join(" ");
  return `
    <svg class="session-path-map" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points="${svgPoints}" stroke="#53CAFC" stroke-width="2" fill="none"/>
    </svg>
  `;
}
