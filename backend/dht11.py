# dht11.py
import dht
import machine

sensor = dht.DHT11(machine.Pin(17))

def leer_dht11():
    try:
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()
        print("Temperatura: {}°C, Humedad: {}%".format(temp, hum))
        return temp, hum
    except OSError as e:
        print("Error al leer el sensor:", e)
        return None, None

