import { actualizarSemaforo } from "../componentes/semaforo.js";

const FIREBASE_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/estado.json";

export async function cambiarEstado(color) {
    try {
        await fetch(FIREBASE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ color })
        });
        console.log("Estado cambiado a:", color);
    } catch (error) {
        console.error("Error al actualizar Firebase:", error);
    }
}

export function escucharFirebase() {
    setInterval(async () => {
        try {
            const response = await fetch(FIREBASE_URL);
            const data = await response.json();
            if (data?.color && data.color !== window.estadoGlobal.estadoActual) {
                window.estadoGlobal.estadoActual = data.color;
                actualizarSemaforo(data.color);

                if (data.color === "detener") {
                    window.estadoGlobal.cicloActivo = false;
                    console.log("Semáforo detenido");
                } else if (data.color === "ciclo") {
                    window.estadoGlobal.cicloActivo = true;
                    console.log("Ciclo automático reanudado");
                } else {
                    window.estadoGlobal.cicloActivo = false;
                }
            }
        } catch (error) {
            console.error("Error leyendo Firebase:", error);
        }
    }, 1000);
}

export async function cicloAutomatico() {
    if (!window.estadoGlobal.cicloActivo) return;

    const secuencia = [["rojo", 3], ["amarillo", 1], ["verde", 3], ["amarillo", 1]];
    for (const [color, duracion] of secuencia) {
        if (!window.estadoGlobal.cicloActivo) break;
        console.log(`Encendiendo ${color} por ${duracion} segundos`);
        await cambiarEstado(color);
        actualizarSemaforo(color);
        await new Promise(res => setTimeout(res, duracion * 1000));
    }
}
