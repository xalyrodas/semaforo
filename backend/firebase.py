import urequests
import ujson

# URL para estado del semáforo
FIREBASE_ESTADO_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/estado.json"
# URL para datos de sensores
FIREBASE_SENSORES_URL = "https://semaforo-2b771-default-rtdb.firebaseio.com/sensores.json"

def actualizar_estado(color):
    """Envía el estado actual del semáforo a Firebase"""
    try:
        data = ujson.dumps({"color": color})
        response = urequests.put(FIREBASE_ESTADO_URL, data=data, headers={"Content-Type": "application/json"})
        response.close()
        return True
    except Exception as e:
        print("Error al actualizar estado:", e)
        return False

def obtener_estado():
    """Obtiene el estado del semáforo desde Firebase"""
    try:
        response = urequests.get(FIREBASE_ESTADO_URL)
        data = response.json()
        response.close()
        return data.get("color")
    except Exception as e:
        print("Error al obtener estado:", e)
        return None

def actualizar_sensores(temperatura, humedad):
    """Envía temperatura y humedad a Firebase"""
    try:
        data = ujson.dumps({
            "temperatura": temperatura,
            "humedad": humedad
        })
        response = urequests.put(FIREBASE_SENSORES_URL, data=data, headers={"Content-Type": "application/json"})
        response.close()
        return True
    except Exception as e:
        print("Error al enviar sensores:", e)
        return False
