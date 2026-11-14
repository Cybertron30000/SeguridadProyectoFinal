const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const emails = require("../emails.js");
const createRound = require("../round.js");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

test("La ronda tiene ocho correos únicos, cuatro de cada clase, con explicación", () => {
  assert.equal(emails.length, 8);
  assert.equal(new Set(emails.map(mail => mail.id)).size, 8);
  assert.equal(emails.filter(mail => mail.kind === "real").length, 4);
  assert.equal(emails.filter(mail => mail.kind === "malicious").length, 4);
  for (const mail of emails) {
    assert.ok(mail.explanation.length > 80);
    assert.ok(mail.advice.length > 30);
    assert.ok(mail.body.length >= 3);
  }
});

test("No permite avanzar sin responder, duplicar decisiones ni ver correcciones antes del final", () => {
  const round = createRound(emails);
  assert.equal(round.next(), false);
  assert.equal(round.answer("invalid"), false);
  assert.equal(round.answer("real"), true);
  assert.equal(round.answer("malicious"), false);
  assert.equal(round.count, 1);
  assert.deepEqual(round.results(), []);
  assert.equal(round.next(), true);
  assert.equal(round.index, 1);
});

test("Los ocho errores permiten terminar y el repaso conserva cada elección", () => {
  const round = createRound(emails);
  for (const mail of emails) {
    assert.equal(round.current.id, mail.id);
    assert.equal(round.answer(mail.kind === "real" ? "malicious" : "real"), true);
    assert.equal(round.next(), true);
  }
  assert.equal(round.finished, true);
  assert.equal(round.results().length, 8);
  assert.equal(round.results().filter(result => result.correct).length, 0);
  assert.equal(round.answer("real"), false);
  assert.equal(round.next(), false);
});

test("Reiniciar limpia tanto la ronda completa como una ronda parcial", () => {
  const round = createRound(emails);
  for (const mail of emails) { round.answer(mail.kind); round.next(); }
  assert.equal(round.results().filter(result => result.correct).length, 8);
  round.reset();
  assert.equal(round.index, 0);
  assert.equal(round.count, 0);
  assert.equal(round.finished, false);
  assert.deepEqual(round.results(), []);
  round.answer("malicious"); round.reset();
  assert.equal(round.answered, false);
  assert.equal(round.next(), false);
});

// DOM mínimo para comprobar la integración sin instalar dependencias.
// No sustituye la comprobación visual en un navegador.
function setupUI() {
  let focused = null;
  class Element {
    constructor(tag = "div") {
      this.tagName = tag; this.children = []; this.hidden = false; this.disabled = false;
      this.style = {}; this.dataset = {}; this.listeners = {}; this.attributes = {}; this.textContent = "";
      const classes = new Set();
      this.classList = { add: (...values) => values.forEach(v => classes.add(v)), remove: v => classes.delete(v), toggle: (v, on) => on ? classes.add(v) : classes.delete(v) };
    }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = nodes; }
    setAttribute(name, value) { this.attributes[name] = value; }
    addEventListener(name, listener) { this.listeners[name] = listener; }
    focus() { focused = this; }
    scrollIntoView() {}
    setPointerCapture() {}
    getBoundingClientRect() { return { left: 200, right: 800, top: 100, bottom: 800 }; }
    querySelector() { return new Element("span"); }
    cloneNode() { return new Element(this.tagName); }
    remove() {}
  }
  const elements = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], new Element()]));
  const buttons = [elements.get("real-button"), elements.get("malicious-button")];
  buttons.forEach((button, i) => button.dataset.choice = i === 0 ? "real" : "malicious");
  const document = {
    getElementById(id) { assert.ok(elements.has(id), `Existe #${id}`); return elements.get(id); },
    querySelectorAll(selector) { assert.equal(selector, ".stamp-button"); return buttons; },
    createElement: tag => new Element(tag), body: new Element("body")
  };
  const window = { PHISHING_EMAILS: emails, createPhishingRound: createRound, scrollTo() {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "app.js"), "utf8"), { document, window });
  return {
    get: id => elements.get(id),
    click(id, detail = 0) { elements.get(id).listeners.click({ detail }); },
    drag(id, x, y) {
      const button = elements.get(id);
      button.listeners.pointerdown({ button: 0, isPrimary: true, pointerId: 1, clientX: 50, clientY: 50 });
      button.listeners.pointermove({ pointerId: 1, clientX: x, clientY: y });
      button.listeners.pointerup({ pointerId: 1, clientX: x, clientY: y });
      if (!button.disabled) button.listeners.click({ detail: 1 });
    },
    get focused() { return focused; }
  };
}

test("La interfaz guarda ocho respuestas, muestra el repaso al final y reinicia", () => {
  const ui = setupUI();
  ui.click("start-button");
  assert.equal(ui.get("game").hidden, false);
  assert.equal(ui.get("results").hidden, true);
  for (let i = 0; i < emails.length; i++) {
    // Una combinación de aciertos y errores; no hay terminación por error.
    ui.click(i % 2 ? "malicious-button" : "real-button");
    assert.equal(ui.get("progress").value, i + 1);
    assert.equal(ui.get("review-list").children.length, 0);
    assert.equal(ui.focused, ui.get("next-button"));
    ui.click("real-button");
    assert.equal(ui.get("progress").value, i + 1);
    ui.click("next-button");
  }
  assert.equal(ui.get("results").hidden, false);
  assert.equal(ui.get("review-list").children.length, 8);
  assert.match(ui.get("results-message").textContent, /4 de 8/);
  assert.equal(ui.get("game").hidden, true);
  ui.click("restart-button");
  assert.equal(ui.get("progress").value, 0);
  assert.equal(ui.get("review-list").children.length, 0);
  assert.equal(ui.get("decision-receipt").hidden, true);
  assert.equal(ui.get("real-button").disabled, false);
});

test("Arrastrar fuera del papel no responde; soltar dentro guarda una sola decisión", () => {
  const ui = setupUI();
  ui.click("start-button");
  ui.drag("malicious-button", 110, 80);
  assert.equal(ui.get("progress").value, 0);
  ui.drag("real-button", 350, 300);
  assert.equal(ui.get("progress").value, 1);
  assert.equal(ui.get("stamp-imprint").textContent, "LEGÍTIMO");
});

test("Los recursos existen y los correos no incluyen navegación ni HTML ejecutable", () => {
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
  }
  assert.doesNotMatch(html, /id="(?:timer|countdown)"/);
  for (const mail of emails) for (const text of mail.body) assert.doesNotMatch(text, /<(?:a|script|button)\b/i);
});
