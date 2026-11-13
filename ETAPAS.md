# Phishing Arena — Etapas del proyecto
# Phishing Arena — Etapas del proyecto

## Objetivo de la primera versión

Crear un beta-test web para probar el recorrido y la mecánica de Phishing Arena. Se desarrollará con HTML, CSS y JavaScript y será compatible con GitHub Pages.

El jugador representa a una persona del cuerpo universitario que revisa correos y necesita reconocer el phishing sin detenerse demasiado en cada mensaje.

**Estado actual:** primera muestra implementada por indicación del usuario: pantalla de inicio y nivel 1. El desarrollo de los demás niveles continúa pendiente.

## Reglas que debe cumplir el beta

- Cada partida tiene cinco niveles y presenta un solo correo por nivel.
- Antes del primer nivel se muestra la secuencia 1, 2, 3.
- Cada nivel comienza con 30 segundos. El temporizador se pausa durante las explicaciones.
- En los niveles 1–3 se informa que el correo es falso y se selecciona una única señal principal.
- En los niveles 4–5 se clasifica el correo como verdadero o falso. Si es falso, también debe acertarse la señal principal; si es verdadero, no se solicita una señal.
- Una respuesta incorrecta o el agotamiento del tiempo termina la partida.
- Una respuesta correcta muestra una explicación. Al continuar comienza el siguiente nivel.
- Completar los cinco niveles muestra una celebración y una explicación final de lo aprendido.
- Al terminar se muestra el tiempo de respuesta y un repaso de los correos vistos. Las explicaciones no cuentan como tiempo de respuesta.
- La derrota incluye una explicación y los botones «Salir» e «Intentar de nuevo».
- Los enlaces y botones representados dentro de los correos son visuales y no tienen destino funcional.
- No se añaden puntuación, cuentas, clasificaciones, niveles, correos ni selección aleatoria.

## Referencia visual

Imagen: `/home/sgrimaldo/Documents/Unidocs/SeguridadDeRedes/est .png`.

Conservar su fondo gris muy claro, tarjeta central blanca con bordes redondeados, texto azul oscuro, etiquetas pequeñas para nivel y temporizador, separación entre encabezado, asunto y cuerpo del correo, opciones en recuadros y botones sencillos.

La referencia define el estilo. Sus valores antiguos de 60 segundos, tres correos y selección múltiple no forman parte de las reglas actuales.

## Etapa 1 — Acordar el diseño y el contenido

**Trabajo previsto**

- Definir las pantallas: principal, presentación, cuenta regresiva, correo, explicación, derrota y victoria.
- Organizar el recorrido: principal → presentación → cuenta regresiva → niveles y explicaciones → resultado.
- Conservar los correos provisionales y las señales principales del Prompt 2 proporcionado por el usuario.
- Propuesta inicial: usar las variantes falsas de los niveles 4 y 5 y reemplazarlas manualmente por las legítimas durante la revisión.
- Definir las opciones de respuesta sin añadir pistas al contenido de los correos.

**Revisión para cerrar la etapa**

- Comprobar que todas las reglas tienen una pantalla o un comportamiento previsto.
- Confirmar que cada partida presenta cinco correos en total, uno por nivel.
- Revisar textos, opciones y explicaciones para evitar respuestas ambiguas.
- Resolver antes de implementar la variante falsa del nivel 5 qué dominio aparente y qué destino ficticio se mostrarán: el prompt describe la diferencia, pero no proporciona esas dos direcciones.

**Resultado esperado:** diseño del recorrido y contenido acordados con el usuario.

## Etapa 2 — Preparar la base del sitio

**Trabajo previsto, cuando se autorice programar**

- Crear la estructura de HTML, CSS, JavaScript y recursos dentro de esta carpeta.
- Preparar rutas relativas compatibles con GitHub Pages.
- Aplicar el estilo de la imagen de referencia y adaptar la disposición a computadora y móvil.

**Revisión para cerrar la etapa**

