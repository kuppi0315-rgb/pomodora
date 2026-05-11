const btn = document.getElementById("hourglass-btn");

const sandTop = document.querySelector(".sand-top");
const sandBottom = document.querySelector(".sand-bottom");

const bgm = document.getElementById("bgm");

let time = 10;
let timer = null;

let total = 0;
let today = 0;

/* =========================
   砂時計クリック
========================= */

btn.onclick = () => {

  /* 回転リセット */
  btn.classList.remove("rotate");
  void btn.offsetWidth;
  btn.classList.add("rotate");

  /* 砂アニメ完全リセット */
  sandTop.classList.remove("run");
  sandBottom.classList.remove("run");

  void sandTop.offsetWidth;

  sandTop.classList.add("run");
  sandBottom.classList.add("run");

  /* UI切替 */
  document.getElementById("home").classList.add("hidden");
  document.getElementById("timer-screen").classList.remove("hidden");

  startTimer();
};

/* =========================
   タイマー（10秒）
========================= */

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

/* =========================
   完了
========================= */

function complete(){

  bgm.pause();

  total++;
  today++;

  document.getElementById("finish").play();

  document.getElementById("home").classList.remove("hidden");
  document.getElementById("timer-screen").classList.add("hidden");
}

/* =========================
   中断
========================= */

document.getElementById("stop").onclick = () => {

  clearInterval(timer);
  bgm.pause();

  document.getElementById("home").classList.remove("hidden");
  document.getElementById("timer-screen").classList.add("hidden");
};
