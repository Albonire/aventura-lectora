# Aventura lectora

Prototipo web de una experiencia gamificada de comprensión lectora para los 13 estudiantes de 5.º de primaria de la Institución Educativa Jorge Eliécer Gaitán (sector oficial rural), en Maripí, Boyacá, Colombia. Los niños son detectives de la lectura: recorren seis partes cortas, ganan cuatro medallas para su álbum y reciben un diploma.

Docentes autoras: Luz Marina Castillo Cuadrado e Ingrid Yuliana González Flores.

Universidad Santo Tomás, Sede Principal | Maestría en Tecnología e Innovación Educativa (2026). Espacio académico: Gamificación (Tecnología Educativa) | Docente: Gustavo Alberto Orozco Bohórquez. Asesora de proyecto de grado: Marcela Zambrano. Fase de diseño y planificación, Actividad 2.2: Prototipado.

## La ruta

| Estación | Qué pasa | Recompensa |
|---|---|---|
| 00 Inicio: Entra al club de detectives | Conocer a Sofía y a Mateo, pista de prueba, tarjeta de detective | Tarjeta y álbum de medallas |
| 01 Misión 1: Leo con calma | Cuento y receta del campo (nivel literal) | Lupa de Bronce |
| 02 Misión 2: Pistas y "Cuéntame, abuelo" | Relato y reto familiar (nivel inferencial) | Lupa de Plata |
| 03 Misión 3: ¿Verdad o chisme? | Dos mensajes del celular (nivel crítico) | Detector de Verdades |
| 04 Reto final: Mi voz cuenta en Maripí | Torre de ideas guiada | Voz de Detective |
| 05 Final: ¡Caso resuelto! | Álbum de medallas, historia de la familia y diploma | Diploma de Detective Lector |

Cada misión tiene los mismos cuatro pasos: abrir el caso, seguir las pistas, entrenar la lupa y cerrar el caso.

## Comandos

```bash
pnpm install
pnpm dev          # servidor de desarrollo en http://localhost:3000
pnpm build        # sitio estático en dist/
pnpm preview      # sirve dist/
pnpm test         # pruebas unitarias (Vitest)
pnpm test:e2e     # pruebas de humo, accesibilidad y recorrido (Playwright y axe)
pnpm contenido    # regenera CONTENIDO.md desde los archivos de datos
pnpm lint
```

Requiere Node 22.12 o superior y pnpm. La primera vez que se corren las pruebas e2e hay que instalar el navegador: `pnpm exec playwright install chromium`.

## Publicar en Vercel

1. En Vercel: Add New, Project, importar este repositorio de GitHub.
2. Vercel detecta Astro solo (el archivo `vercel.json` ya lo indica).
3. Deploy. Probar la URL en una ventana privada y en un celular.

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Institución, población, autoras y datos académicos | `src/config/sitio.ts` |
| Las 6 estaciones, los 4 pasos y el orden del recorrido | `src/config/paginas.ts` |
| Misión, guía, estrategias, aprendizajes y DBA de cada misión | `src/content/unidades/unidad_N.mdx` |
| Estructura de cada paso de una misión | `src/content/paginas/unidad_N/{abrir,pistas,lupa,cerrar}.mdx` |
| Lecturas, preguntas, pistas de Sofía y clasificaciones | `src/data/actividades/unidad_N.json` |
| Relato de apertura y pista de prueba | `src/data/agencia.json` |
| Insignias y las tareas que las desbloquean | `src/lib/insignias.ts` |
| Diagnóstico y ajustes tras el pilotaje | `src/data/prototipado.ts` |
| Referencias y su estado de verificación | `src/data/referencias.ts` |
| Colores, radios y tipografía | `src/styles/design_tokens.css` |

Después de cambiar un texto de las estaciones, corre `pnpm contenido` para que `CONTENIDO.md` diga lo mismo.

## Cómo está hecho

- Astro con islas de React solo donde hay interacción. Sitio 100 % estático, liviano para celulares compartidos con pocos datos: sin videos ni recursos externos.
- Botón "Escuchar con voz pausada" en cada lectura y consigna (voz del navegador en español, a velocidad 0.9).
- Pistas graduadas de Sofía: una respuesta incorrecta muestra qué párrafo o frase volver a leer.
- Ficha imprimible "Libreta de campo de Mateo" (media carta) para los hogares sin datos móviles.
- Todo lo que escribe el estudiante se guarda solo en su navegador (`localStorage` con prefijo `aventura_lectora:`). Sin analítica, sin cookies de terceros y sin envío de datos.
- GSAP y ScrollTrigger solo en la tapa del libro, respetando `prefers-reduced-motion` y el interruptor "Movimiento".

## Documentos de trabajo

`SPECS.md` (especificación), `CONTENIDO.md` (textos de las estaciones), `RECURSOS.md` (referencias verificadas y recursos propios) y `CLAUDE.md` (reglas del proyecto). La carpeta `gemini_notebook/` guarda la guía de estilo de los personajes; no se publica.
