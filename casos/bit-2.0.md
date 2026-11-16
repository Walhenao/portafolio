# Caso BIT 2.0 — Versión técnica

## Biblioteca Integrada de Trabajo (BIT 2.0)  
### Plataforma SGI / Agente de Monitoreo  
**Documentos controlados · automatización de procesos · indicadores · riesgos · SAM · actas · IA**

**Producto:** sistema en uso institucional  
**Enfoque del caso:** profundidad técnica + reducción de tiempos + automatizaciones  
**Sin confidencial:** no incluye datos, credenciales, URLs internas ni código propietario

---

## Gancho técnico

BIT 2.0 es una plataforma full-stack que **automatiza el ciclo del Sistema de Gestión Integrado (SGI)**:

carga y gobierno documental → monitoreo por proceso (indicadores / riesgos / SAM) → generación de actas → notificaciones → IA sobre audio de reuniones.

No es un CMS. Es un **sistema de automatización de procesos de gestión** con API REST, tareas asíncronas, scheduler, conversiones documentales e IA (Faster-Whisper).

---

## 1. Qué resuelve (problema → automatización)

| Proceso manual (antes) | Automatización BIT 2.0 | Efecto |
|------------------------|------------------------|--------|
| Buscar versión vigente en carpetas/correo | Listado maestro + búsqueda + versionado + preview | Menos tiempo de consulta |
| Actualizar el mismo texto en decenas de docs | Cambios masivos async (lote + manifest + job) | Horas/días → minutos controlados |
| Armar acta trimestral a mano | Generador de actas desde estructura de secciones | Menos retrabajo post-reunión |
| Transcribir reunión y pasar a acta | MITRA: audio → texto (Whisper) → análisis | Acelera evidencia |
| Seguir indicadores/SAM/riesgos en Excel | Módulos API + UI por proceso | Una sola fuente operativa |
| Avisar por correo uno a uno | Cola de correos + Graph + plantillas | Notificación sin bloquear UI |
| Convertir Office para leer | LibreOffice headless → PDF + caché de preview | Consulta inmediata |

**Tesis del caso:**  
analizo y optimizo el proceso SGI; luego automatico carga, transformación, seguimiento y evidencia; después incorporo IA para reducir tiempo de consolidación y mejorar decisión.

---

## 2. Arquitectura técnica

```text
[Next.js 14 + TypeScript + React Query]
        │  HTTPS / JWT + refresh (httpOnly) / SSO NEXUS / 2FA
        ▼
[API FastAPI  /api/v1/*  + OpenAPI]
        │
        ├─ Dominio SGI: procesos, indicadores, mediciones, riesgos, SAM, actas
        ├─ Dominio documental: upload, storage, versionado, preview, permisos, listado maestro
        ├─ Automatización: BackgroundTasks + TareaAsincrona + APScheduler (America/Bogota)
        ├─ Mensajería: cola de correos + Microsoft Graph
        └─ IA MITRA: audio_converter → Faster-Whisper → analyzer → apoyo a actas
        │
        ▼
[PostgreSQL + storage versionado + caché de conversiones]
```

| Capa | Stack |
|------|--------|
| Frontend | Next.js 14, TypeScript, Tailwind, React Query, React Hook Form, Chart.js/Recharts, Playwright/Jest |
| Backend | Python 3.11, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Uvicorn |
| Datos | PostgreSQL 15 (migración histórica desde SQLite) |
| Jobs | `TareaAsincronaService` + `BackgroundScheduler` (APScheduler) |
| Docs | validación de upload, storage, LibreOffice headless, hash/integridad, preview cache |
| IA | Faster-Whisper (`ctranslate2`), pipeline MITRA de transcripción/análisis |
| Auth | JWT access/refresh, 2FA, SSO NEXUS/OIDC, rate limit, security headers, idle timeout |
| Ops | Docker, pipelines dev/QA, auditoría de escritura |

---

## 3. Mapa de capacidades técnicas (full)

### A. Carga y gobierno de documentos (pipeline)

Flujo técnico de carga:

1. **Upload** (`UploadFile`) con validación de tipo/tamaño  
2. Persistencia en **storage** versionado  
3. Metadatos en BD (`InformacionDocumentada` + relaciones proceso/categoría/tags)  
4. Cálculo de **integridad** (hash) para detectar cambios reales  
5. **Preview**: conversión Office → PDF (LibreOffice headless) + caché  
6. Exposición por API: listar / descargar / preview / historial / restaurar  
7. Estados de vigencia (vigente vs archivado/obsoleto con marca de agua)  
8. Permisos granulares (ver, descargar, editar, compartir, aprobar; permisos temporales)  

