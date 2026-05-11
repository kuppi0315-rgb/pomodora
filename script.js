const loading =
document.getElementById("loading");

const selectScreen =
document.getElementById("select-screen");

const home =
document.getElementById("home");

const timerScreen =
document.getElementById("timer-screen");



// ========================
// 保存データ
// ========================

let selectedMonster =
localStorage.getItem("monster")
|| "";

let exp =
Number(localStorage.getItem("exp"))
|| 0;

let level =
Number(localStorage.getItem("level"))
|| 1;

let totalCount =
Number(localStorage.getItem("totalCount"))
|| 0;

let todayCount =
Number(localStorage.getItem("todayCount"))
|| 0;

let streak =
Number(localStorage.getItem("streak"))
|| 0;



// ========================
// ローディング
// ========================

setTimeout(()=>{

  loading.classList.add("hidden");

  if(selectedMonster){

    showHome();

  }else{

    selectScreen.classList.remove("hidden");
  }

},1500);



// ========================
// モンスター選択
// ========================

document
.querySelectorAll(".monster-select")
.forEach(monster=>{

  monster.onclick = ()=>{

    selectedMonster =
    monster.dataset.monster;

    localStorage.setItem(
      "monster",
      selectedMonster
    );

    showHome();
  };
});



// ========================
// ホーム表示
// ========================

function showHome(){

  timerScreen.classList.add("hidden");

  selectScreen.classList.add("hidden");

  home.classList.remove("hidden");

  updateUI();
}



// ========================
// UI更新
// ========================

function updateUI(){

  document
  .getElementById("monster-image")
  .src =
  `assets/monsters/${selectedMonster}.png`;

  document
  .getElementById("monster-level")
  .innerText =
  `Lv.${level}`;

  document
  .getElementById("exp")
  .innerText =
  exp;

  document
  .getElementById("today-count")
  .innerText =
  todayCount;

  document
  .getElementById("total-count")
  .innerText =
  totalCount;



  // EXPバー

  let percent =
  exp % 100;

  document
  .getElementById("exp-bar")
  .style.width =
  `${percent}%`;



  // 進化

  if(level >= 5){

    document
    .getElementById("monster-image")
    .src =
    "assets/monsters/evolve1.png";
  }
}



// ========================
// タイマー
// ========================

// テスト用1秒

let time = 1;

let timer = null;

const timerDisplay =
document.getElementById("timer");



function updateTimer(){

  let minutes =
  Math.floor(time / 60);

  let seconds =
  time % 60;

  timerDisplay.innerText =
  `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}



// ========================
// 砂時計ボタン
// ========================

document
.getElementById("hourglass-btn")
.onclick = ()=>{

  home.classList.add("hidden");

  timerScreen.classList.remove("hidden");

  startPomodoro();
};



// ========================
// ポモドーロ開始
// ========================

function startPomodoro(){

  time = 1;

  updateTimer();

  timer = setInterval(()=>{

    time--;

    updateTimer();

    if(time <= 0){

      clearInterval(timer);

      timer = null;

      completePomodoro();
    }

  },1000);
}



// ========================
// 完了
// ========================

function completePomodoro(){

  streak++;

  let gainedExp = 10;

  // 3回ごと2倍

  if(streak % 3 === 0){

    gainedExp *= 2;
  }

  exp += gainedExp;

  totalCount++;

  todayCount++;

  // レベルアップ

  if(exp >= level * 100){

    level++;
  }

  saveData();

  updateUI();

  // 完了音

  document
  .getElementById("finish-sound")
  .play();

  alert(
    `ポモドーロ完了！\nEXP +${gainedExp}`
  );

  // ホーム戻る

  showHome();
}



// ========================
// 中断
// ========================

document
.getElementById("stop-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;

  showHome();
};



// ========================
// 保存
// ========================

function saveData(){

  localStorage.setItem(
    "exp",
    exp
  );

  localStorage.setItem(
    "level",
    level
  );

  localStorage.setItem(
    "totalCount",
    totalCount
  );

  localStorage.setItem(
    "todayCount",
    todayCount
  );

  localStorage.setItem(
    "streak",
    streak
  );
}
