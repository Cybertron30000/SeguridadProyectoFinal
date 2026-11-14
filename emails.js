/* Correos ficticios de la Universidad Horizonte. Se incluyen con el juego. */
(function (root) {
  "use strict";
  const emails = [
    {
      id: "biblioteca-horario", kind: "real", initials: "BU",
      sender: "Biblioteca Universitaria", address: "biblioteca@uhorizonte.example",
      date: "Hoy, 8:15 a. m.", subject: "Horario de la biblioteca durante exámenes",
      body: ["Hola, comunidad universitaria:", "Durante la semana de exámenes, la biblioteca abrirá de lunes a viernes de 7:00 a. m. a 9:00 p. m. Las salas de estudio mantendrán el sistema habitual de reservas.", "Puedes consultar los horarios en el portal institucional o acercarte al mostrador de atención.", "Saludos,\nEquipo de Biblioteca"],
      explanation: "Es un aviso informativo de biblioteca@uhorizonte.example, dentro del dominio institucional de esta simulación. Describe un servicio habitual y permite consultar la información por el portal conocido; no solicita contraseñas, pagos ni descargas.",
      advice: "Consulta los avisos desde el portal que ya conoces si necesitas confirmarlos. El nombre del remitente, por sí solo, no demuestra quién envió el mensaje."
    },
    {
      id: "beca-verificacion", kind: "malicious", initials: "BE",
      sender: "Departamento de Becas", address: "becas@uhorizonte-beneficios.example",
      date: "Hoy, 8:32 a. m.", subject: "Último aviso: confirma tu beca antes de las 5:00 p. m.",
      body: ["Estimado estudiante:", "Tu beca está pendiente de verificación. Si no completas el proceso hoy antes de las 5:00 p. m., perderás el beneficio de este semestre.", "Ingresa con tu correo institucional y tu contraseña en el siguiente formulario para conservar tu beca.", "Departamento de Becas"],
      action: { label: "Conservar mi beca", destination: "https://uhorizonte-beneficios.example/verificar" },
      explanation: "El remitente usa uhorizonte-beneficios.example, distinto de uhorizonte.example. Además, amenaza con quitarte la beca y te dirige a un sitio externo para introducir la contraseña institucional. La presión y la solicitud de credenciales sostienen la clasificación de phishing.",
      advice: "Consulta el estado de tu beca entrando al portal habitual o contactando al departamento desde el directorio institucional."
    },
    {
      id: "clase-laboratorio", kind: "real", initials: "AC",
      sender: "Ana Castillo · Docente", address: "ana.castillo@uhorizonte.example",
      date: "Hoy, 9:05 a. m.", subject: "Material para la próxima práctica de redes",
      body: ["Hola, grupo:", "Ya está disponible la guía de la próxima práctica en el aula virtual, dentro de la sección Materiales de Seguridad de Redes.", "Entren al aula como lo hacen normalmente y revisen la primera página antes de la clase. Trabajaremos con los mismos equipos del laboratorio.", "Nos vemos en clase,\nAna Castillo"],
      explanation: "En este caso, el mensaje procede de una docente del dominio institucional y se refiere a una actividad de clase. Indica consultar el aula virtual por la vía habitual, sin pedir datos sensibles ni instalar programas.",
      advice: "Abrir el aula virtual desde tu acceso habitual evita depender de enlaces recibidos por correo."
    },
    {
      id: "codigo-acceso", kind: "malicious", initials: "TI",
      sender: "Mesa de Ayuda · Universidad Horizonte", address: "soporte@uhorizonte-validacion.example",
      date: "Hoy, 9:26 a. m.", subject: "Necesitamos tu código de acceso para cerrar un incidente",
      body: ["Buen día:", "Estamos cerrando un incidente en tu cuenta institucional. En unos minutos recibirás un código de seis dígitos en tu teléfono.", "Responde a este correo con ese código para que podamos validar el acceso. No abras otro caso: este procedimiento tiene prioridad.", "Mesa de Ayuda"],
      explanation: "Solicita que compartas un código de autenticación, que permitiría a otra persona completar un acceso a tu cuenta. El dominio uhorizonte-validacion.example tampoco es el institucional. Un código de verificación es un secreto, aunque quien lo pida se presente como soporte.",
      advice: "No compartas códigos de acceso. Verifica el incidente con la mesa de ayuda usando el contacto del directorio oficial."
    },
    {
      id: "factura-ejecutable", kind: "malicious", initials: "FA",
      sender: "Facturación Universitaria", address: "facturas@cobros-campus.example",
      date: "Hoy, 10:10 a. m.", subject: "Abre tu factura pendiente de matrícula",
      body: ["Estimado estudiante:", "Adjuntamos la factura pendiente de tu matrícula. Para visualizarla, descarga el archivo y ejecútalo en tu computadora.", "Si tu equipo muestra una advertencia, selecciona Ejecutar de todas formas. El documento utiliza nuestro nuevo visor de facturación.", "Departamento de Facturación"],
      attachment: "Factura_matricula.pdf.exe",
      explanation: "El archivo termina en .exe: es un ejecutable, aunque incluya .pdf en el nombre. El correo pide ejecutarlo e ignorar las advertencias del equipo. También llega desde cobros-campus.example, ajeno al dominio institucional. Son señales concretas de una posible distribución de malware.",
      advice: "Revisa la extensión completa del archivo y consulta las facturas desde el portal de pagos habitual. No ignores una alerta para abrir una supuesta factura."
    },
    {
      id: "recibo-pago", kind: "real", initials: "TE",
      sender: "Tesorería · Universidad Horizonte", address: "tesoreria@uhorizonte.example",
      date: "Hoy, 10:45 a. m.", subject: "Confirmación del pago registrado en el portal",
      body: ["Hola:", "El pago que realizaste en el portal estudiantil quedó registrado por B/. 45.00, correspondiente al uso del laboratorio de este semestre.", "Puedes revisar el comprobante ingresando al portal estudiantil por tu acceso habitual, en la sección Historial de pagos.", "Tesorería\nUniversidad Horizonte"],
      explanation: "El mensaje de esta simulación confirma un pago ya realizado y utiliza el dominio institucional. Remite al historial del portal habitual para comprobarlo; no exige transferir dinero, responder con datos bancarios ni abrir archivos.",
      advice: "Un correo sobre dinero no es automáticamente fraudulento. Comprueba que el movimiento coincida con tus operaciones desde el portal conocido."
    },
    {
      id: "pago-reserva", kind: "malicious", initials: "RE",
      sender: "Registro Académico", address: "registro@uhorizonte-matriculas.example",
      date: "Hoy, 11:12 a. m.", subject: "Tu cupo se libera hoy: transfiere la reserva",
      body: ["Hola, estudiante:", "Tu cupo del próximo semestre será liberado si no recibimos la reserva de B/. 75.00 durante la próxima hora.", "El portal de pagos está temporalmente fuera de servicio. Transfiere a la cuenta personal de Carlos Méndez, 000-123-456, y responde con una foto de tu identificación y del comprobante.", "No contactes a Tesorería: esta reserva se procesa únicamente por correo.\nRegistro Académico"],
      explanation: "El correo cambia el canal de pago a una cuenta personal, presiona con un plazo corto y pide una foto de tu identificación. Además, intenta impedir la consulta con Tesorería y usa uhorizonte-matriculas.example, un dominio distinto del oficial. Busca desviar dinero y obtener datos personales.",
      advice: "Confirma los cobros directamente con Tesorería antes de pagar y usa los canales institucionales que ya conoces."
    },
    {
      id: "mantenimiento-portal", kind: "real", initials: "TI",
      sender: "Tecnología · Universidad Horizonte", address: "tecnologia@uhorizonte.example",
      date: "Hoy, 11:40 a. m.", subject: "Mantenimiento programado del aula virtual",
      body: ["Buen día, comunidad universitaria:", "El aula virtual estará en mantenimiento el sábado de 10:00 p. m. a 11:00 p. m. Durante ese periodo no se podrán entregar actividades.", "Les recomendamos organizar las entregas con anticipación. El servicio se restablecerá al finalizar la ventana de mantenimiento.", "Equipo de Tecnología\nUniversidad Horizonte"],
      explanation: "Es un aviso de mantenimiento desde el dominio institucional de esta simulación. Informa un horario y una consecuencia concreta del servicio; no pide validar la cuenta, revelar contraseñas ni descargar una herramienta.",
      advice: "Si necesitas confirmar el horario, consulta los avisos del portal o contacta a Tecnología por un canal conocido."
    }
  ];
  root.PHISHING_EMAILS = emails;
  if (typeof module !== "undefined" && module.exports) module.exports = emails;
})(typeof window !== "undefined" ? window : globalThis);
