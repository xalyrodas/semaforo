import { crearHeader } from "./ui/header.js";
import { crearBotones } from "./componentes/botones.js";
import { crearSemaforo, actualizarSemaforo } from "./componentes/semaforo.js";
import { escucharFirebase, cicloAutomatico } from "./services/firebase.js";

let estadoActual = "rojo";
let cicloActivo = true;

window.estadoGlobal = { estadoActual, cicloActivo };

crearHeader();
crearBotones();
crearSemaforo();
actualizarSemaforo(estadoActual);
escucharFirebase();
setInterval(cicloAutomatico, 1000);
