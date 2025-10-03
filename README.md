# Examen Parcial - RadioFy

**Modalidad:** Grupos de 3 personas

## Descripción del Proyecto

Desarrollar una aplicación web llamada **RadioFy**, una versión simplificada de Spotify que permite escuchar emisoras de radio en línea de todo el mundo. El prototipo utilizará la API REST pública de Radio Browser que ofrece miles de estaciones gratuitas.

## Requisitos Técnicos

- [✅] Framework: **Vite**
- [✅] API: Radio Browser REST API

## Funcionalidades Requeridas

### Pantalla Principal

- [✅] Mostrar listado de emisoras de un país (puede ser emisoras random: Colombia, Perú, México, etc.)
- Cada emisora debe mostrarse como tarjeta con:
  - [✅] Logo (si existe)
  - [✅] Nombre
  - [✅] País
- [✅] Al hacer clic en "Reproducir", la emisora debe comenzar a reproducirse en un reproductor global

### Búsqueda

- [✅] Implementar formulario para buscar emisoras por nombre
- [✅] Implementar botones con países predeterminados (Colombia, Perú, Canadá...)
- [✅] Mostrar resultados en formato de tarjetas

### Reproductor

- [✅] Mostrar información de la emisora en reproducción:
  - [✅] Logo
  - [✅] Nombre de la emisora
  - [✅] País
  - [✅] Controles de reproducción
- [✅] El reproductor debe actualizarse al cambiar de emisora

## Buenas Prácticas

- [✅] Usar componentes reutilizables (ej. StationCard, NowPlayingBar)
- [✅] Manejar estado global de reproducción con Context API
- [✅] Estilos básicos en archivo CSS (no inline)

## Criterios de Evaluación

| Criterio                                                         | Porcentaje |
| ---------------------------------------------------------------- | ---------- |
| Correcta integración con API Radio Browser (fetch y renderizado) | 30%        |
| Implementación del reproductor global con controles              | 30%        |
| Uso de componentes y Context API                                 | 20%        |
| Estilos consistentes (cards, layout tipo Spotify)                | 10%        |
| Claridad y limpieza del código                                   | 10%        |