Capacidades asociadas:
- **Listado maestro** (consulta avanzada + export Excel + estadísticas)  
- **Traslado / eliminación controlada / reactivación** con tareas en background  
- **Compartir** vía cola asíncrona de correo (no bloquea request HTTP)  
- Auditoría de operaciones documentales  

**Valor vendible:** reduce tiempo de “encontrar + validar + distribuir” documento oficial.

### B. Automatización fuerte: cambios masivos

Motor de transformación documental a escala:

- orígenes de lote: documentos vigentes BIT **o** upload local (ZIP / archivos)  
- `manifest.json` del lote (inventario + parámetros)  
- procesamiento por **tarea asíncrona** (`tipo: cambios_masivos`)  
- búsqueda/reemplazo sobre Word/Excel/PPT  
- preview antes de aplicar  
- salida organizada por timestamp  
- auditoría de cambios masivos (quién, cuántos, errores, duración)  
- **scheduler** para ejecutar en fecha/hora (timezone Colombia) y recuperar jobs pendientes al reiniciar  

**Valor vendible:** automatización de proceso repetible que comprime tiempos de actualización institucional.

### C. Dominio SGI por proceso (API + reglas)

#### Procesos
- CRUD de procesos  
- roles asociados (líder, arquitecto, gestor, coordinaciones SGI/documentos/mejora)  
- eje de navegación del mapa de procesos  

#### Indicadores
- indicadores por proceso  
- **mediciones** con periodicidad (mensual → anual)  
- estados de medición: cumplimiento / alerta / crítico  
- base para tableros y actas de monitoreo  

#### Riesgos
- tipos: corrupción / proceso (+ fiscales cuando aplica)  
- controles (preventivo/detectivo/correctivo)  
- seguimientos de control  
- acciones e incidentes/eventos  

#### SAM (acciones de mejora / salidas)
- tipos: correctiva / preventiva / mejora  
- estados: abierta → en proceso → cerrada/cancelada  
- actividades con estados de cumplimiento/reprogramación  

**Valor vendible:** el monitoreo deja de ser Excel disperso y pasa a modelo de datos + API + UI.

### D. Actas de monitoreo (automatización de evidencia)

Generación estructurada de actas institucionales:

- tipos: `Proceso_Indicadores`, `Riesgos`, `Integral`, `Otros`  
- secciones JSONB: indicadores, SAM, info documentada, riesgos (proceso/corrupción/fiscales), otros  
- workflow: borrador → revisión → aprobación/rechazo  
- asistentes, secretario, aprobador  
- generadores Word con plantilla institucional (`acta_generator*`)  

**Valor vendible:** el output formal del monitoreo trimestral se produce desde datos ya cargados, no desde copia/pega.

### E. IA — módulo MITRA (técnico)

Pipeline:

```text
Audio reunión
  → audio_converter (normalización)
  → Faster-Whisper (ASR español, ctranslate2, 4–8x vs Whisper original)
  → analyzer (estructuración / extracción para seguimiento)
  → apoyo a consolidación de acta / resultados
```

Detalle técnico relevante:
- modelos Whisper configurables (`tiny` → `large-v2`)  
- balance default orientado a velocidad/precisión (`base`/`small`)  
- caché de modelos en disco  
- integración con flujo de actas de monitoreo  

**Valor vendible:** IA aplicada a un cuello de botella real (tiempo entre reunión y evidencia formal).

### F. Mensajería, búsqueda y operación

- cola de correos + Graph API (O365)  
- notificaciones de trámites / compartidos  
- búsqueda global  
- favoritos / estadísticas / métricas de performance  
- caché de servicios y stats de storage  
- directorio de equipos y módulos SGI de soporte documental  

---

## 4. Modelo de automatización (cómo se reduce tiempo)

```text
Entrada
  ├─ carga documentos (upload validado)
  ├─ mediciones de indicadores
  ├─ seguimientos de riesgos / SAM
  └─ audio de reunión (MITRA)

Procesamiento async
  ├─ TareaAsincrona (estado, progreso, reintento/programación)
  ├─ APScheduler (jobs diferidos + recuperación al boot)
  ├─ document_transformer / office_converter
  └─ cola de correos

Salida
  ├─ documento vigente + preview
  ├─ lote transformado auditado
  ├─ acta Word institucional
  ├─ alertas/notificaciones
  └─ tablero/consulta para decisión
```

