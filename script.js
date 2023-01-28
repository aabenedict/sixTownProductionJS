// namespace object
const app = {};

// namespace variables
app.menuIcon = document.querySelector('.navIcon');
app.closeIcon = document.querySelector('.navCloseIcon');
app.slideOut = document.getElementById('slideOutNavElement');

let now_playing = document.querySelector('.nowPlaying');
let track_art = document.querySelector('.trackArt');
let track_name = document.querySelector('.trackName');
let track_artist = document.querySelector('.trackArtist');

let playpause_btn = document.querySelector('.playPauseTrack');
let next_btn = document.querySelector('.nextTrack');
let prev_btn = document.querySelector('.prevTrack');

let seek_slider = document.querySelector('.seekSlider');
let volume_slider = document.querySelector('.volumeSlider');
let curr_time = document.querySelector('.currentTime');
let total_duration = document.querySelector('.totalDuration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-shuffle');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'assets/cover-circle.png',
        name: 'Summer Nights',
        artist: 'SKVNT',
        music: 'music/eMastered_Summer-Nights.mp3'
    },
    {
        img: 'assets/cover-circle.png',
        name: 'West Side',
        artist: 'SKVNT',
        music: 'music/eMastered_West-Side.mp3'
    },
    {
        img: 'assets/cover-circle.png',
        name: 'Dangerous',
        artist: 'SKVNT',
        music: 'music/eMastered_Dangerous.mp3'
    },
    {
        img: 'assets/cover-circle.png',
        name: 'In The Mood',
        artist: 'SKVNT',
        music: 'music/eMastered_In-The-Mood.mp3'
    },
    {
        img: 'assets/cover-circle.png',
        name: 'Tanmay Chalamet',
        artist: 'SKVNT',
        music: 'music/eMastered_Tanmay-Chalamet.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    
    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing Track " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolumeTo() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// function that will show slide out menu
app.showClass = () => {
    app.menuIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('hide');
        app.slideOut.classList.add('show');
    });
}

// function that will hide slide out menu
app.hideClass = () => {
    app.closeIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('show');
        app.slideOut.classList.add('hide');
    });
}

// init method that will run when app first loads
app.init = function () {
    app.showClass();
    app.hideClass();
};

// calling init method
app.init();