# 3. LSTM / GRU — Sentimiento en reseñas IMDb

**Curso:** Técnicas de Deep Learning · Uniandes  
**Nivel:** Destacado

---

## En palabras fáciles — ¿para qué sirve?

Las personas escriben reseñas largas. Este proyecto enseña a una red a leer esa secuencia de texto y decir si la opinión es **positiva o negativa**.

Es como un termómetro automático del ánimo del cliente o del público.

**Sirve para:** monitoreo de marca, análisis de comentarios, atención al cliente y priorización de quejas.

---

## Qué problema resuelve

Contar palabras “buenas” o “malas” no alcanza: hay negaciones, ironía y contraste (“no me gustó… aunque el final sí”).  
Las redes recurrentes miran el texto **en orden**, como lo lee un humano.

---

## Lado técnico

| Elemento | Detalle |
|----------|---------|
| Tarea | Clasificación binaria de sentimiento |
| Dataset | Reseñas IMDb |
| Modelos | RNN clásica vs **LSTM** vs **GRU** (comparación) |
| LSTM | Memoria + 3 compuertas (mitiga vanishing gradient) |
| GRU | 2 compuertas, suele ser más liviana |
| Enfoque | Embeddings + secuencias; comparar desempeño/complejidad |

---

## Por qué importa en tu portafolio

Demuestra que no solo usas Transformers: entiendes **redes secuenciales** y sabes **comparar arquitecturas** con criterio.  
Conecta con tu marca: **automatizar lectura de opiniones para decidir más rápido**.
