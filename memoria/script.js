const icons=['🎮','🚀','⚡','👾','🏆','🔥','🎯','🕹️'];
let cards=[], first=null, second=null, locked=false, moves=0, pairs=0, seconds=0, timer=null;

const board=document.getElementById('board');
const timeEl=document.getElementById('time');
const movesEl=document.getElementById('moves');
const pairsEl=document.getElementById('pairs');
const message=document.getElementById('message');

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function formatTime(s){
  const m=String(Math.floor(s/60)).padStart(2,'0');
  const sec=String(s%60).padStart(2,'0');
  return `${m}:${sec}`;
}
function startTimer(){
  clearInterval(timer);
  timer=setInterval(()=>{
    seconds++;
    timeEl.textContent=formatTime(seconds);
  },1000);
}
function createCard(icon,index){
  const card=document.createElement('button');
  card.className='card';
  card.dataset.icon=icon;
  card.innerHTML=`<div class="card-inner">
    <div class="face front"></div>
    <div class="face back-face">${icon}</div>
  </div>`;
  card.addEventListener('click',()=>flip(card));
  return card;
}
function flip(card){
  if(locked || card===first || card.classList.contains('matched')) return;
  if(!timer) startTimer();

  card.classList.add('flipped');
  GameAudio.flip();
  if(!first){ first=card; return; }

  second=card;
  moves++;
  movesEl.textContent=moves;
  locked=true;

  if(first.dataset.icon===second.dataset.icon){
    first.classList.add('matched');
    second.classList.add('matched');
    pairs++;
    GameAudio.success();
    pairsEl.textContent=`${pairs}/8`;
    resetTurn();
    if(pairs===8){
      GameAudio.win();
      clearInterval(timer);
      message.textContent=`🏆 ¡Ganaste! ${moves} movimientos en ${formatTime(seconds)}.`;
    }
  }else{
    GameAudio.error();
    setTimeout(()=>{
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      resetTurn();
    },700);
  }
}
function resetTurn(){
  first=null; second=null; locked=false;
}
function newGame(){
  clearInterval(timer);
  timer=null; first=null; second=null; locked=false;
  moves=0;pairs=0;seconds=0;
  timeEl.textContent='00:00';movesEl.textContent='0';pairsEl.textContent='0/8';message.textContent='';
  board.innerHTML='';
  cards=shuffle([...icons,...icons]);
  cards.forEach((icon,i)=>board.appendChild(createCard(icon,i)));
}
document.getElementById('restart').addEventListener('click',newGame);
newGame();
