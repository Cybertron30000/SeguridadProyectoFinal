# Phishing Arena — Muestra inicial

Primera muestra local del beta: pantalla de inicio y nivel 1. Permite revisar el diseño, responder al primer correo y consultar una explicación. Los cinco niveles completos y la publicación en GitHub Pages siguen pendientes.

## Abrir la muestra

Abre `index.html` en tu navegador. No necesita instalación ni conexión a Internet.

También puedes servir esta carpeta con un servidor estático. En PyCharm, abre `index.html` usando la opción de abrir en el navegador.

## Qué probar

1. Pulsa «Inicio» y comprueba la secuencia 1, 2, 3.
2. Revisa el correo de la parte superior y elige una respuesta en la parte inferior.
3. La respuesta correcta es «Errores ortográficos y datos sospechosos».
4. Comprueba la explicación, el tiempo de respuesta y el repaso del correo.
5. Usa «Intentar de nuevo» para probar una respuesta incorrecta o dejar agotar los 30 segundos.
6. Usa «Salir» para volver al inicio.
7. Repite el recorrido en una ventana estrecha y usando el teclado.

## Archivos

- `index.html`: pantallas, ilustración vectorial y correo provisional.
- `styles.css`: diseño y adaptación a móvil.
- `app.js`: cuenta regresiva, temporizador, evaluación y reinicio.
- `ETAPAS.md`: plan de la versión beta y progreso.
- `tests/level-one.test.cjs`: comprobaciones de lógica con DOM simulado y reloj controlado.

## Comprobaciones

Con Node.js disponible, ejecuta desde esta carpeta:

```bash
node --check app.js
node --test tests/level-one.test.cjs
```

Estas comprobaciones cubren la lógica de la muestra. La revisión visual y de interacción en navegador debe realizarse por separado.
