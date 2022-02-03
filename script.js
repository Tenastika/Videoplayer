"use strict";

const playBtn = document.querySelector(".player__btn-play"),
  player = document.querySelector(".player"),
  video = document.querySelector(".player__video"),
  progress = document.querySelector(".progress"),
  progressBar = document.querySelector(".progress__filled"),
  toggle = document.querySelector(".player__button-play"),
  ranges = document.querySelectorAll(".player__slider"),
  playbackRate = document.querySelector(".slider-speed"),
  controlVol = document.querySelector(".slider-volume"),
  controlMenu = document.querySelector(".player__control"),
  volBtn = document.querySelector(".player__button-vol"),

  volumeStyle = document.querySelector('.slider-volume'),
  speedStyle = document.querySelector('.slider-speed'),
  labelSpeed = document.querySelector('.label-speed'),
  iPlay = document.querySelector('.i-play'),
  iVol = document.querySelector('.i-vol');


video.volume = "0.2";

function togglePlay() {
  let method = video.paused ? "play" : "pause";
  video[method]();
  playBtn.classList.toggle("_paused");
  toggle.classList.toggle("_paused");
  iPlay.classList.toggle('fa-play-circle')
  iPlay.classList.toggle('fa-pause-circle')
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  
  if (video.volume == "0") {
iVol.classList.remove('fa-volume-down')
    iVol.classList.add('fa-volume-mute')
  } else {
    iVol.classList.add('fa-volume-down')
    iVol.classList.remove('fa-volume-mute')
  }
    
    
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  if (percent > 99) {
    playBtn.classList.remove("_paused");
    toggle.classList.remove("_paused");
    video.currentTime = "0";
    video.pause();
    playbackRate.value = "1"
  }
  progressBar.style.width = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  
}

function updateVol() {
  const volume = this.value;
  video.volume = volume;
  
  
}

function mute() {
  this.classList.toggle("_mute");
  controlVol.value != 0 ? (controlVol.value = "0") : (controlVol.value = "0.2");
  controlVol.value != 0 ? (controlVol.style.background = `linear-gradient(to right, var(--gold) 0%, var(--gold) 20%, var(--bl-trans) 20%, var(--bl-trans) 100%)`) : (controlVol.style.background = `linear-gradient(to right, var(--gold) 0%, var(--gold) 0%, var(--bl-trans) 0%, var(--bl-trans) 100%)`);
  video.volume = controlVol.value;
  iVol.classList.toggle('fa-volume-down')
  iVol.classList.toggle('fa-volume-mute')
 
}

function openControl() {
 controlMenu.classList.add('_open')
 
}

function closeControl() {
  controlMenu.classList.remove('_open')
  
 }

 function openFull() {
  player.requestFullscreen();
  
 }

 function speedValue() {
  labelSpeed.textContent = `Speed: ${playbackRate.value}`

 }


playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", handleProgress);
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("grab", handleProgress);

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mouseout", () => (mousedown = false));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));

ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);


controlVol.addEventListener("change", updateVol);

volBtn.addEventListener("click", mute);

player.addEventListener('mouseover', openControl);
player.addEventListener('mouseout', closeControl);

player.addEventListener('dblclick', openFull);

playbackRate.addEventListener('input', speedValue);

controlVol.addEventListener('input', function() {
  const value = this.value;
  
  this.style.background = `linear-gradient(to right, var(--gold) 0%, var(--gold) ${value * 100}%, var(--bl-trans) ${value * 100}%, var(--bl-trans) 100%)`;

  
  
})

speedStyle.addEventListener('input', function() {
  const value = this.value;
  
  this.style.background = `linear-gradient(to right, var(--gold) 0%, var(--gold) ${value * 50}%, var(--bl-trans) ${value * 50}%, var(--bl-trans) 100%)`

})

