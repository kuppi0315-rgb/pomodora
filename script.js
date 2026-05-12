const home = document.getElementById("lobby");
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
   開始
===================== */

btn.onclick = () => {

  document.getElementById("lobby").classList.add("hidden");
  timerScreen.classList.remove("hidden");

  startTimer();
};

/* =====================
   タイマー
===================== */

function startTimer(){

  time = 10;
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
    levelUp();
  }

  updateUI();

  finish.play();

  document.getElementById("lobby").classList.remove("hidden");
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
   レベルアップ
===================== */

function levelUp(){

  level++;

  monster.style.filter = "brightness(2)";
  setTimeout(()=>{
    monster.style.filter = "brightness(1)";
  },500);
}

/* =====================
   中断
===================== */

document.getElementById("stop").onclick = () => {

  clearInterval(timer);
  bgm.pause();

  document.getElementById("lobby").classList.remove("hidden");
  timerScreen.classList.add("hidden");
};
