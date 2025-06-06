from machine import Pin

led_amarillo = Pin(14, Pin.OUT)

def encender():
    """Encender el LED amarillo"""
    led_amarillo.value(1)

def apagar():
    """Apagar el LED amarillo"""
    led_amarillo.value(0)

def estado():
    """Obtener estado actual del LED amarillo"""
    return led_amarillo.value()
