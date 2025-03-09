from machine import Pin, Timer
import utime
import dht
import network
import urequests

utime.sleep(2)
# Configuración de la red Wi-Fi
SSID = 'Duvi'  # Cambia esto por el nombre de tu red Wi-Fi
PASSWORD = '31426926'  # Cambia esto por la contraseña de tu red Wi-Fi

# Configuración del servidor HTTP
SERVER_URL = 'http://143.198.31.104:3033/api/agent'  # URL del servidor

# Configuración del LED
led = Pin(2, Pin.OUT)

# Configuración del sensor DHT11
dht_pin = Pin(4)  # Pin en el que tienes conectado el DHT11
sensor = dht.DHT11(dht_pin)

# Configuración del temporizador
temporizador = Timer(0)

# Nombre del agente (puedes cambiarlo)
agent_name = "ESP32_DHT11_Sensor"

def conectar_wifi():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('Conectando a la red Wi-Fi...')
        sta_if.active(True)
        sta_if.connect(SSID, PASSWORD)
        while not sta_if.isconnected():
            utime.sleep(1)
    print('Conexión Wi-Fi establecida')
    print('Dirección IP:', sta_if.ifconfig()[0])

def InterrupcionTimer(timer):
    led.on()
    utime.sleep_ms(200)
    led.off()

def enviar_datos(temperatura):
    data = {
        "agent_name": agent_name,
        "log_value": temperatura
    }
    try:
        response = urequests.post(SERVER_URL, json=data)
        print("Respuesta del servidor:", response.text)
        response.close()
    except Exception as e:
        print("Error al enviar datos:", e)

# Iniciar conexión Wi-Fi
conectar_wifi()

# Iniciar temporizador
temporizador.init(mode=Timer.PERIODIC, period=3500, callback=InterrupcionTimer)

while True:
    try:
        # Capturar datos de temperatura y humedad
        sensor.measure()
        temperatura = sensor.temperature()  # Temperatura en °C
        humedad = sensor.humidity()  # Humedad en %

        # Mostrar los datos en la consola
        print(f"Temperatura: {temperatura} C")
        print(f"Humedad: {humedad} %")

        # Enviar datos por HTTP POST
        enviar_datos(temperatura)

        # Pausa de 2 segundos antes de la próxima lectura
        utime.sleep(2)

    except OSError as e:
        # Manejo de errores en caso de problemas de lectura
        print("Fallo al leer el sensor.")