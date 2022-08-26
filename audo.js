let audioList = document.getElementsByClassName("audioList")[0];
let audio = document.getElementsByClassName("audio")[0];
let currentTimes = document.getElementsByClassName("currentTime")[0];
let barControl = document.getElementById("barControl");
let play = document.getElementsByClassName("play")[0];
let pause = document.getElementsByClassName("pause")[0];
let backward = document.getElementsByClassName("backward")[0];
let forward = document.getElementsByClassName("forward")[0];
let tracks = [
  {
    mpId: "Ghost.mp3",
    title: "Ghost",
  },
  {
    mpId: "LoveYourself.mp3",
    title: "LoveYourseft",
  },
  {
    mpId: "Sorry.mp3",
    title: "Sorry",
  },
  {
    mpId: "STAY.mp3",
    title: "Stay",
  },
];
for (let i = 0; i < tracks.length; i++) {
  let titletap = document.createElement("div");
  let color;

  titletap.addEventListener("click", () => {
    titletap.style.color = " rgb(47, 215, 17)";
    color = titletap.style.color;
    musicCoubter = i;
    playSong();
  });

  titletap.classList.add("titleTap");
  titletap.textContent = (i + 1).toString() + ". " + tracks[i].title;
  audioList.append(titletap);
}
let time = 0;
let durationtime = "";
audio.addEventListener("loadeddata", () => {
  time = Math.floor(audio.duration);
  timeCac(time);
  // console.log(timeCac(time));
  durationtime = timeCac(time);
});

audio.addEventListener("timeupdate", () => {
  let updateTime = Math.floor(audio.currentTime);
  // console.log(timeCac(updateTime));
  let timeCurrent = timeCac(updateTime);
  let fixTime = timeCurrent + " / " + durationtime;
  currentTimes.textContent = fixTime;
  currentUpdateTime(updateTime);
});

let currentUpdateTime = (updateTime) => {
  let processTime = (500 / time) * updateTime;
  barControl.style.width = processTime.toString() + "px ";
};

let timeCac = (duration) => {
  // let duration = Math.floor(time);
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  let fixMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  let fixSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  // console.log(fixMinutes + ":" + fixSeconds);
  return fixMinutes + ":" + fixSeconds;
};
let musicCoubter = 0;
let isPlaying = false;
play.addEventListener("click", () => {
  isPlaying = true;
  let playTime = Math.floor(audio.currentTime);
  if (playTime === 0) {
    playSong();
  } else {
    audio.play();
    playAndpause();
  }
});
pause.addEventListener("click", () => {
  isPlaying = false;
  audio.pause();
  playAndpause();
});

backward.addEventListener("click", () => {
  if (musicCoubter === 0) {
    return;
  } else {
    musicCoubter -= 1;
    playSong();
  }
});
forward.addEventListener("click", () => {
  if (musicCoubter === tracks.length - 1) {
    return;
  } else {
    musicCoubter += 1;
    playSong();
  }
});
let playSong = () => {
  let musicMp3Id = tracks[musicCoubter].mpId;
  audio.src = musicMp3Id;
  isPlaying = true;
  audio.play();
  playAndpause();
};
let playAndpause = () => {
  if (isPlaying) {
    play.style.display = "none";
    pause.style.display = "inline";
  } else {
    play.style.display = "inline";
    pause.style.display = "none";
  }
};
