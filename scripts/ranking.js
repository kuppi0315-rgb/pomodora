const data = [
  { name: "You", pomodoro: localStorage.getItem("total") || 0 },
  { name: "Friend A", pomodoro: 42 },
  { name: "Friend B", pomodoro: 30 },
  { name: "Friend C", pomodoro: 18 }
];

data.sort((a,b)=>b.pomodoro - a.pomodoro);

const list = document.getElementById("rank-list");

data.forEach((d,i)=>{

  const div = document.createElement("div");
  div.className = "rank-item";

  div.innerText = `${i+1}位 ${d.name} : ${d.pomodoro}回`;

  list.appendChild(div);

});
