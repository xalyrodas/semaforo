export function actualizarTemperaturaYHumedad() {
    const FIREBASE_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/sensores.json";
  
    let datosDiv = document.querySelector(".datos");
    if (!datosDiv) {
      
      datosDiv = document.createElement("div");
      datosDiv.classList.add("datos"); 
      
      const tempPara = document.createElement("p");
      const humPara = document.createElement("p");
  
      tempPara.innerHTML = `Temperatura: <span id="temperatura">--</span> °C`;
      humPara.innerHTML = `Humedad: <span id="humedad">--</span> %`;
  
      // Crear la imagen del ventilador
      const ventiladorImg = document.createElement("img");
      ventiladorImg.id = "ventilador";
      ventiladorImg.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusagif.com%2Fwp-content%2Fuploads%2F2022%2Ffzk5d%2Ffan-gif-11-stripes-yellow-background-fan-acegif.gif&f=1&nofb=1&ipt=ada39f7e6d1aa6b63e683aebafa36be0580180fb7f5b80a3de85a2f243105f3b"; // Reemplaza con la ruta de tu imagen o GIF
      ventiladorImg.alt = "Ventilador";

      // Añadir la imagen del ventilador debajo de la temperatura y humedad
      datosDiv.appendChild(tempPara);
      datosDiv.appendChild(humPara);
      datosDiv.appendChild(ventiladorImg);
  
      document.body.appendChild(datosDiv);
    }
  
    fetch(FIREBASE_URL)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const temperatura = data.temperatura || '--';
          const humedad = data.humedad || '--';
  
          document.getElementById("temperatura").innerText = `${temperatura} °C`;
          document.getElementById("humedad").innerText = `${humedad} %`;

          // Comprobamos la temperatura para activar el giro del ventilador
          const ventilador = document.getElementById("ventilador");

          if (temperatura >= 30) {
            ventilador.classList.add("girar"); // Agregar la clase para que el ventilador gire
          } else {
            ventilador.classList.remove("girar"); // Eliminar la clase para detener el giro
          }
        }
      })
      .catch(error => {
        console.error("Error al obtener los datos de Firebase:", error);
      });
}
