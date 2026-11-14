# Phishing Arena — Propuesta nueva de etapas

> **Documento nuevo de planificación.** Esta propuesta recoge la dirección más reciente indicada por el usuario y se mantiene separada de `ETAPAS.md`, que conserva intacto el plan anterior. El usuario autorizó programar esta versión; su avance se registra al final de este documento.

## Dirección de esta propuesta

La referencia principal es el HTML de `sello.txt` y la captura compartida: el jugador recibe correos y los clasifica con sellos de **correo legítimo** o **correo malicioso**. La partida será una sola ronda de **8 correos**, sin niveles como sistema de progreso y sin límite de tiempo.

El jugador responde cada correo y sigue con el siguiente. Al terminar la ronda, verá todas sus respuestas junto con la clasificación correcta y una explicación breve de cada correo. Si acertó, la explicación tendrá un tono alegre de celebración; si falló, explicará si era legítimo o malicioso y por qué. El tiempo disponible no condiciona las respuestas ni el avance.

Se toman como referencia del `ETAPAS.md` original las reglas que siguen siendo pertinentes: correos ficticios en un contexto universitario, enlaces y botones de correo sin navegación funcional, una explicación que ayude a reconocer las señales y una revisión final de los mensajes presentados. Las reglas de niveles, cuenta regresiva, temporizador y derrota por error o tiempo agotado no aplican a esta propuesta.

La nueva versión sustituye la experiencia anterior del juego. El documento original `ETAPAS.md` se conserva como referencia histórica.

## Etapa 1 — Acordar el flujo y las reglas

**Trabajo previsto**

- Definir el recorrido: inicio breve → ronda de correos → resultado con revisión completa.
- Preparar exactamente 8 correos para la ronda.
- Definir los controles para clasificar cada mensaje como legítimo o malicioso, tomando como referencia los sellos físicos de la captura.
- Acordar cómo se avanza entre mensajes y cómo se indica el progreso de la ronda, sin presentarlo como niveles.
- Mantener cada correo dentro del juego: sus enlaces y botones son elementos de muestra, no navegación real.

**Revisión para cerrar la etapa**

- El jugador entiende qué debe decidir en cada correo.
- La secuencia no incluye vidas, desbloqueos, dificultad por niveles ni límite de tiempo.
- El resultado final contempla una explicación individual para cada respuesta.

**Resultado esperado:** reglas y recorrido definidos antes de programar.

## Etapa 2 — Preparar los correos de práctica

**Trabajo previsto**

- Diseñar una ronda equilibrada de 8 correos legítimos y maliciosos. La selección y redacción quedan a discreción del asistente cuando se trabaje esta etapa.
- Asegurar que cada mensaje tenga una clasificación defendible y señales comprensibles.
- Escribir para cada correo una explicación breve: qué lo hace legítimo o malicioso y qué señales lo justifican.
- Preparar para cada mensaje un texto de acierto y otro de error, con tono celebratorio al acertar y tono claro y amable al corregir.

**Revisión para cerrar la etapa**

- Las respuestas no dependen de adivinar ni contienen señales contradictorias.
- Los correos legítimos también parecen naturales y variados.
- La explicación enseña algo concreto sin revelar la respuesta antes de que el jugador decida.

**Resultado esperado:** contenido de la ronda y retroalimentación listos para incorporarse.

## Etapa 3 — Definir la interacción visual

**Trabajo previsto**

- Trasladar la idea de mesa de revisión, mensaje en papel y sellos de la referencia a la identidad visual del proyecto.
- Mostrar remitente, dirección, asunto y cuerpo del correo con jerarquía clara.
- Hacer que las dos decisiones sean fáciles de distinguir y activar con mouse, teclado y pantalla táctil.
- Adaptar el panel de sellos y el correo para pantallas pequeñas sin tapar el mensaje.
- Mostrar el avance como cantidad de correos revisados y pendientes.

**Revisión para cerrar la etapa**

- La acción de clasificar resulta visible e intuitiva.
- El correo se puede leer completo en móvil.
- Los controles tienen etiquetas accesibles y estados visibles.

**Resultado esperado:** diseño de interacción definido para escritorio y móvil.

## Etapa 4 — Implementar la ronda

**Trabajo previsto, cuando el usuario autorice programar**

- Reemplazar la experiencia anterior por el flujo acordado, conservando el proyecto como una página web sencilla.
- Presentar los correos uno por uno en el orden de la ronda.
- Registrar la clasificación elegida y evitar que un mismo mensaje se responda más de una vez.
- Avanzar al siguiente correo después de cada decisión, sin interrumpir la ronda por una respuesta incorrecta.
- No añadir temporizador ni cuentas. Mantener los 8 correos en orden fijo. Cualquier puntuación o mecánica adicional debe acordarse antes de implementarse.

**Revisión para cerrar la etapa**

