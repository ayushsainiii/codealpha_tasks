const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

const songs = [
  {
    title: "Falak Tak (Slowed + Reverb)",
    artist: "Udit Narayan",
    file: "music/falak-tak.mp3"
  },
  {
    title: "Sidhu Moosewala x Shubh x Brown Munde",
    artist: "Remix",
    file: "music/brown-munde.mp3"
  },
  {
    title: "Dilbar - Tech Panda x Kenzani",
    artist: "Rusha & Blizza",
    file: "music/dilbar.mp3"
  }
];

let currentSong = 0;
let glowInterval;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  title.textContent = song.title;
  artist.textContent = song.artist;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  startGlowEffect(); // soft lights
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  stopGlowEffect();
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

playlist.addEventListener("click", (e) => {
  if (e.target.tagName === 'LI') {
    currentSong = parseInt(e.target.dataset.index);
    loadSong(currentSong);
    playSong();
  }
});

audio.addEventListener('ended', () => {
  stopGlowEffect();
  nextBtn.click();
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// 🌈 Soft Glow Background Effect
function startGlowEffect() {
  if (glowInterval) clearInterval(glowInterval);
  glowInterval = setInterval(() => {
    document.body.style.backgroundColor = getSoftGlowColor();
  }, 3000); // every 3 seconds
}

function stopGlowEffect() {
  clearInterval(glowInterval);
  document.body.style.backgroundColor = "#121212";
}

function getSoftGlowColor() {
  const softColors = [
    "#2E3A59", "#3B3B98", "#6D83F2", "#F28585", "#D3CCE3",
    "#E5D0CC", "#C2FFD8", "#D8B4FE", "#B5EAEA", "#FBE8A6"
  ];
  return softColors[Math.floor(Math.random() * softColors.length)];
}

// Load first song
loadSong(currentSong);
