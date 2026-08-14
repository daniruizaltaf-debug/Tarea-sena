document.addEventListener('DOMContentLoaded',()=>{
// 1. Variables de estado
let puntosUsuario = 0;
let puntosPC = 0;

// 2. Referencias al DOM
const mensaje         = document.getElementById("mensaje");
const elecciones      = document.getElementById("elecciones");
const marcadorUsuario = document.getElementById("puntos-jugador");
const marcadorPC      = document.getElementById("puntos-computadora");
const botones         = document.querySelectorAll(".boton-opcion");

// 3. Función principal del juego
function jugar(opcionUsuario) {
  const opciones = ["piedra", "papel", "tijera"];

  // Math.random() → decimal entre 0 y 1
  // × 3           → decimal entre 0 y 2.99...
  // Math.floor()  → entero: 0, 1 o 2
  const indexPC  = Math.floor(Math.random() * 3);
  const opcionPC = opciones[indexPC];

  // Comparar resultados
  if (opcionUsuario === opcionPC) {
    mensaje.innerText = "¡Es un empate! 🤝";
  } else if (
    (opcionUsuario === "piedra" && opcionPC === "tijera") ||
    (opcionUsuario === "papel"  && opcionPC === "piedra") ||
    (opcionUsuario === "tijera" && opcionPC === "papel")
  ) {
    puntosUsuario++;
    mensaje.innerText = "¡Ganaste este punto! 🔥";
  } else {
    puntosPC++;
    mensaje.innerText = "¡La computadora ganó! 🤖";
  }

  actualizarInterfaz(opcionUsuario, opcionPC);
}

// 4. Actualizar el HTML con el resultado
function actualizarInterfaz(user, pc) {
  elecciones.innerText      = `Elegiste: ${user} | PC eligió: ${pc}`;
  marcadorUsuario.innerText = puntosUsuario;
  marcadorPC.innerText      = puntosPC;
}

// 5. Asignar eventos de clic a los botones
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    jugar(boton.id);
  });
});
});

document.querySelectorAll('.boton-opcion').forEach(b=>b.addEventListener('click',()=>{
  GameAudio.click();
  setTimeout(()=>GameAudio.success(),120);
}));
