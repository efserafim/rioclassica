// Autoplay da playlist — dispara apenas uma vez por visita

const SPOTIFY_ENGAGED_KEY = 'rioclassica-spotify-engaged';

let spotifyController = null;
let spotifyPlayerReady = false;
let spotifyAutoplayDone = false;
let spotifySectionObserver = null;
const spotifyGestureOptions = { capture: true, passive: true };

function hasSpotifyEngagedBefore() {
  return sessionStorage.getItem(SPOTIFY_ENGAGED_KEY) === '1';
}

function markSpotifyEngaged() {
  sessionStorage.setItem(SPOTIFY_ENGAGED_KEY, '1');
}

function stopSpotifyAutoplayTriggers() {
  ['pointerdown', 'click', 'keydown', 'touchstart', 'wheel'].forEach((event) => {
    document.removeEventListener(event, attemptSpotifyPlayback, spotifyGestureOptions);
  });
  if (spotifySectionObserver) {
    spotifySectionObserver.disconnect();
    spotifySectionObserver = null;
  }
}

function tryStartSpotifyPlayback() {
  if (spotifyAutoplayDone || !spotifyController || !spotifyPlayerReady) return false;

  spotifyAutoplayDone = true;
  stopSpotifyAutoplayTriggers();
  markSpotifyEngaged();
  spotifyController.resume();
  return true;
}

function attemptSpotifyPlayback() {
  if (spotifyAutoplayDone) return;
  if (tryStartSpotifyPlayback()) return;

  let attempts = 0;
  const waitForReady = () => {
    if (spotifyAutoplayDone) return;
    if (tryStartSpotifyPlayback() || attempts > 50) return;
    attempts += 1;
    requestAnimationFrame(waitForReady);
  };
  waitForReady();
}

function bindSpotifyListeners() {
  if (spotifyAutoplayDone) return;

  ['pointerdown', 'click', 'keydown', 'touchstart', 'wheel'].forEach((event) => {
    document.addEventListener(event, attemptSpotifyPlayback, spotifyGestureOptions);
  });

  const section = document.getElementById('trilha-sonora');
  if (!section) return;

  spotifySectionObserver = new IntersectionObserver(
    (entries) => {
      if (spotifyAutoplayDone) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) attemptSpotifyPlayback();
      });
    },
    { threshold: 0.3 }
  );
  spotifySectionObserver.observe(section);
}

function initSpotifyPlayer(IFrameAPI) {
  const host = document.getElementById('spotify-playlist-host');
  if (!host) return;

  IFrameAPI.createController(
    host,
    {
      url: 'https://open.spotify.com/playlist/33GaKIjuHZ6jIhjljfskKY?utm_source=generator&theme=1',
      width: '100%',
      height: '152',
    },
    (controller) => {
      spotifyController = controller;

      controller.addListener('ready', () => {
        spotifyPlayerReady = true;
        if (hasSpotifyEngagedBefore()) {
          attemptSpotifyPlayback();
        }
      });
    }
  );
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  initSpotifyPlayer(IFrameAPI);
};

document.addEventListener('DOMContentLoaded', () => {
  bindSpotifyListeners();
});
