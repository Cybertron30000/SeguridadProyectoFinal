/* La corrección se muestra únicamente después de terminar los ocho correos. */
"use strict";
(() => {
  const $ = id => document.getElementById(id);
  const emails = window.PHISHING_EMAILS;
  const round = window.createPhishingRound(emails);
  const labels = { real: "Correo legítimo", malicious: "Correo malicioso" };
  let drag = null;
  let screen = "home";
  let suppressPointerClick = false;

  function announce(message) { $("announcer").textContent = message; }
  function showScreen(name, heading) {
    screen = name;
    for (const id of ["home", "game", "results"]) $(id).hidden = id !== name;
    $(heading).focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function paragraph(text, className) {
    const node = document.createElement("p");
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function fillBody(container, mail) {
    container.replaceChildren(...mail.body.map(text => paragraph(text)));
  }
  function fillExtras(container, mail) {
    container.replaceChildren();
    if (mail.attachment) {
      const attachment = document.createElement("div");
      attachment.className = "attachment";
      attachment.textContent = `▤ ${mail.attachment}`;
      container.append(attachment);
    }
    if (mail.action) {
      const action = document.createElement("span");
      action.className = "mail-action";
      action.textContent = mail.action.label;
      // El destino se muestra como texto; nunca abre un sitio desde el juego.
      const destination = paragraph("Destino del enlace: ", "link-destination");
      const address = document.createElement("span");
      address.textContent = mail.action.destination;
      destination.append(address);
      container.append(action, destination);
    }
  }
  function renderProgress() {
    $("progress").value = round.count;
    $("progress-label").textContent = `${round.count} de 8 revisados`;
    $("pending-count").textContent = 8 - round.count;
    $("file-stack").replaceChildren(...emails.map((_, i) => {
      const tab = document.createElement("span");
      tab.className = `file-tab${i < round.count ? " done" : ""}`;
      return tab;
    }));
  }
  function renderMail() {
    const mail = round.current;
    const number = String(round.index + 1).padStart(2, "0");
    $("mail-number").textContent = number;
    $("paper-number").textContent = `${number} / 08`;
    $("avatar").textContent = mail.initials;
    $("sender").textContent = mail.sender;
    $("address").textContent = mail.address;
    $("mail-date").textContent = mail.date;
    $("mail-subject").textContent = mail.subject;
    fillBody($("mail-body"), mail);
    fillExtras($("mail-extras"), mail);
    $("stamp-imprint").hidden = true;
    $("decision-receipt").hidden = true;
    for (const button of document.querySelectorAll(".stamp-button")) button.disabled = false;
    $("next-button").textContent = round.index === 7 ? "Ver mis respuestas →" : "Siguiente correo →";
    renderProgress();
  }
  function start() {
    cleanupDrag();
    round.reset();
    $("review-list").replaceChildren();
    renderMail();
    showScreen("game", "game-title");
    announce("Bandeja abierta. Correo 1 de 8. Tómate el tiempo que necesites.");
  }
  function classify(choice) {
    if (screen !== "game" || !round.answer(choice)) return;
    const imprint = $("stamp-imprint");
    imprint.className = `stamp-imprint ${choice}`;
    imprint.textContent = choice === "real" ? "LEGÍTIMO" : "MALICIOSO";
    imprint.hidden = false;
    for (const button of document.querySelectorAll(".stamp-button")) button.disabled = true;
    $("decision-label").textContent = `Lo clasificaste como ${labels[choice].toLowerCase()}.`;
    $("decision-receipt").hidden = false;
    renderProgress();
    announce(`Decisión guardada: ${labels[choice]}. ${round.count} de 8 correos revisados.`);
    $("next-button").focus({ preventScroll: true });
    $("decision-receipt").scrollIntoView({ behavior: "instant", block: "nearest" });
  }
  function renderResults() {
    const results = round.results();
    const correctCount = results.filter(result => result.correct).length;
    $("results-message").textContent = correctCount === 8
      ? "¡Excelente ojo! Acertaste los 8 correos. Repasa las señales que reconociste."
      : `Acertaste ${correctCount} de 8 correos. Cada respuesta es una oportunidad para afinar tu criterio. Veamos las señales.`;
    $("review-list").replaceChildren(...results.map(({ mail, choice, correct }, i) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const top = document.createElement("div");
      top.className = "review-top";
      const number = document.createElement("span");
      number.className = "review-number";
      number.textContent = `CORREO ${String(i + 1).padStart(2, "0")}`;
      const badge = document.createElement("span");
      badge.className = `review-badge${correct ? "" : " incorrect"}`;
      badge.textContent = correct ? "✓ ¡Bien visto!" : "↗ Una señal para aprender";
      top.append(number, badge);
      const title = document.createElement("h3");
      title.id = `review-${mail.id}`;
      title.textContent = mail.subject;
      card.setAttribute("aria-labelledby", title.id);
      const choices = document.createElement("div");
      choices.className = "review-choices";
      choices.append(paragraph(`Tu decisión: ${labels[choice]}`), paragraph(`Respuesta correcta: ${labels[mail.kind]}`));
      for (const p of choices.children) p.style.margin = "0";
      const lead = correct ? "¡Acertaste! " : "Esta vez se te escapó una señal. ";
      const original = document.createElement("details");
      original.className = "review-original";
      const summary = document.createElement("summary");
      summary.textContent = "Volver a leer el correo";
      const body = document.createElement("div");
      body.className = "mail-body";
      fillBody(body, mail);
      const extras = document.createElement("div");
      fillExtras(extras, mail);
      original.append(summary, body, extras);
      card.append(top, title, paragraph(`${mail.sender} · ${mail.address}`, "review-address"), choices,
        paragraph(lead + mail.explanation, "review-explanation"), paragraph(`Para la próxima: ${mail.advice}`, "review-advice"), original);
      return card;
    }));
    showScreen("results", "results-title");
    announce(`Ronda terminada. ${correctCount} de 8 respuestas correctas. Ya puedes revisar todas las explicaciones.`);
  }
  function cleanupDrag() {
    if (drag) drag.ghost?.remove();
    drag = null;
    $("mail-card").classList.remove("drop-target");
  }
  function insidePaper(x, y) {
    const bounds = $("mail-card").getBoundingClientRect();
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
  }
  for (const button of document.querySelectorAll(".stamp-button")) {
    button.addEventListener("click", event => {
      // Un arrastre cancelado fuera del papel no debe convertirse en un clic.
      if (suppressPointerClick && event.detail !== 0) { suppressPointerClick = false; return; }
      suppressPointerClick = false;
      classify(button.dataset.choice);
    });
    button.addEventListener("pointerdown", event => {
      if (event.button !== 0 || !event.isPrimary || button.disabled || screen !== "game") return;
      suppressPointerClick = false;
      drag = { pointerId: event.pointerId, choice: button.dataset.choice, startX: event.clientX, startY: event.clientY, button, ghost: null };
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener("pointermove", event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (!drag.ghost && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 8) {
        drag.ghost = button.querySelector(".stamp-tool").cloneNode(true);
        drag.ghost.classList.add("drag-ghost");
        drag.ghost.classList.add(drag.choice);
        drag.ghost.setAttribute("aria-hidden", "true");
        document.body.append(drag.ghost);
      }
      if (drag.ghost) {
        drag.ghost.style.left = `${event.clientX}px`;
        drag.ghost.style.top = `${event.clientY}px`;
        $("mail-card").classList.toggle("drop-target", insidePaper(event.clientX, event.clientY));
      }
    });
    button.addEventListener("pointerup", event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const wasDragged = Boolean(drag.ghost);
      const choice = drag.choice;
      const dropped = insidePaper(event.clientX, event.clientY);
      cleanupDrag();
      if (wasDragged) {
        suppressPointerClick = true;
        if (dropped) classify(choice);
        else announce("Suelta el sello sobre el correo para clasificarlo, o pulsa el sello.");
      }
    });
    button.addEventListener("pointercancel", () => { suppressPointerClick = true; cleanupDrag(); });
    button.addEventListener("lostpointercapture", cleanupDrag);
  }
  $("start-button").addEventListener("click", start);
  $("restart-button").addEventListener("click", start);
  $("home-button").addEventListener("click", () => showScreen("home", "home-title"));
  $("next-button").addEventListener("click", () => {
    if (screen !== "game" || !round.next()) return;
    if (round.finished) renderResults();
    else {
      renderMail();
      $("mail-subject").focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      announce(`Correo ${round.index + 1} de 8: ${round.current.subject}`);
    }
  });
})();