- Abrir la página y comprobar que carga sus estilos y recursos.
- Revisar legibilidad, tamaños de controles y ausencia de desbordamiento horizontal.
- Confirmar que no requiere un servidor de aplicaciones ni Python para funcionar.

**Resultado esperado:** base visual navegable para incorporar el juego.

## Etapa 3 — Construir el recorrido de entrada

**Trabajo previsto**

- Crear la página principal con logo y menú.
- Añadir la tarjeta de Phishing Arena con la idea de una caña de pescar y un correo como anzuelo.
- Mostrar una descripción breve al pasar el cursor o tocar la tarjeta.
- Crear la presentación del caso, las reglas y lo que se aprenderá.
- Conectar el botón de inicio con la secuencia 1, 2, 3.

**Revisión para cerrar la etapa**

- Recorrer la entrada con mouse, teclado y controles táctiles.
- Verificar que la descripción se puede consultar en móvil.
- Comprobar que el primer temporizador empieza después de la cuenta regresiva.

**Resultado esperado:** el jugador comprende el juego y llega al primer correo.

## Etapa 4 — Implementar los niveles 1–3

**Trabajo previsto**

- Mostrar un correo falso por nivel y solicitar una única señal principal.
- Iniciar cada nivel con 30 segundos.
- Evaluar la respuesta y mostrar la explicación correspondiente.
- Pausar el tiempo en la explicación y avanzar mediante «Continuar».
- Terminar la partida ante un error o al agotarse el tiempo.

**Revisión para cerrar la etapa**

- Acertar cada nivel y comprobar el avance al siguiente.
- Equivocarse y comprobar que aparece la derrota con una explicación.
- Dejar vencer el tiempo y comprobar que la partida termina.
- Esperar en una explicación y verificar que no consume tiempo de respuesta.
- Confirmar que el siguiente nivel vuelve a 30 segundos.

**Resultado esperado:** los tres primeros niveles funcionan con sus correos provisionales.

## Etapa 5 — Implementar los niveles 4–5

**Trabajo previsto**

- Solicitar la clasificación verdadero/falso.
- Solicitar una señal cuando se clasifique el correo como falso.
- Exigir clasificación y señal correctas para superar un correo falso.
- Permitir superar un correo legítimo con la clasificación correcta, sin seleccionar señal.
- Mantener un solo correo por nivel y sustituir manualmente las variantes durante la revisión.

**Revisión para cerrar la etapa**

- Superar un correo falso acertando clasificación y señal.
- Comprobar que una clasificación incorrecta termina la partida.
- Comprobar que una señal incorrecta también termina la partida.
- Sustituir manualmente cada variante por la legítima y verificar que no exige señal.
- Revisar que el destino de enlace de la variante falsa del nivel 5 sea texto de maqueta, sin navegación.

**Resultado esperado:** ambos niveles admiten las variantes acordadas sin aleatoriedad.

## Etapa 6 — Completar resultados y reinicio

**Trabajo previsto**

- Mostrar derrota con explicación, «Salir» e «Intentar de nuevo».
- Mostrar victoria con celebración y explicación de lo aprendido.
- Mostrar el tiempo acumulado de respuesta y un repaso de los correos realmente vistos, tanto al ganar como al perder.
- Reiniciar nivel, respuestas, temporizador y registro de correos al intentar otra partida.
- Hacer que «Salir» regrese a la página principal.

**Revisión para cerrar la etapa**

- Completar los cinco niveles y comprobar la victoria.
- Perder en distintos niveles y comprobar que el repaso solo contiene correos vistos.
- Confirmar que el tiempo excluye la cuenta regresiva y las explicaciones.
- Usar «Intentar de nuevo» después de ganar o perder y comprobar que comienza una partida nueva.
- Usar «Salir» y comprobar el regreso a la página principal.

**Resultado esperado:** una partida completa se puede terminar, revisar y reiniciar.

## Etapa 7 — Revisar el beta completo

**Trabajo previsto**

