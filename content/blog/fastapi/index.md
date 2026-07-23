---
title: "Arquitectura Hexagonal en Python con FastAPI"
date: "2026-04-20"
author: "Alexander Dev"
category: "Backend"
---

# Arquitectura Hexagonal en Python con FastAPI y SQLAlchemy Async

La **Arquitectura Hexagonal** (o Puertos y Adaptadores) permite aislar el dominio de tu negocio de frameworks web externos, motores de base de datos o APIs de terceros.

## Estructura Recomendada

```text
/src
  /domain       # Entidades y lógica pura de negocio
  /ports        # Interfaces / Abstracciones
  /adapters     # Implementaciones (SQLAlchemy, FastAPI routes, Redis)
```

### Ventajas Principales:
1. **Facilidad de Pruebas**: Puedes testear el dominio usando adaptadores de memoria en lugar de bases de datos reales.
2. **Independencia de Tecnologías**: Si decides cambiar FastAPI por Litestar o PostgreSQL por MongoDB, la lógica del dominio no cambia.
