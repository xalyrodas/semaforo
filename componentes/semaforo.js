import { crearLuzRoja } from "../luces/rojo.js";
import { crearLuzAmarilla } from "../luces/amarillo.js";
import { crearLuzVerde } from "../luces/verde.js";

export function crearSemaforo() {
    const semaforo = document.createElement("div");
    semaforo.className = "semaforo";
    semaforo.appendChild(crearLuzRoja());
    semaforo.appendChild(crearLuzAmarilla());
    semaforo.appendChild(crearLuzVerde());
    document.body.appendChild(semaforo);
}

export function actualizarSemaforo(color) {
    document.querySelectorAll('.luz').forEach(luz => {
        luz.classList.remove('activo');
        if (luz.classList.contains(color)) {
            luz.classList.add('activo');
        }
    });
}
