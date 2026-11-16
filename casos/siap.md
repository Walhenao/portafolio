# Caso SIAP — Full IA (versión técnica)

## SIAP — Sistema Inteligente de Apoyo a Procesos  
### Automatización del flujo de información documentada + capa de IA conversacional, analítica y de aprendizaje continuo

**Posicionamiento del caso:** este producto se vende como **full IA aplicada a procesos**, no como un chatbot decorativo.  
La IA vive encima de un flujo real de trámites documentales (estados, roles, alertas, publicaciones, comparaciones e indicadores).

**Sin confidencial:** sin datos, credenciales, correos internos ni código propietario.

---

## Gancho (30 segundos)

SIAP es un **Sistema Inteligente de Apoyo a Procesos**: IA operativa sobre el flujo de información documentada.

entiende lenguaje natural → consulta datos reales de trámites → responde por rol → sugiere prioridades → aprende de lo que no entendió → y se conecta al proceso completo de revisión/publicación.

No responde “de memoria”.  
**Responde con contexto de proceso + automatización + aprendizaje.**

---

## 1. Qué es SIAP (definición fuerte)

**SIAP = Sistema Inteligente de Apoyo a Procesos**

Dos capas inseparables:

| Capa | Qué hace |
|------|----------|
| **Automatización de proceso** | Orquesta el ciclo de trámites de información documentada entre roles (gestor, coordinador, arquitecto, líder, documentos SGI, etc.) |
| **IA full** | NLU por intents, sinónimos, consultas a BD, sugerencias proactivas, comparación documental, analítica de estados/indicadores y aprendizaje continuo |

En una frase:

> **SIAP convierte el flujo documental en un proceso automatizado que se opera y se decide con inteligencia artificial.**

---

## 2. Problema estratégico que ataca la IA

En flujos de información documentada suele pasar esto:

- el usuario no sabe **en qué estado** está un trámite ni qué sigue  
- la misma pregunta se repite (“¿qué significa este estado?”, “¿qué tengo vencido?”)  
- coordinadores pierden tiempo consolidando pendientes/vencidos  
- hay fricción para priorizar (qué atender primero)  
- comparar versiones de documentos es manual y lento  
- el conocimiento del proceso vive en personas, no en el sistema  
- no hay aprendizaje: cada duda vuelve a cero  

SIAP ataca eso con **IA + datos del proceso**, no con FAQ estático.

---

## 3. Enfoque (método de marca)

1. **Analizar** el flujo real de trámites y estados  
2. **Diseñar** roles, transiciones y reglas de alerta  
3. **Optimizar** el proceso de carga, revisión, devolución y publicación  
4. **Automatizar** notificaciones, tableros, comparaciones y métricas  
5. **Incorporar IA full** (NLU + proactividad + aprendizaje + analítica) para acelerar decisión operativa y de calidad del proceso  

---

## 4. Arquitectura técnica (IA en el centro)

```text
Usuario (rol)
   │  lenguaje natural / UI de flujo
   ▼
[Flask App — flujo de trámites + auth por roles]
   │
   ├─ Motor de proceso documental
   │    upload por sección/rol → estados → alertas → publicación
   │
   ├─ SIAP Chat (capa IA)
   │    normalize → sinónimos → detectar intent → handler → formatter
   │         │
   │         ├─ queries a BD (tramites, estados, fechas, responsables)
   │         ├─ sugerencias proactivas por rol
   │         ├─ explicación de estados / ayuda funcional
   │         └─ fallback + registro de unknown queries
   │
   ├─ Comparador documental (diff inteligente Word/PDF/Excel)
   ├─ Analítica / indicadores de calidad del flujo
   └─ Auto-learn (reentrenamiento de intents por frecuencia + confianza)
        │
        ▼
   [SQLite/PostgreSQL + storage de evidencias por rol]
```

| Componente | Tecnología |
|------------|------------|
| App | Python, Flask |
| IA conversacional | `siap_chat` (intents, router, handlers, formatter) |
| Aprendizaje | `SiapTrainingSystem` + `auto_learn_siap.py` |
| Datos | SQL (tramites/usuarios/alertas), migrable a PostgreSQL |
| Docs | carga por rol/carpeta, comparación `difflib` + extractores Office/PDF |
| Auth | sesiones + roles + bcrypt |
| UX IA | chat + sugerencias + análisis de indicadores |

