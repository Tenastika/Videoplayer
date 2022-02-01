"use strict"


const playBtn = document.querySelector('.player__btn-play'),
      video = document.querySelector('.player__video');
 let isPlay = false;

function playVideo() {
  // video.src = './assets/video.mp4'
  //video.currentTime = 0;
  video.play();
  isPlay = true;
}

function pauseVideo() {
  // video.src = './assets/video.mp4'
  
  video.pause();
  isPlay = false;
}

playBtn.addEventListener('click', (e) => {
  playBtn.classList.toggle('_pause')
  if (!isPlay) {
    playVideo()
    
  } else {
    pauseVideo()
  }
});
