const home = document.getElementById("home");
const timerScreen = document.getElementById("timer-screen");

const monster = document.getElementById("monster");
const expFill = document.getElementById("exp-fill");
const expText = document.getElementById("exp");
const needText = document.getElementById("need");
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
   タイマー
===================== */

function startTimer(){

  clearInterval(timer);

  time = 10;

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
   完了
===================== */

function complete(){

  bgm.pause();

  let gain = 20;

  exp += gain;
  today++;
  total++;

  let need = level * 100;

  if(exp >= need){
    exp -= need;
    level++;
    levelEffect();
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

  let need = level * 100;

  expText.innerText = exp;
  needText.innerText = need;
  levelText.innerText = "Lv." + level;

  expFill.style.width = (exp / need) * 100 + "%";

  document.getElementById("today").innerText = today;
  document.getElementById("total").innerText = total;
}

/* =====================
   レベルアップ演出
===================== */

function levelEffect(){

  monster.classList.add("level-up");

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
