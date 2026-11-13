// Comprueba las transiciones de la muestra con un DOM mínimo y un reloj controlado.
// No sustituye la revisión visual y de interacción en un navegador real.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");

function setup() {
  let now = 0;
  let nextId = 0;
  let selected = null;
  const tasks = new Map();
  const elements = new Map();
  const listeners = {};
  for (const match of html.matchAll(/id="([^"]+)"/g)) {
    const classes = new Set();
    elements.set(`#${match[1]}`, {
      hidden: false, textContent: "", disabled: false, listeners: {},
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
      },
      addEventListener(name, fn) { this.listeners[name] = fn; },
      setAttribute() {}, focus() {}, scrollIntoView() {},
      reset() { selected = null; },
      querySelector() { return selected; },
    });
  }
  const get = id => {
    assert.ok(elements.has(id), `Existe ${id} en el HTML`);
    return elements.get(id);
  };
  function schedule(fn, delay, repeat = false) {
    const id = ++nextId;
    tasks.set(id, { fn, at: now + delay, delay, repeat });
    return id;
  }
  vm.runInNewContext(script, {
    document: { querySelector: get, addEventListener: (name, fn) => { listeners[name] = fn; } },
    window: { scrollTo() {} }, performance: { now: () => now },
    setTimeout: (fn, delay) => schedule(fn, delay),
    setInterval: (fn, delay) => schedule(fn, delay, true),
    clearTimeout: id => tasks.delete(id), clearInterval: id => tasks.delete(id),
  });
  function advance(ms) {
    const target = now + ms;
    while (true) {
      const next = [...tasks.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > target) break;
      const [id, task] = next;
      now = task.at;
      if (task.repeat) task.at += task.delay;
      else tasks.delete(id);
      task.fn();
    }
    now = target;
  }
  return {
    get, advance,
    click: id => get(id).listeners.click(),
    start() { get("#start-button").listeners.click(); advance(3000); },
    answer(value) {
      selected = value ? { value } : null;
      get("#answer-form").listeners.change();
      get("#answer-form").listeners.submit({ preventDefault() {} });
    },
    background(ms) { now += ms; listeners.visibilitychange(); },
  };
}

test("Cuenta 1, 2, 3 y abre el nivel con 30 segundos", () => {
  const ui = setup();
  ui.click("#start-button");
  assert.equal(ui.get("#countdown-number").textContent, 1);
  ui.advance(1000);
  assert.equal(ui.get("#countdown-number").textContent, 2);
  ui.advance(1000);
  assert.equal(ui.get("#countdown-number").textContent, 3);
  ui.advance(1000);
  assert.equal(ui.get("#game").hidden, false);
  assert.equal(ui.get("#timer").textContent, "00:30");
  assert.equal(ui.get("#submit-answer").disabled, true);
});

test("Respuesta correcta muestra explicación y detiene el reloj", () => {
  const ui = setup();
  ui.start(); ui.advance(2400); ui.answer("spelling");
  assert.equal(ui.get("#result-title").textContent, "¡Nivel 1 superado!");
  assert.equal(ui.get("#result").hidden, false);
  assert.equal(ui.get("#answer-form").hidden, true);
  const response = ui.get("#response-time").textContent;
  const timer = ui.get("#timer").textContent;
  ui.advance(60000);
  assert.equal(ui.get("#response-time").textContent, response);
  assert.equal(ui.get("#timer").textContent, timer);
});

for (const option of ["password", "link"]) {
  test(`La opción incorrecta ${option} termina el intento`, () => {
    const ui = setup(); ui.start(); ui.answer(option);
    assert.equal(ui.get("#result-title").textContent, "Esta señal no es la correcta");
    assert.equal(ui.get("#answer-form").hidden, true);
  });
}

test("Agotar 30 segundos termina la partida", () => {
  const ui = setup(); ui.start(); ui.advance(30000);
  assert.equal(ui.get("#timer").textContent, "00:00");
  assert.equal(ui.get("#result-title").textContent, "Se agotó el tiempo");
  ui.answer("spelling");
  assert.equal(ui.get("#result-title").textContent, "Se agotó el tiempo");
});

test("No acepta una respuesta sin selección", () => {
  const ui = setup(); ui.start(); ui.answer(null);
  assert.equal(ui.get("#result").hidden, true);
  assert.equal(ui.get("#submit-answer").disabled, true);
});

test("Reintentar reinicia selección, resultado y tiempo; Salir vuelve al inicio", () => {
  const ui = setup(); ui.start(); ui.advance(5000); ui.answer("password");
  ui.click("#retry-button"); ui.advance(3000);
  assert.equal(ui.get("#timer").textContent, "00:30");
  assert.equal(ui.get("#result").hidden, true);
  assert.equal(ui.get("#answer-form").hidden, false);
  assert.equal(ui.get("#submit-answer").disabled, true);
  ui.answer("spelling"); ui.click("#exit-button");
  assert.equal(ui.get("#home").hidden, false);
  assert.equal(ui.get("#game").hidden, true);
});

test("Volver de una pestaña inactiva respeta el tiempo transcurrido", () => {
  const ui = setup(); ui.start(); ui.background(35000);
  assert.equal(ui.get("#result-title").textContent, "Se agotó el tiempo");
  assert.equal(ui.get("#timer").textContent, "00:00");
});

test("El correo no contiene enlaces ni botones funcionales", () => {
  const email = html.match(/<article class="email"[\s\S]*?<\/article>/)[0];
  assert.doesNotMatch(email, /<(a|button)\b/i);
  for (const resource of html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)) {
    assert.ok(fs.existsSync(path.join(root, resource[1])), `Existe ${resource[1]}`);
  }
});
