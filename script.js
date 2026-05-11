const home = document.getElementById("home");
const timerScreen = document.getElementById("timer-screen");

const btn = document.getElementById("hourglass-btn");
const bgm = document.getElementById("bgm");
const finish = document.getElementById("finish");

let time = 10;
let timer = null;

let today = 0;
let total = 0;

/* =====================
   砂時計クリック
===================== */

btn.onclick = () => {

  home.classList.add("hidden");
  timerScreen.classList.remove("hidden");

  startTimer();
};

/* =====================
   タイマー（10秒テスト）
===================== */

function startTimer(){

  clearInterval(timer);

  time = 10;

  document.getElementById("timer").innerText = "00:10";

  bgm.currentTime = 0;
  bgm.play();

  timer = setInterval(() => {

    time--;

    document.getElementById("timer").innerText =
      "00:" + String(time).padStart(2,"0");

    if(time <= 0){
      clearInterval(timer);
      complete();
    }

  },1000);
}

/* =====================
   完了処理
===================== */

function complete(){

  bgm.pause();

  total++;
  today++;

  finish.play();

  document.getElementById("today").innerText = today;
  document.getElementById("total").innerText = total;

  home.classList.remove("hidden");
  timerScreen.classList.add("hidden");
}

/* =====================
   中断
===================== */

document.getElementById("stop").onclick = () => {

  clearInterval(timer);
  bgm.pause();

  home.classList.remove("hidden");
  timerScreen.classList.add("hidden");
};
