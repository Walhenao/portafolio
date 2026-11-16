# 4. Clasificador ODS + app Streamlit

**Curso:** Machine Learning no supervisado · Microproyecto 2 · Uniandes  
**Nivel:** Destacado (producto desplegable)

---

## En palabras fáciles — ¿para qué sirve?

Los **ODS** son los 17 Objetivos de Desarrollo Sostenible de la ONU (pobreza, salud, educación, igualdad, ambiente, etc.).

Este proyecto toma un texto en español y predice **a qué ODS se parece más**.  
Además, no se quedó en un cuaderno: se convirtió en una **aplicación web** (Streamlit) para que cualquiera pueda probarlo.

**Sirve para:** clasificar políticas, proyectos o documentos según agenda social/ambiental y mostrar IA como producto usable.

---

## Qué problema resuelve

Organizaciones reciben muchos textos y necesitan etiquetarlos rápido para seguimiento de políticas públicas. Hacerlo a mano es lento; un clasificador ayuda a **ordenar y priorizar**.

---

## Lado técnico

| Elemento | Detalle |
|----------|---------|
| Entrada | Texto en español |
| Salida | Predicción de ODS |
| Pipeline | TF-IDF → TruncatedSVD → LinearSVC |
| Producto | App Streamlit (`streamlit_app.py`) |
| Entrega | Repo + despliegue en Streamlit Community Cloud |
| Extra | Trabajo de reducción de dimensión + clasificación |

Repo de referencia (público): `Walhenao/mlns-mp2-ods-henao-duque`

---

## Por qué importa en tu portafolio

Prueba clave: **sabes llevar un modelo a producto**.  
Conecta con tu marca: **procesos + automatización + IA usable para decisión**.
