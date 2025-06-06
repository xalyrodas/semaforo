import { crearHeader } from "./ui/header.js";
import { crearBotones } from "./componentes/botones.js";
import { crearSemaforo, actualizarSemaforo } from "./componentes/semaforo.js";
import { escucharFirebase, cicloAutomatico } from "./services/firebase.js";
import { actualizarTemperaturaYHumedad } from "./componentes/temperaturaHumedad.js";  // Importar la función

let estadoActual = "rojo";
let cicloActivo = true;

window.estadoGlobal = { estadoActual, cicloActivo };

// Crear el header
crearHeader();

// Crear los botones y el semáforo
crearBotones();
crearSemaforo();
actualizarSemaforo(estadoActual);

// Escuchar cambios en Firebase
escucharFirebase();

// Llamar a ciclo automático cada segundo
setInterval(cicloAutomatico, 1000);

// Llamar a la función para actualizar la temperatura y humedad cada 5 segundos
setInterval(actualizarTemperaturaYHumedad, 5000);

// Crear el contenedor dinámicamente (ya que no quieres tocar el HTML directamente)
document.addEventListener("DOMContentLoaded", () => {
  // Crear el contenedor principal (container)
  const container = document.createElement("div");
  container.classList.add("container");

  // Crear la columna izquierda (para semáforo y botones)
  const izquierda = document.createElement("div");
  izquierda.classList.add("izquierda");

  // Crear la columna derecha (para temperatura y humedad)
  const derecha = document.createElement("div");
  derecha.classList.add("derecha");

  // Agregar las columnas al contenedor
  container.appendChild(izquierda);
  container.appendChild(derecha);


  document.body.appendChild(container);

  
  actualizarTemperaturaYHumedad();
});
