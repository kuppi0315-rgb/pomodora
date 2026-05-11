const loading =
document.getElementById("loading");

const selectScreen =
document.getElementById("select-screen");

const home =
document.getElementById("home");

setTimeout(()=>{

  loading.classList.add("hidden");

  selectScreen.classList.remove("hidden");

},2000);

let selectedDragon = "";

document
.querySelectorAll(".dragon-select")
.forEach(dragon=>{

  dragon.onclick = ()=>{

    selectedDragon =
    dragon.dataset.dragon;

    document
    .getElementById("dragon-image")
    .src =
    `assets/dragons/${selectedDragon}.png`;

    selectScreen
    .classList.add("hidden");

    home
    .classList.remove("hidden");
  };
});

let time = 25 * 60;

let timer = null;

let exp = 0;

let level = 1;

let pomodoroCount = 0;

let streak = 0;

const timerDisplay =
document.getElementById("timer");

function updateTimer(){

  let minutes =
  Math.floor(time / 60);

  let seconds =
  time % 60;

  timerDisplay.innerText =
  `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

updateTimer();

document
.getElementById("start-btn")
.onclick = ()=>{

  if(timer) return;

  timer = setInterval(()=>{

    time--;

    updateTimer();

    if(time <= 0){

      clearInterval(timer);

      timer = null;

      streak++;

      let gainedExp = 10;

      if(streak % 3 === 0){

        gainedExp *= 2;
      }

      exp += gainedExp;

      pomodoroCount++;

      document
      .getElementById("exp")
      .innerText = exp;

      document
      .getElementById("pomodoro-count")
      .innerText =
      pomodoroCount;

      if(exp >= level * 100){

        level++;

        document
        .getElementById("dragon-level")
        .innerText =
        `Lv.${level}`;

        if(level >= 5){

          document
          .getElementById("dragon-image")
          .src =
          "assets/dragons/evolve1.png";
        }
      }

      alert(
        `ポモドーロ完了！ EXP +${gainedExp}`
      );

      time = 25 * 60;

      updateTimer();
    }

  },1000);

};

document
.getElementById("stop-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;
};

document
.getElementById("reset-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;

  time = 25 * 60;

  updateTimer();
};
