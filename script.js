const lobby = document.getElementById("lobby");
const timerScreen = document.getElementById("timer-screen");

const btn = document.getElementById("hourglass-btn");
const timerText = document.getElementById("timer");

const bgm = document.getElementById("bgm");
const finish = document.getElementById("finish");

let time = 10;
let timer = null;

/* =====================
   初期化（超重要）
===================== */

window.onload = () => {
  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");
};

/* =====================
   砂時計クリックのみ起動
===================== */

btn.addEventListener("click", () => {
  startFocus();
});

/* =====================
   集中開始
===================== */

function startFocus(){

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
   完了
===================== */

function finishFocus(){

  bgm.pause();
  finish.play();

  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");
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
