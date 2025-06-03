import { crearLuzRoja } from "./rojo.js";
import { crearLuzAmarilla } from "./amarillo.js";
import { crearLuzVerde } from "./verde.js";

const FIREBASE_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/estado.json";
let estadoActual = "rojo";

function crearSemaforo() {
    const semaforo = document.createElement("div");
    semaforo.className = "semaforo";
    semaforo.appendChild(crearLuzRoja());
    semaforo.appendChild(crearLuzAmarilla());
    semaforo.appendChild(crearLuzVerde());
    document.body.appendChild(semaforo);
}


function actualizarSemaforo(color) {
    document.querySelectorAll('.luz').forEach(luz => {
        luz.classList.remove('activo');
        if (luz.classList.contains(color)) {
            luz.classList.add('activo');
        }
    });
}


async function cambiarEstado(color) {
    estadoActual = color;
    actualizarSemaforo(color);
    try {
        await fetch(FIREBASE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ color })
        });
    } catch (error) {
        console.error("Error al actualizar Firebase:", error);
    }
}

function iniciarEscuchaFirebase() {
    setInterval(async () => {
        try {
            const response = await fetch(FIREBASE_URL);
            const data = await response.json();
            if (data?.color && data.color !== estadoActual) {
                estadoActual = data.color;
                actualizarSemaforo(estadoActual);
            }
        } catch (error) {
            console.error("Error leyendo Firebase:", error);
        }
    }, 1000);
}

// Inicialización
crearSemaforo();
actualizarSemaforo(estadoActual);
iniciarEscuchaFirebase();