- Ejecutar los ocho recorridos del Prompt 3.
- Revisar manualmente las variantes falsas y legítimas de los niveles 4–5, sin aumentar el número de niveles.
- Comparar la interfaz con la referencia visual.
- Revisar el funcionamiento en computadora y móvil.
- Corregir errores que impidan cumplir las reglas y registrar qué se comprobó.

**Criterios de aceptación**

- Cinco niveles y un correo por nivel.
- Treinta segundos al comenzar cada nivel.
- Explicaciones con temporizador pausado.
- Errores y tiempo agotado producen derrota.
- Los correos legítimos no requieren señal.
- La victoria muestra celebración, aprendizaje, tiempo y repaso.
- El reinicio permite jugar otra partida desde el principio.
- No aparecen las reglas antiguas de 60 segundos o tres correos por nivel.
- Ningún enlace representado dentro de los correos abre un destino.

**Resultado esperado:** primera versión lista para una prueba con el usuario.

## Etapa 8 — Publicar la versión beta en GitHub Pages

**Trabajo previsto**

- Documentar cómo abrir la versión local y cómo publicar el beta.
- Preparar el proyecto para alojarlo en un repositorio de GitHub y publicarlo con GitHub Pages.
- Revisar que todos los recursos usan rutas compatibles con la carpeta del proyecto en GitHub Pages.
- Publicar la versión beta revisada para que pueda probarse en el navegador.

**Revisión para cerrar la etapa**

- Comprobar la navegación y la carga de recursos desde una ruta de proyecto.
- Revisar el recorrido completo desde la URL publicada del beta.
- Confirmar que la versión publicada incluye los cambios de la revisión beta.

**Resultado esperado:** versión beta accesible en GitHub Pages para probarla en navegador. Esta etapa cubre la publicación del beta; el trabajo de una versión final queda fuera del alcance de este plan.

## Forma de trabajo

1. Acordar el diseño antes de programar.
2. Implementar cada etapa una vez autorizado el desarrollo.
3. Revisar sus criterios antes de avanzar y corregir los fallos encontrados.
4. Registrar lo revisado, el resultado y cualquier punto pendiente; una etapa no se considera comprobada solo por estar escrita en este documento.
5. Presentar al usuario el resultado de cada etapa para trabajar juntos sobre la primera versión.

## Registro inicial

- [x] Revisar la carpeta existente: no contiene archivos de aplicación.
- [x] Inspeccionar la imagen de referencia.
- [x] Crear la carpeta del proyecto y este plan de etapas.
- [ ] Acordar el diseño y resolver los detalles pendientes del contenido.
- [x] Recibir la indicación del usuario para comenzar con la pantalla de inicio y un nivel de ejemplo.
- [ ] Implementar y comprobar el beta.

## Avance — Pantalla de inicio y nivel 1

- [x] Crear título, explicación, ilustración de una caña con un correo y botón «Inicio».
- [x] Mostrar el correo arriba y las opciones de selección única debajo.
- [x] Incorporar el correo provisional del nivel 1 sin enlaces funcionales.
- [x] Implementar secuencia 1, 2, 3, temporizador de 30 segundos y explicación al responder.
- [x] Incorporar explicación, tiempo de respuesta, repaso, reintento y salida.
- [x] Comprobar la sintaxis de JavaScript y nueve casos de lógica con DOM simulado: cuenta inicial, respuesta correcta, dos incorrectas, tiempo agotado, selección vacía, reinicio y salida, pestaña inactiva y recursos/enlaces del correo.
- [x] Comprobar que el servidor estático responde con HTTP 200.
- [ ] Completar la comprobación visual e interacción en un navegador de computadora y móvil.
- [ ] Revisar esta muestra con el usuario antes de ampliar el juego.

Esta muestra termina después del primer correo y no representa la victoria de cinco niveles. La portada simplifica el recorrido para probar la pantalla solicitada; el menú y la tarjeta de acceso de la plataforma completa siguen pendientes.

Las nueve comprobaciones de lógica pasaron. La revisión visual queda pendiente porque no hay un navegador conectado disponible en esta sesión. Se puede abrir `index.html` directamente para revisar la muestra.
