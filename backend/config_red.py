import time
import network
def conectar_wifi(redes):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    
    if not wlan.isconnected():
        print('Conectando a WiFi...')
        for red in redes:
            ssid, password = red
            wlan.connect(ssid, password)
            for _ in range(10):
                if wlan.isconnected():
                    break
                time.sleep(1)
            if wlan.isconnected():
                break
    
    if wlan.isconnected():
        print('Conexión exitosa!')
        print('Configuración de red:', wlan.ifconfig())
        return True
    else:
        print('No se pudo conectar a ninguna red')
        return False

# Lista de redes WiFi (ssid, password)
REDES = [
    ('iPhoneA', 'roarsita2007'),
    ('iPh0ne', 'rm123456'),# Reemplaza con tus credenciales
    ('Lgl1111', '04523243')
]
