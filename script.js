const lobby = document.getElementById("lobby");
const timerScreen = document.getElementById("timer-screen");

const btn = document.getElementById("hourglass-btn");

const timerText = document.getElementById("timer");

const bgm = document.getElementById("bgm");
const finish = document.getElementById("finish");

let time = 10;
let timer = null;

/* =====================
   クリックで必ず発火
===================== */

btn.addEventListener("click", () => {
  startFocus();
});

/* =====================
   集中開始（画面切替）
===================== */

function startFocus(){

  console.log("start"); // デバッグ用

  lobby.classList.add("hidden");
  timerScreen.classList.remove("hidden");

  time = 10;

  bgm.currentTime = 0;
  bgm.play();

  timer = setInterval(() => {

    time--;

    timerText.innerText =
      "00:" + String(time).padStart(2,"0");

    if(time <= 0){
      clearInterval(timer);
      finishFocus();
    }

  },1000);
}

/* =====================
   完了処理
===================== */

function finishFocus(){

  bgm.pause();
  finish.play();

  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");

  // 仮EXP加算
  const exp = document.getElementById("exp");
  exp.innerText = Number(exp.innerText) + 20;
}

/* =====================
   中断
===================== */

document.getElementById("stop").addEventListener("click", () => {

  clearInterval(timer);
  bgm.pause();

  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");
});
