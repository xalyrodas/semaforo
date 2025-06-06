from config_red import conectar_wifi, REDES
from rojo import encender as encender_rojo, apagar as apagar_rojo
from amarillo import encender as encender_amarillo, apagar as apagar_amarillo
from verde import encender as encender_verde, apagar as apagar_verde
from firebase import actualizar_estado, obtener_estado, actualizar_sensores
from dht11 import leer_dht11
import time

def log(msg):
    print("[LOG]", msg)

def apagar_todos():
    apagar_rojo()
    apagar_amarillo()
    apagar_verde()

def encender_led(color):
    apagar_todos()
    if color == "rojo":
        encender_rojo()
    elif color == "amarillo":
        encender_amarillo()
    elif color == "verde":
        encender_verde()
    try:
        if not actualizar_estado(color):
            log(f"Error al actualizar estado en Firebase para color {color}")
    except Exception as e:
        log(f"Excepción al actualizar Firebase: {e}")

def ciclo_automatico():
    secuencia = [("rojo", 3), ("amarillo", 1), ("verde", 3), ("amarillo", 1)]
    for color, duracion in secuencia:
        log(f"Encendiendo {color} por {duracion} segundos")
        encender_led(color)
        for _ in range(int(duracion * 2)):  # Revisa cada 0.5 seg
            estado_externo = obtener_estado()
            if estado_externo and estado_externo != "ciclo":
                return estado_externo
            time.sleep(0.5)
    return None

def main():
    log("Intentando conectar al WiFi...")
    if conectar_wifi(REDES):
        log("Conexión WiFi exitosa. Esperando estabilidad...")
        time.sleep(3)
        try:
            ultimo_envio = time.time()
            while True:
                # Leer y enviar sensores cada 10 segundos
                if time.time() - ultimo_envio >= 10:
                    temp, hum = leer_dht11()
                    if temp is not None and hum is not None:
                        actualizar_sensores(temp, hum)
                    else:
                        print("Sensor no devolvió datos válidos")
                    ultimo_envio = time.time()


                estado_externo = obtener_estado()
                if estado_externo in ("rojo", "amarillo", "verde"):
                    log(f"Orden externa: encender {estado_externo}")
                    encender_led(estado_externo)
                    while True:
                        nuevo_estado = obtener_estado()
                        if nuevo_estado != estado_externo:
                            break
                        time.sleep(1)
                elif estado_externo == "detener":
                    log("Orden externa: detener y apagar todos los LEDs")
                    apagar_todos()
                    while True:
                        nuevo_estado = obtener_estado()
                        if nuevo_estado != "detener":
                            break
                        time.sleep(1)
                else:
                    orden = ciclo_automatico()
                    if orden:
                        log(f"Orden detectada durante ciclo: {orden}")
        except KeyboardInterrupt:
            log("Programa detenido por el usuario.")
        except Exception as e:
            log(f"Error inesperado: {e}")
    else:
        log("No se pudo conectar a WiFi.")

if __name__ == "__main__":
    main()