---

## 5. Capa FULL IA — detalle técnico

### A. NLU / Intent detection

Pipeline conversacional:

1. **Normalización** de texto (minúsculas, puntuación, acentos)  
2. **Sinónimos inteligentes** (`solicitud/expediente/gestión → tramite`, etc.)  
3. **Matching de intents** contra catálogo de frases entrenadas  
4. Detección especial por **ID de trámite** (patrones tipo `YYYY-N` o ID corto)  
5. Enrutamiento a **handler** específico  
6. **Formatter** de respuesta  
7. Si no hay match: **fallback** + log de consulta desconocida  

Esto permite lenguaje natural variado sin obligar al usuario a comandos rígidos.

### B. Catálogo de inteligencia (qué sabe hacer la IA)

#### Información operativa (grounded en BD)
- trámites pendientes  
- vencidos  
- próximos a vencer (umbral configurable)  
- en revisión  
- estado por ID  
- desempeño del mes / comparativos  
- ranking de gestores  
- carga actual por proceso  

#### Acción asistida
- recomendar prioridades (“¿qué atiendo primero?”)  
- generar/ dispara reportes  
- programar alertas  
- enviar resúmenes  

#### Conocimiento de proceso
- explicar estados SGI/BIT (`¿qué significa Publicado en el Bit…?`)  
- ayuda funcional (“cómo creo un trámite”)  
- conceptos SGI  

#### Proactividad
- sugerencias inteligentes por rol y contexto temporal  
- alertas de vencidos / por vencer  
- orientación de productividad según carga real  

#### Calidad / analítica
- cuántos trámites necesitaron modificación  
- interpretación de % de retrabajo (señales de calidad del proceso inicial)  
- insights automáticos según umbrales  

### C. IA proactiva por rol (no genérica)

| Rol | Qué anticipa la IA |
|-----|--------------------|
| Gestor | sus pendientes, vencidos, próximo paso |
| Coordinador | visión de carga/vencidos del ámbito |
| Arquitecto | validaciones técnicas pendientes |
| Otros roles SGI | alertas y acciones según responsabilidad |

**Punch:** la misma pregunta cambia de respuesta según rol + datos.

### D. Aprendizaje continuo (ML operativo del asistente)

Sistema de entrenamiento automático:

- registra consultas no comprendidas (`unknown queries`)  
- detecta frecuencia (umbral, p. ej. 3+ repeticiones)  
- sugiere intent probable + calcula confianza  
- genera variantes naturales de la frase  
- agrega frases al intent si supera umbral de confianza  
- puede reentrenar/reiniciar el asistente en lote (`auto_learn_siap`)  

Métricas de diseño documentadas del módulo IA:
- reconocimiento de sugerencias con múltiples variaciones naturales  
- confianza alta en pruebas de matching (>85% en casos evaluados)  
- consultas a BD orientadas a respuesta en tiempo interactivo  

**Punch:** SIAP no se queda congelado; **aprende del uso real**.

### E. Comparación documental inteligente

Módulo de IA/algorítmica sobre documentos del flujo:

- extracción de texto Word / PDF / Excel  
- comparación por diferencias (`difflib`)  
- apoyo a revisión de cambios antes de publicar  
- historial/temporal de comparaciones  

Esto conecta IA con el cuello de botella de calidad: **ver qué cambió**.

### F. Analítica con interpretación (IA de decisión)

Ejemplo entrenado de alto valor:

> “¿Cuántos trámites necesitaron modificación?”

La IA no solo cuenta:  
consulta estado final → calcula cantidad/% → interpreta calidad del proceso → recomienda lectura estratégica (alto/normal/bajo retrabajo).

Eso es **IA para decisión**, no solo retrieval.

---

## 6. Capa de automatización de proceso (el “suelo” de la IA)

Sin este suelo, la IA no tendría qué decidir.

