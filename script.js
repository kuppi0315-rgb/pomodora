const monster = document.getElementById("monster");
const expFill = document.getElementById("exp-fill");

let exp=0,level=1;

/* =====================
   昼夜サイクル
===================== */

function updateTimeTheme(){
  const h=new Date().getHours();

  document.body.classList.remove("day","afternoon","night");

  if(h>=6 && h<12) document.body.classList.add("day");
  else if(h>=12 && h<18) document.body.classList.add("afternoon");
  else document.body.classList.add("night");
}

setInterval(updateTimeTheme,60000);
updateTimeTheme();

/* =====================
   ギルド参加判定
===================== */

const guild = JSON.parse(localStorage.getItem("guild"));

if(guild){
  document.body.style.filter="hue-rotate(20deg)";
}

/* =====================
   EXP更新（簡易）
===================== */

function addExp(val){

  exp+=val;

  let need=level*100;

  if(exp>=need){
    exp-=need;
    level++;
  }

  expFill.style.width=(exp/need)*100+"%";
}
