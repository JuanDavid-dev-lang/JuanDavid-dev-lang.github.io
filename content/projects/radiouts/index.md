---
title: "RadioUTS - Plataforma de Radio en Vivo"
date: "2026-06-01"
author: "Juan David Gómez Vargas"
category: "Streaming & FullStack"
status: "Completed"
---

# 📻 RadioUTS - Plataforma de Radio en Vivo

RadioUTS es una plataforma moderna de streaming de radio en vivo construida con **React + Vite** (frontend) y una arquitectura de base de datos híbrida que divide la carga entre **MongoDB Atlas** (telemetría, logs y caché de IA) y **Supabase** (PostgreSQL + `pgvector` para datos relacionales y RAG), controlados desde un backend de **Express.js (Node.js)**.

Permite transmitir contenido de audio, gestionar oyentes, integración con RadioBoss, reproducción de canciones de Spotify y YouTube, y características avanzadas de control de transmisión.

---

## 🚀 Características Principales

- **🎵 Streaming de Audio**: Transmisión en tiempo real de contenido de radio de alta fidelidad.
- **🎙️ Control de Transmisión**: Reproducción, pausa, volumen y navegación intuitiva de canciones.
- **📊 Gestión de Oyentes**: Seguimiento de oyentes activos, ubicación geográfica y dispositivos.
- **🌌 Estética Glassmorphism Premium**: Interfaz moderna con desenfoque de fondo translúcido (`backdrop-blur-lg`) y diseño responsivo de alto nivel.
- **🎚️ Visualizador de Espectro en Tiempo Real**: Visualización dinámica de ondas sonoras mediante Canvas HTML5 en el reproductor.
- **👥 Registro de Perfiles Completo**: Tutorial interactivo de bienvenida que captura rol (UTS o externo), género, carrera y medio de escucha.
- **🤖 RadioBoss Integration**: Control TCP/IP bidireccional con software profesional RadioBoss.
- **🗺️ Mapa Interactivo**: Visualización gráfica de oyentes por ubicación geográfica en tiempo real.
- **💬 Chat en Vivo**: Conversaciones por capas con avatares (GerkeAI vs Usuario) y etiquetas alineadas.
- **📈 Dashboard Administrativo**: Panel de control con estadísticas, gestión de usuarios (RBAC) e historial.
- **🛠️ Configuración Dinámica de Tiempos**: Configuración en caliente de timeouts para Gemini, TTS y descargas.
- **🌐 Sincronización en Red**: Funciona en redes locales con auto-detección de dirección IP.

---

## 📋 Requisitos Previos

- **Node.js**: `>= 18`
- **pnpm**: (Requerido)
- **MongoDB**: Local o Atlas para logs y datos volátiles
- **Supabase**: PostgreSQL con extensión `pgvector` para datos relacionales y base RAG
- **RadioBoss**: (Opcional, para integración de cabina)
- **Spotify API Credentials**: (Opcional)