### Flujo documental automatizado
- creación/carga de trámites y evidencias por rol  
- carpetas/secciones por actor del flujo  
- máquina de estados del trámite (revisión, devolución, publicación, etc.)  
- alertas de vencimiento y confirmación de alertas  
- tableros de inicio con trámites en riesgo  
- notificaciones por correo  
- publicación hacia ecosistema documental (BIT/SGI)  
- indicadores de estado final y calidad  

### Roles del proceso
Gestor · Coordinador SGI · Arquitecto · Líder / Mejora · Documentos SGI (y variantes del flujo)

**Relación clave:**  
la automatización genera datos limpios;  
la IA los vuelve **interfaz conversacional + priorización + insight**.

---

## 7. Cómo reduce tiempos (full IA + automatización)

| Antes | Con SIAP | Efecto |
|-------|----------|--------|
| Preguntar a alguien el estado | NLU + query por ID/estado | segundos |
| Revisar bandeja manual de vencidos | intent `tramites_vencidos` / proactivo | priorización inmediata |
| No saber qué hacer hoy | `recomendar_prioridades` + sugerencias | menos parálisis operativa |
| Comparar docs a ojo | comparador automático | revisión más rápida |
| Dudas repetidas de estados | explicación de estados + ayuda | menos interrupciones |
| Retrabajo invisible | analítica de “publicados con modificaciones” | decisión de mejora de proceso |
| Entrenar FAQ a mano | auto-learn por frecuencia/confianza | mejora continua |

---

## 8. Stack y superficie técnica

| Pieza | Detalle |
|-------|---------|
| Backend | Flask + Python |
| IA chat | `siap_chat/` (`intents`, `router`, `handlers`, `formatter`) |
| Specs IA | catálogo de intents, matriz de permisos, templates de respuesta |
| Learning | `auto_learn_siap.py`, logs/summary de entrenamiento |
| Datos | tabla `tramites` + usuarios + `alertas_vistas` (+ ruta a PostgreSQL) |
| Docs AI | extractores docx/pdf/excel + diff |
| Seguridad | auth por rol, sesiones, bcrypt |
| Dependencias base | Flask, pandas, openpyxl, bcrypt, dotenv |

---

## 9. Por qué este caso vende como FULL IA

| Audiencia | Qué ve |
|-----------|--------|
| Reclutador IA | NLU, intents, grounding en BD, learning loop, proactividad, analítica interpretativa |
| Cliente | “mi equipo pregunta en español y el sistema prioriza con datos reales” |
| Diferenciación vs BIT/SIMER | aquí la IA no es módulo satélite: **es la interfaz inteligente del proceso** |

### Frase de cierre

> SIAP demuestra IA aplicada de verdad: automatizo el flujo documental y encima construyo un asistente que entiende, consulta, prioriza, explica, compara y aprende para fortalecer la decisión.

### Tríada del portafolio

| Producto | Promesa |
|----------|---------|
| **SIMER** | priorización estratégica + seguimiento + inteligencia de indicadores |
| **BIT 2.0** | SGI documental/monitoreo + automatización + IA de reuniones |
| **SIAP** | **Sistema Inteligente de Apoyo a Procesos** — full IA sobre trámites documentales (NLU + proactividad + learning) |

---

## 10. Piezas visuales recomendadas (sanitizadas)

1. Diagrama: usuario → NLU → intent → BD → respuesta  
2. Chat respondiendo pendientes/vencidos (datos dummy)  
3. Sugerencias proactivas por rol  
4. Explicación de un estado del flujo  
5. Comparador de documentos (diff)  
6. Loop de auto-aprendizaje (unknown → train → intent)  
7. Tablero de trámites + alertas  
8. Insight de “trámites con modificaciones”  

---

## Pitch 15 segundos (full IA)

> SIAP — Sistema Inteligente de Apoyo a Procesos: entiende lenguaje natural, consulta trámites reales, prioriza por rol, explica estados, compara documentos y aprende solo de las preguntas frecuentes.

---

## Nota de confidencialidad

Sin datos institucionales, sin usuarios reales, sin credenciales, sin documentos sensibles ni código fuente propietario.
