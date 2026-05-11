let time = 25 * 60;

let timer = null;

let exp = 0;

let level = 1;

let count = 0;

const timerDisplay =
document.getElementById("timer");

const expDisplay =
document.getElementById("exp");

const levelDisplay =
document.getElementById("level");

const countDisplay =
document.getElementById("count");

function updateTimer(){

  let minutes =
  Math.floor(time / 60);

  let seconds =
  time % 60;

  timerDisplay.innerText =
  `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

updateTimer();

document.getElementById("start")
.onclick = () => {

  if(timer !== null) return;

  timer = setInterval(() => {

    time--;

    updateTimer();

    if(time <= 0){

      clearInterval(timer);

      timer = null;

      exp += 10;

      count++;

      expDisplay.innerText = exp;

      countDisplay.innerText = count;

      if(exp >= level * 100){

        level++;

        levelDisplay.innerText =
        `Lv.${level}`;

      }

      alert("ポモドロ完了！");

      time = 25 * 60;

      updateTimer();
    }

  },1000);

};

document.getElementById("stop")
.onclick = () => {

  clearInterval(timer);

  timer = null;

};

document.getElementById("reset")
.onclick = () => {

  clearInterval(timer);

  timer = null;

  time = 25 * 60;

  updateTimer();

};
