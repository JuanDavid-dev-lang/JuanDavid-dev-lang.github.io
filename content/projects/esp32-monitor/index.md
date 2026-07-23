---
title: "ESP32 Industrial Environmental Monitor"
date: "2025-08-10"
author: "Alexander Dev"
category: "Hardware & Embedded"
status: "Completed"
---

# ESP32 Industrial Environmental Monitor

## Descripción

Dispositivo embebido de alta precisión para mediciones de calidad del aire e indicadores ambientales en naves industriales.

### Características Principales:
- Lectura de PM2.5, PM10, CO2, Temperatura y Humedad.
- Comunicación cifrada vía **MQTT sobre TLS (Port 8883)**.
- Watchdog físico y software para auto-recuperación ante caídas de energía.
- Integración nativa con tableros en **Grafana**.

```cpp
// Fragmento ESP32 MQTT Publishing Loop
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

void publishTelemetry(float temp, float humidity) {
    String payload = "{\"temp\":" + String(temp) + ",\"hum\":" + String(humidity) + "}";
    mqttClient.publish("factory/zone1/telemetry", payload.c_str());
}
```
