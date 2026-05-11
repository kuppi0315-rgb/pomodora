const loading =
document.getElementById("loading");

const selectScreen =
document.getElementById("select-screen");

const home =
document.getElementById("home");



// ========================
// ローディング画面
// ========================

setTimeout(()=>{

  loading.classList.add("hidden");

  selectScreen.classList.remove("hidden");

},2000);



// ========================
// モンスター選択
// ========================

let selectedMonster = "";

document
.querySelectorAll(".monster-select")
.forEach(monster=>{

  monster.onclick = ()=>{

    selectedMonster =
    monster.dataset.monster;

    document
    .getElementById("monster-image")
    .src =
    `assets/monsters/${selectedMonster}.png`;

    selectScreen
    .classList.add("hidden");

    home
    .classList.remove("hidden");
  };
});



// ========================
// 基本データ
// ========================

let time = 25 * 60;

let timer = null;

let exp = 0;

let level = 1;

let pomodoroCount = 0;

let streak = 0;



// ========================
// HTML取得
// ========================

const timerDisplay =
document.getElementById("timer");

const expDisplay =
document.getElementById("exp");

const levelDisplay =
document.getElementById("monster-level");

const pomodoroDisplay =
document.getElementById("pomodoro-count");



// ========================
// タイマー表示更新
// ========================

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
// STARTボタン
// ========================

document
.getElementById("start-btn")
.onclick = ()=>{

  if(timer) return;

  timer = setInterval(()=>{

    time--;

    updateTimer();

    // ====================
    // ポモドーロ完了
    // ====================

    if(time <= 0){

      clearInterval(timer);

      timer = null;

      streak++;

      // EXP計算

      let gainedExp = 10;

      // 3回ごと2倍

      if(streak % 3 === 0){

        gainedExp *= 2;
      }

      exp += gainedExp;

      pomodoroCount++;

      // 表示更新

      expDisplay.innerText = exp;

      pomodoroDisplay.innerText =
      pomodoroCount;

      // ====================
      // レベルアップ
      // ====================

      if(exp >= level * 100){

        level++;

        levelDisplay.innerText =
        `Lv.${level}`;

        // ==================
        // 進化
        // ==================

        if(level >= 5){

          document
          .getElementById("monster-image")
          .src =
          "assets/monsters/evolve1.png";
        }
      }

      // 完了通知

      alert(
        `ポモドーロ完了！\nEXP +${gainedExp}`
      );

      // タイマーリセット

      time = 25 * 60;

      updateTimer();
    }

  },1000);

};



// ========================
// STOPボタン
// ========================

document
.getElementById("stop-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;
};



// ========================
// RESETボタン
// ========================

document
.getElementById("reset-btn")
.onclick = ()=>{

  clearInterval(timer);

  timer = null;

  time = 25 * 60;

  updateTimer();
};
