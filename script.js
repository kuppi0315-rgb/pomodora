const loading = document.getElementById("loading");
const selectScreen = document.getElementById("select-screen");
const home = document.getElementById("home");
const timerScreen = document.getElementById("timer-screen");

const bgm = document.getElementById("bgm");
const focus = document.getElementById("focus-overlay");
const monsterImg = document.getElementById("monster-image");

let selectedMonster = localStorage.getItem("monster") || "";

let exp = Number(localStorage.getItem("exp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let total = Number(localStorage.getItem("total")) || 0;
let today = Number(localStorage.getItem("today")) || 0;

let time = 1;
let timer = null;
let streak = 0;

/* =====================
   ロード
===================== */

setTimeout(() => {

  loading.classList.add("hidden");

  if (selectedMonster) {
    showHome();
  } else {
    selectScreen.classList.remove("hidden");
  }

}, 1000);

/* =====================
   選択
===================== */

document.querySelectorAll(".monster-select").forEach(m => {
  m.onclick = () => {
    selectedMonster = m.dataset.monster;
    localStorage.setItem("monster", selectedMonster);
    showHome();
  };
});

/* =====================
   ホーム
===================== */

function showHome() {

  selectScreen.classList.add("hidden");
  timerScreen.classList.add("hidden");
  home.classList.remove("hidden");

  bgm.pause();

  updateUI();
}

/* =====================
   UI
===================== */

function updateUI() {

  monsterImg.src = `assets/monsters/${selectedMonster}.png`;

  document.getElementById("exp").innerText = exp;
  document.getElementById("today-count").innerText = today;
  document.getElementById("total-count").innerText = total;
}

/* =====================
   砂時計クリック
===================== */

document.getElementById("hourglass-btn").onclick = () => {

  home.classList.add("hidden");
  timerScreen.classList.remove("hidden");

  startFocusMode();
  startTimer();
};

/* =====================
   集中モード演出
===================== */

function startFocusMode(){

  focus.classList.add("focus-active");

  monsterImg.classList.add("sleeping"); // 目を閉じる

  setTimeout(() => {
    focus.classList.remove("focus-active");
  }, 1000);
}

/* =====================
   タイマー
===================== */

function startTimer() {

  time = 1;

  bgm.currentTime = 0;
  bgm.play();

  timer = setInterval(() => {

    time--;

    document.getElementById("timer").innerText = "00:0" + time;

    if (time <= 0) {
      clearInterval(timer);
      complete();
    }

  }, 1000);
}

/* =====================
   完了
===================== */

function complete() {

  bgm.pause();

  streak++;

  let gain = 10;

  if (streak % 3 === 0) gain *= 2;

  exp += gain;
  today++;
  total++;

  if (exp >= level * 100) level++;

  localStorage.setItem("exp", exp);
  localStorage.setItem("level", level);
  localStorage.setItem("today", today);
  localStorage.setItem("total", total);

  document.getElementById("finish-sound").play();

  monsterImg.classList.remove("sleeping");

  showHome();
}

/* =====================
   中断
===================== */

document.getElementById("stop-btn").onclick = () => {

  clearInterval(timer);
  bgm.pause();

  monsterImg.classList.remove("sleeping");

  showHome();
};
