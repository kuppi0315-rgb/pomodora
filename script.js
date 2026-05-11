const loading =
document.getElementById("loading");

const selectScreen =
document.getElementById("select-screen");

const home =
document.getElementById("home");



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

},2000);



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
  (exp % 100);

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

let time = 25 * 60;

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

updateTimer();



// ========================
// START
// ========================

document
.getElementById("start-btn")
.onclick = ()=>{

  if(timer) return;

  timer = setInterval(()=>{

    time--;

    updateTimer();

    if(time <= 0){

      clearInterval(timer);

      timer = null;

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

      // 保存

      saveData();

      // UI更新

      updateUI();

      // 音

      document
      .getElementById("finish-sound")
      .play();

      alert(
        `ポモドーロ完了！\nEXP +${gainedExp}`
      );

      time = 25 * 60;

      updateTimer();
    }

  },1000);
};



// ========================
// STOP
// ========================

document
.getElementById("stop-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;
};



// ========================
// RESET
// ========================

document
.getElementById("reset-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;

  time = 25 * 60;

  updateTimer();
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
