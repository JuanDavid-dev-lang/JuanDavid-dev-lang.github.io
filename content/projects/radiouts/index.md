---
title: "RadioUTS - Streaming Platform"
date: "2025-11-20"
author: "Alexander Dev"
category: "Backend & Cloud"
status: "Completed"
---

# RadioUTS - Plataforma Streaming de Audio y Podcasts

## Visión del Proyecto

RadioUTS es una plataforma moderna para la emisión de radio universitaria en vivo y catálogo bajo demanda de podcasts. La plataforma soporta miles de oyentes simultáneos sin degradación de latencia.

---

## 🚀 Desafíos Técnicos

- **Baja Latencia**: Mantener el retraso de streaming por debajo de 2 segundos.
- **Escalabilidad**: Soportar picos de tráfico durante transmisiones especiales.
- **Formato Adaptativo**: Stream automático según el ancho de banda del usuario (AAC / MP3).

---

## 🛠 Stack y Tecnologías

- **Node.js & TypeScript**: Servidor principal de metadata y usuarios.
- **FFmpeg & Icecast**: Transcodificación e ingesta de audio en directo.
- **Redis Cache**: Manejo de sesiones y lista de reproducción en tiempo real.
- **Docker & AWS S3**: Almacenamiento distribuido de episodios grabados.

---

## 💡 Lecciones Aprendidas

> Implementar buffer circular en Redis redujo la sobrecarga del disco en un 80% durante la emisión en vivo.
