const loading = document.getElementById("loading");
const selectScreen = document.getElementById("select-screen");
const home = document.getElementById("home");
const timerScreen = document.getElementById("timer-screen");

let selectedMonster = localStorage.getItem("monster") || "";

let exp = Number(localStorage.getItem("exp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let total = Number(localStorage.getItem("total")) || 0;
let today = Number(localStorage.getItem("today")) || 0;

let time = 1;
let timer = null;
let streak = 0;

/* =========================
   ロード
========================= */

setTimeout(() => {

  loading.classList.add("hidden");

  if (selectedMonster) {
    showHome();
  } else {
    selectScreen.classList.remove("hidden");
  }

}, 1200);

/* =========================
   モンスター選択
========================= */

document.querySelectorAll(".monster-select").forEach(m => {

  m.onclick = () => {

    selectedMonster = m.dataset.monster;

    localStorage.setItem("monster", selectedMonster);

    showHome();
  };
});

/* =========================
   ホーム
========================= */

function showHome() {

  selectScreen.classList.add("hidden");
  timerScreen.classList.add("hidden");
  home.classList.remove("hidden");

  updateUI();
}

/* =========================
   UI更新（感情追加）
========================= */

function updateUI() {

  const img = document.getElementById("monster-image");

  img.src = `assets/monsters/${selectedMonster}.png`;

  document.getElementById("exp").innerText = exp;
  document.getElementById("today-count").innerText = today;
  document.getElementById("total-count").innerText = total;
  document.getElementById("monster-level").innerText = "Lv." + level;

  /* =====================
     感情変化
  ===================== */

  if (time > 0 && timer) {
    img.style.transform = "scale(1.05)";
    img.style.filter = "brightness(1.2)"; // 集中＝元気
  } else {
    img.style.transform = "scale(1)";
    img.style.filter = "brightness(0.8)"; // 待機＝眠い
  }

  if (level >= 5) {
    img.src = "assets/monsters/evolve1.png";
  }
}

/* =========================
   砂時計
========================= */

document.getElementById("hourglass-btn").onclick = () => {

  home.classList.add("hidden");
  timerScreen.classList.remove("hidden");

  startTimer();
};

/* =========================
   タイマー（1秒テスト）
========================= */

function startTimer() {

  time = 1;

  timer = setInterval(() => {

    time--;

    document.getElementById("timer").innerText = "00:0" + time;

    updateUI(); // ←感情更新

    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      complete();
    }

  }, 1000);
}

/* =========================
   完了
========================= */

function complete() {

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

  alert("EXP + " + gain);

  showHome();
}

/* =========================
   中断
========================= */

document.getElementById("stop-btn").onclick = () => {
  clearInterval(timer);
  timer = null;
  showHome();
};
