# vamos a hacer un test por http actua como un sensor de temperatura y por http envia a http://localhost:3033/api/agent con el metodo POST log_value agent_name

import requests
import json
import time
import random

def test_agent():
    url = "http://localhost:3033/api/agent"
    agent_name = "Agente de Temperatura"
    while True:
        temperature = random.randint(0, 100)
        data = {
            "agent_name": agent_name,
            "log_value": temperature
        }
        headers = {
            "Content-Type": "application/json"
        }
        response = requests.post(url, data=json.dumps(data), headers=headers)
        print(response.text)
        time.sleep(1)

if __name__ == "__main__":
    test_agent()