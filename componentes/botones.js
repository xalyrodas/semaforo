// components/botones.js
import { cambiarEstado } from "../services/firebase.js";

export function crearBotones() {
    const divbotones = document.createElement("div");
    divbotones.className = "divbotones";

    const btnDetener = document.createElement("button");
    btnDetener.className = "btnD";
    btnDetener.innerText = "Detener";
    divbotones.appendChild(btnDetener);
    btnDetener.onclick = () => cambiarEstado("detener");

    const btnRojo = document.createElement("button");
    btnRojo.className = "btnR";
    btnRojo.innerText = "Rojo";
    divbotones.appendChild(btnRojo);
    btnRojo.onclick = () => cambiarEstado("rojo");

    const btnAmarillo = document.createElement("button");
    btnAmarillo.className = "btnA";
    btnAmarillo.innerText = "Amarillo";
    divbotones.appendChild(btnAmarillo);
    btnAmarillo.onclick = () => cambiarEstado("amarillo");

    const btnVerde = document.createElement("button");
    btnVerde.className = "btnV";
    btnVerde.innerText = "Verde";
    divbotones.appendChild(btnVerde);
    btnVerde.onclick = () => cambiarEstado("verde");

    document.body.appendChild(divbotones);
}
