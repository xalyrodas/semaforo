from machine import Pin

led_rojo = Pin(15, Pin.OUT)

def encender():
    """Encender el LED rojo"""
    led_rojo.value(1)

def apagar():
    """Apagar el LED rojo"""
    led_rojo.value(0)

def estado():
    """Obtener estado actual del LED rojo"""
    return led_rojo.value()
