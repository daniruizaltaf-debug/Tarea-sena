const GameAudio = (() => {
  let ctx = null;

  function init(){
    if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(ctx.state === 'suspended') ctx.resume();
  }

  function tone(freq, duration=.08, type='sine', volume=.18){
    try{
      init();

      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = type;
      o.frequency.value = freq;

      g.gain.setValueAtTime(volume, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(
        .001,
        ctx.currentTime + duration
      );

      o.connect(g);
      g.connect(ctx.destination);

      o.start();
      o.stop(ctx.currentTime + duration);

    }catch(e){}
  }

  return {

    click(){
      tone(520, .055, 'square', .12);
    },

    success(){
      tone(660, .08, 'sine', .18);
      setTimeout(() => tone(880, .12, 'sine', .18), 75);
    },

    error(){
      tone(180, .14, 'sawtooth', .15);
    },

    win(){
      tone(523, .1, 'sine', .20);
      setTimeout(() => tone(659, .1, 'sine', .20), 100);
      setTimeout(() => tone(784, .18, 'sine', .20), 200);
    },

    draw(){
      tone(350, .1, 'sine', .15);
      setTimeout(() => tone(300, .15, 'sine', .15), 110);
    },

    flip(){
      tone(420, .045, 'triangle', .12);
    }

  };
})();

document.addEventListener('pointerdown', () => {
  try{
    GameAudio.init();
  }catch(e){}
},{once:true});
document.getElementById("backTopic").onclick = () => {

    // Detener el temporizador
    clearInterval(interval);

    // Ocultar la trivia
    document.getElementById("quiz").classList.add("hidden");

    // Mostrar selección de temas
    document.getElementById("selection").classList.remove("hidden");

    // Quitar tema seleccionado
    topic = null;

    // Desactivar botón de comenzar
    document.getElementById("startBtn").disabled = true;

    // Quitar selección visual
    document.querySelectorAll(".category").forEach(x => {
        x.classList.remove("selected");
    });
};