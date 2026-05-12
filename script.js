const lobby = document.getElementById("lobby");
const timerScreen = document.getElementById("timer-screen");

const btn = document.getElementById("hourglass-btn");
const timerText = document.getElementById("timer");

const bgm = document.getElementById("bgm");
const finish = document.getElementById("finish");

let time = 10;
let timer = null;

/* =====================
   初期状態固定（ロビー表示）
===================== */

window.onload = () => {
  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");
};

/* =====================
   砂時計クリックで開始
===================== */

btn.addEventListener("click", () => {
  startFocus();
});

/* =====================
   集中モード開始
===================== */

function startFocus(){

  // 画面切替
  lobby.classList.add("hidden");
  timerScreen.classList.remove("hidden");

  // タイマー初期化
  time = 10;
  timerText.innerText = "00:10";

  // BGM開始
  bgm.currentTime = 0;
  bgm.play();

  // カウントダウン
  timer = setInterval(() => {

    time--;

    timerText.innerText =
      "00:" + String(time).padStart(2, "0");

    if(time <= 0){
      clearInterval(timer);
      finishFocus();
    }

  }, 1000);
}

/* =====================
   完了処理
===================== */

function finishFocus(){

  bgm.pause();
  finish.play();

  // ロビーに戻す
  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");

  // 仮EXP加算
  const exp = document.getElementById("exp");
  if(exp){
    exp.innerText = Number(exp.innerText) + 20;
  }
}

/* =====================
   中断ボタン
===================== */

document.getElementById("stop").addEventListener("click", () => {

  clearInterval(timer);
  bgm.pause();

  timerScreen.classList.add("hidden");
  lobby.classList.remove("hidden");
});
