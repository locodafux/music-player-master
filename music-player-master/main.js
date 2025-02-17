const play = document.getElementById('play');
const audio = document.getElementById('audio');
let progressBar = document.getElementById('progress-bar');
let currentTime = document.getElementById('current-time');
let songDuration = document.getElementById('song-duration');
const playImage = document.getElementById('play-image');
const pauseImage = document.getElementById('pause-image');
let musicTitle = document.getElementById('music-title');
let artist = document.getElementById('artist');
let musicCover = document.getElementById('music-cover')
const previousMusic = document.getElementById('previous-music');
const nextMusic = document.getElementById('next-music');
let isDragging = false;
let isPlaying = false;
let selectedMusic = 0;

let musics = [
    {
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        image: './resources/cover-2.jpg',
        audio: './resources/forest-lullaby-110624.mp3'
    },
    {
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        image: './resources/cover-1.jpg',
        audio: './resources/lost-in-city-lights-145038.mp3'
    }
]

function setMusic(selectedMusic = 0, play){
    musicTitle.textContent = musics[selectedMusic].title
    artist.textContent = musics[selectedMusic].artist
    audio.src = musics[selectedMusic].audio
    musicCover.src = musics[selectedMusic].image
    audio.load();
    if(play){
        playMusic()
    }
}
setMusic()


previousMusic.addEventListener('click', () => {
    selectedMusic = (selectedMusic - 1 + musics.length) % musics.length;
    setMusic(selectedMusic, true);
})

nextMusic.addEventListener('click', () => {
    selectedMusic = (selectedMusic + 1 + musics.length) % musics.length;
    setMusic(selectedMusic, true);
})

audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
        songDuration.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTime.textContent = formatTime(audio.currentTime);
        songDuration.textContent = formatTime(audio.duration);
    }
});


progressBar.addEventListener('click', (event) => {
    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekPercentage = (clickPosition / progressBarWidth) * 100;
    const seekTime = (seekPercentage / 100) * audio.duration;
    audio.currentTime = seekTime;
});

progressBar.addEventListener('mousedown', (event) => {
    isDragging = true;
    updateSeek(event);
})

document.addEventListener('mouseup', () => {
    isDragging = false
});

progressBar.addEventListener('mousemove', (event) => {
    if(isDragging) {
        updateSeek(event);
    }
})

function updateSeek(event) {
    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekPercentage = (clickPosition / progressBarWidth) * 100;
    const seekTime = (seekPercentage / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds/60);
    const seconds = Math.floor(timeInSeconds % 60);
    return String(minutes).padStart(2,'0') + ":" + String(seconds).padStart(2,'0');
}

function playMusic() {
    if (audio.paused) {
        audio.play();
        playImage.style.display = 'none';
        pauseImage.style.display = 'block'; 
    } else {
        audio.pause();
        playImage.style.display = 'block'; 
        pauseImage.style.display = 'none'; 
    }
}

play.addEventListener("click", playMusic);