- Se puede clasificar y revisar toda la ronda de principio a fin.
- Una respuesta incorrecta no impide completar los correos restantes.
- Se presentan exactamente 8 mensajes en el orden aprobado.
- No hay cuenta regresiva, temporizador ni derrota por tardar en responder.

**Resultado esperado:** ronda jugable de principio a fin.

## Etapa 5 — Implementar la retroalimentación final

**Trabajo previsto**

- Presentar un resultado final con cada correo, la respuesta del jugador, la clasificación correcta y su explicación.
- Celebrar cada acierto con un mensaje positivo y explicar cada error con claridad y sin tono punitivo.
- Facilitar la lectura del repaso completo, incluso en móvil.
- Ofrecer una acción para volver a jugar la ronda.

**Revisión para cerrar la etapa**

- El repaso incluye todos los correos y conserva las respuestas seleccionadas.
- Cada explicación corresponde al correo mostrado.
- Aciertos y errores se distinguen visualmente y también mediante texto.
- Volver a jugar reinicia las respuestas y el avance.

**Resultado esperado:** el jugador puede aprender de la ronda completa al terminar.

## Etapa 6 — Revisión integral, GitHub y publicación

**Trabajo previsto**

- Recorrer la ronda completa en escritorio y móvil.
- Revisar que la interfaz y los textos correspondan a la mecánica nueva.
- Corregir fallos de interacción, lectura o presentación de resultados.
- Mantener los datos de los 8 correos dentro del mismo repositorio que el juego, en un archivo local del proyecto (por ejemplo, `emails.json` o un módulo JavaScript).
- Configurar el proyecto para el repositorio de GitHub acordado y publicarlo con GitHub Pages.
- Después de cada cambio de programación o contenido, guardar la actualización en Git y subirla al repositorio remoto para mantenerlo al día.
- Comprobar que GitHub Pages despliega la versión actualizada desde el repositorio.

**Revisión para cerrar la etapa**

- La ronda se puede completar con mouse, teclado y controles táctiles.
- El resultado final coincide con cada decisión tomada.
- Los correos y el juego están incluidos en el mismo repositorio, sin depender de archivos locales externos.
- La página y sus recursos cargan correctamente desde la URL publicada en GitHub Pages.
- Los cambios subidos al repositorio se reflejan en la publicación.

**Resultado esperado:** versión revisada, guardada en GitHub y publicada en GitHub Pages.

## Estado de esta propuesta

- [x] Recibir la nueva dirección: clasificar correos con una mecánica inspirada en sellos.
- [x] Separar esta propuesta del documento original `ETAPAS.md`.
- [x] Fijar la ronda en 8 correos y quitar el límite de tiempo.
- [x] Añadir el requisito de guardar el juego y los correos juntos en GitHub, y actualizar el repositorio con cada cambio.
- [x] Definir el flujo: inicio, ocho correos con sellos y repaso al finalizar.
- [x] Preparar ocho correos ficticios con explicaciones y consejos en `emails.js`.
- [x] Recibir la autorización e implementar la nueva versión.
- [x] Identificar el repositorio remoto: `Cybertron30000/SeguridadProyectoFinal`.
- [x] Preparar el flujo de comprobación y despliegue en `.github/workflows/pages.yml`.
- [ ] Confirmar la habilitación de GitHub Pages y completar el despliegue.
- [ ] Revisar la ronda terminada y su publicación.

## Registro de implementación — 13 de noviembre de 2026

- Implementados el inicio, los 8 correos en orden fijo, los sellos por pulsación y arrastre y la revisión final completa.
- Cada decisión queda confirmada antes de avanzar; las correcciones se reservan hasta terminar la ronda. No hay temporizador ni derrota por error.
- Creados cuatro correos legítimos y cuatro maliciosos en contexto universitario; el archivo de contenido forma parte del proyecto y del repositorio.
- Implementados el reinicio, la navegación por teclado, los avisos accesibles y la adaptación mediante CSS a pantallas pequeñas.
- Comprobadas la sintaxis de los tres archivos JavaScript y siete casos de contenido, lógica e integración con un DOM mínimo, incluidos los ocho errores, reinicio y arrastre fuera/dentro del papel. Los siete casos pasaron.
- Retirada la prueba de la muestra anterior, que exigía niveles y temporizador, y sustituida por `tests/round.test.cjs`.
- El navegador conectado no está disponible en esta sesión. La revisión visual y los gestos en navegador real de escritorio/móvil quedan pendientes; las pruebas con DOM mínimo no sustituyen esa revisión.
- Preparado un flujo de GitHub Actions que comprueba la ronda y publica los archivos del juego en GitHub Pages. La publicación requiere que Pages esté habilitado para este repositorio.

**Estado actual:** nueva versión implementada y comprobada en lógica e integración. Revisión visual y confirmación de publicación pendientes.