**Idea fuerza para clientes y reclutadores:**  
BIT no “digitaliza pantallas”; **instrumenta procesos** y les pone automatización + IA donde el tiempo se pierde.

---

## 5. Superficie API (visión técnica)

Prefijo: `/api/v1`

| Módulo | Ejemplos de capacidad |
|--------|------------------------|
| `/auth`, `/sso` | login, refresh, 2FA, NEXUS SSO |
| `/usuarios` | roles y gobierno de acceso |
| `/procesos` | eje del SGI |
| `/indicadores` + mediciones | seguimiento de desempeño |
| `/riesgos` + controles/acciones/eventos | gestión de riesgo |
| `/sams` + actividades | mejora continua |
| `/actas` + aprobar/rechazar/asistentes | evidencia formal |
| `/documentos` | CRUD, upload, preview, traslado, soft-delete controlado |
| `/listado-maestro` | consulta avanzada, versiones, export |
| `/sgi` | archivos por tipo, vigente, historial, compartir |
| `/search`, `/reportes`, `/estadisticas` | explotación |
| `/correos`, notificaciones | mensajería async |
| MITRA / actas generator | IA + documento formal |

Validación: Pydantic v2, paginación, filtros, códigos HTTP consistentes, OpenAPI/Swagger.

---

## 6. Seguridad (nivel producción)

- JWT corto + refresh en cookies httpOnly  
- 2FA  
- SSO institucional NEXUS  
- rate limiting  
- security headers middleware  
- CORS explícito  
- validación de uploads  
- sanitización en búsquedas (protección inyección)  
- auditoría de escrituras / cambios masivos  
- idle timeout en cliente  
- secrets management / credential validation helpers  

---

## 7. Impacto técnico-funcional (público)

- **Menos tiempo de consulta** documental (búsqueda + preview + vigencia)  
- **Menos tiempo de actualización** masiva de plantillas/documentos  
- **Menos tiempo de armado de actas** trimestrales  
- **Menos tiempo post-reunión** con transcripción/análisis IA  
- **Más trazabilidad** (quién cambió qué, cuándo, con qué resultado)  
- **Más calidad de decisión** al tener indicadores, riesgos, SAM y documentos en un solo sistema  

> Dato cualitativo de diseño del módulo documental: las actualizaciones masivas buscan ahorros del orden de **80–90% del tiempo** frente a edición manual documento por documento (según análisis interno del módulo; sin exponer métricas operativas confidenciales).

---

## 8. Rol técnico

- arquitectura full-stack del producto  
- modelado de dominio SGI (procesos, indicadores, riesgos, SAM, actas)  
- pipeline documental (upload → storage → preview → versionado → permisos)  
- motor de automatización (tareas async + scheduler + transformaciones)  
- generadores de actas  
- integración IA MITRA (Whisper)  
- seguridad, SSO y preparación de despliegue por ambientes  

---

## 9. Pitch técnico (15–20 s)

> BIT 2.0 es una plataforma FastAPI + Next.js que automatiza el SGI: carga y versiona documentos, corre indicadores/riesgos/SAM por proceso, genera actas, ejecuta cambios masivos con jobs asíncronos y usa Faster-Whisper para convertir reuniones en evidencia usable para decisión.

---

## 10. Piezas visuales técnicas (sanitizadas)

1. Diagrama de arquitectura (API + jobs + storage + IA)  
2. Secuencia upload → preview → vigencia  
3. Job de cambios masivos (estados de tarea)  
4. Modelo indicador → mediciones → estado  
5. SAM con actividades  
6. Acta generada (estructura, sin contenido sensible)  
7. Pipeline MITRA audio → texto → acta  
8. OpenAPI/Swagger (recorte)  

---

## Relación con la marca

**Procesos:** SGI y monitoreo trimestral modelados  
**Automatización:** uploads, masivos, scheduler, correos, actas  
**IA:** MITRA / Faster-Whisper  
**Decisión estratégica:** tableros + evidencia formal vigente y trazable  

---

## Nota de confidencialidad

Sin datos institucionales, sin credenciales, sin infraestructura interna, sin documentos reales, sin código fuente propietario.
