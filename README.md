# Phishing Arena — La mesa de revisión

Un juego de práctica inspirado en la revisión de documentos con sellos: lee 8 correos ficticios de la Universidad Horizonte, clasifícalos como legítimos o maliciosos y descubre las explicaciones al terminar. Sin niveles ni límite de tiempo.

## Abrir el juego

Abre `index.html` en un navegador. No necesita instalación, servidor ni conexión a Internet. Todos los archivos, incluidos los correos, están en este proyecto.

## Cómo jugar

1. Pulsa **Abrir mi bandeja**.
2. Lee el correo y compara las direcciones con el dominio de referencia `uhorizonte.example`.
3. Pulsa un sello o arrástralo sobre el papel: **Correo legítimo** o **Correo malicioso**. También puedes usar Tab y Enter/Espacio.
4. La decisión queda guardada; pulsa **Siguiente correo** para continuar. Un error no termina la ronda.
5. Después del octavo, pulsa **Ver mis respuestas**: verás tu decisión, la clasificación correcta, las señales y un consejo de cada correo.
6. Usa **Volver a jugar** para comenzar una ronda nueva.

Los enlaces y archivos representados en los correos son de muestra: no abren sitios ni descargan archivos. La selección de correos tiene orden fijo. Los aciertos se resumen al final, sin puntos durante la partida.

## Archivos

- `index.html`, `styles.css`: pantallas y diseño de escritorio con sellos; adaptación a móvil.
- `emails.js`: los 8 correos, sus clasificaciones y las explicaciones. Puedes editar aquí el contenido.
- `round.js`: estado de la ronda; impide duplicados y entrega el repaso solo al completar los ocho mensajes.
- `app.js`: presentación, controles, arrastre, accesibilidad y resultados.
- `favicon.svg`: icono local del juego.
- `ETAPAS.md`: planificación original, conservada como referencia histórica.
- `ETAPAS_PROPUESTA_NUEVA.md`: planificación vigente y registro del desarrollo.
- `tests/round.test.cjs`: comprobaciones de la ronda y su integración con un DOM mínimo.
- `.github/workflows/pages.yml`: comprobaciones y publicación automática tras cada subida a `main`.

## Comprobaciones

Con Node.js, desde esta carpeta:

```bash
node --check app.js
node --check emails.js
node --check round.js
node tests/round.test.cjs
```

Las comprobaciones de integración usan un DOM mínimo. La revisión visual y los gestos reales en escritorio y móvil deben comprobarse también en un navegador.

## GitHub y publicación

Repositorio: [Cybertron30000/SeguridadProyectoFinal](https://github.com/Cybertron30000/SeguridadProyectoFinal).

El contenido de esta carpeta corresponde a la raíz del repositorio remoto. Los correos se suben junto con el juego. El flujo de GitHub Actions comprueba la ronda y publica únicamente sus seis archivos de ejecución.

**Jugar en línea:** [Phishing Arena en GitHub Pages](https://cybertron30000.github.io/SeguridadProyectoFinal/).

GitHub Actions comprueba el juego y publica cada cambio subido a `main`. El flujo **Revisar y publicar Phishing Arena** también se puede iniciar manualmente desde Actions.

Referencia: [publicar GitHub Pages con un flujo de Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
