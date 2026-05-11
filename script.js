const home = document.getElementById("home");
const timerScreen = document.getElementById("timer-screen");

const monster = document.getElementById("monster");
const expFill = document.getElementById("exp-fill");
const expText = document.getElementById("exp");
const levelText = document.getElementById("level");

const btn = document.getElementById("hourglass-btn");
const bgm = document.getElementById("bgm");
const finish = document.getElementById("finish");

let time = 10;
let timer = null;

let exp = 0;
let level = 1;
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
   タイマー（10秒）
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
   完了（経験値処理）
===================== */

function complete(){

  bgm.pause();

  const gain = 20;

  exp += gain;
  today++;
  total++;

  /* =====================
     レベルアップ判定
  ===================== */

  let need = level * 100;

  if(exp >= need){

    exp -= need;
    level++;

    levelUpEffect();
  }

  updateUI();

  finish.play();

  home.classList.remove("hidden");
  timerScreen.classList.add("hidden");
}

/* =====================
   UI更新
===================== */

function updateUI(){

  expText.innerText = exp;
  levelText.innerText = "Lv." + level;

  let need = level * 100;
  let percent = (exp / need) * 100;

  expFill.style.width = percent + "%";

  document.getElementById("today").innerText = today;
  document.getElementById("total").innerText = total;
}

/* =====================
   レベルアップ演出
===================== */

function levelUpEffect(){

  monster.classList.add("level-up");

  // 振動（対応ブラウザのみ）
  if(navigator.vibrate){
    navigator.vibrate([100,50,100]);
  }

  setTimeout(() => {
    monster.classList.remove("level-up");
  }, 800);
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
