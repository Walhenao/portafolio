# 1. Transformers — Clasificación de noticias BBC

**Curso:** Técnicas de Deep Learning · Uniandes  
**Nivel:** Destacado (muy avanzado)

---

## En palabras fáciles — ¿para qué sirve?

Imagina que llegan miles de noticias y alguien tiene que guardarlas por tema: negocios, deporte, política, tecnología o entretenimiento.

Este proyecto enseña a una IA a **leer el artículo completo y decir a qué tema pertenece**, casi como un archivador inteligente.

**Sirve para:** organizar contenidos, recomendar lecturas, filtrar información y apoyar decisiones cuando hay mucho texto.

---

## Qué problema resuelve

Algunos temas se parecen en el vocabulario (por ejemplo política y economía). Un sistema simple se confunde. Aquí se usa un modelo que entiende **contexto**, no solo palabras sueltas.

---

## Lado técnico

| Elemento | Detalle |
|----------|---------|
| Tarea | Clasificación multi-clase (5 categorías BBC) |
| Modelo | BERT / Transformers con fine-tuning |
| Salida | Softmax + cross-entropy (una etiqueta por artículo) |
| Idea clave | Representaciones bidireccionales preentrenadas adaptadas con pocos datos etiquetados |
| Dataset | Artículos BBC (business, entertainment, politics, sport, tech) |

---

## Por qué importa en tu portafolio

Muestra que manejas **NLP moderno** (lo que hoy piden muchas vacantes de IA).  
Conecta con tu marca: **IA que convierte texto en información útil para decidir**.
