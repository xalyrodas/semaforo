import { crearLuzRoja } from "./rojo.js";
import { crearLuzAmarilla } from "./amarillo.js";
import { crearLuzVerde } from "./verde.js";

const FIREBASE_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/estado.json";
let estadoActual = "rojo";

function header() {
    const header = document.createElement("div");
    header.className = "header"
    
    const divimg = document.createElement("div")
    divimg.className = "divimg"
    header.appendChild(divimg)

    const img = document.createElement("img")
    img.src = "https://brandlogos.net/wp-content/uploads/2020/09/raspberry-pi-logo.png"
    divimg.appendChild(img)

    const divText = document.createElement("p")
    divText.className = "textoRPW"
    divText.innerText = "Raspberry Pico W"
    header.appendChild(divText)
    
    const divVers = document.createElement("div")
    divVers.className = "divVers"
    divVers.innerText = "V 1.0"
    header.appendChild(divVers)

    document.body.appendChild(header);
}

function botones() {
    const divbotones = document.createElement("div")
    divbotones.className = "divbotones"

    const btnDetener = document.createElement("button");
    btnDetener.className = "btnD";
    btnDetener.innerText = "Detener";
    divbotones.appendChild(btnDetener)

    const btnRojo = document.createElement("button");
    btnRojo.className = "btnR";
    btnRojo.innerText = "Rojo";
    divbotones.appendChild(btnRojo)

    const btnAmarillo = document.createElement("button");
    btnAmarillo.className = "btnA";
    btnAmarillo.innerText = "Amarillo";
    divbotones.appendChild(btnAmarillo)

    const btnVerde = document.createElement("button");
    btnVerde.className = "btnV";
    btnVerde.innerText = "Verde";
    divbotones.appendChild(btnVerde)

    document.body.appendChild(divbotones);

}

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
header();
botones();
crearSemaforo();
actualizarSemaforo(estadoActual);
iniciarEscuchaFirebase();