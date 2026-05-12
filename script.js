const monster = document.getElementById("monster");
const expFill = document.getElementById("exp-fill");

let exp=0,level=1;

/* =====================
   昼夜サイクル（背景＋雲色制御）
===================== */

function updateTimeTheme(){
  const h=new Date().getHours();

  document.body.classList.remove("day","afternoon","night");

  if(h>=6 && h<12){
    document.body.classList.add("day");
  }else if(h>=12 && h<18){
    document.body.classList.add("afternoon");
  }else{
    document.body.classList.add("night");
  }
}

setInterval(updateTimeTheme,60000);
updateTimeTheme();

/* =====================
   EXP処理（仮）
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
