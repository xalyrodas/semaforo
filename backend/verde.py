from machine import Pin

led_verde = Pin(16, Pin.OUT)

def encender():
    """Encender el LED verde"""
    led_verde.value(1)

def apagar():
    """Apagar el LED verde"""
    led_verde.value(0)

def estado():
    """Obtener estado actual del LED verde"""
    return led_verde.value()
