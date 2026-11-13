"use strict";

const home = document.querySelector("#home");
const countdown = document.querySelector("#countdown");
const game = document.querySelector("#game");
const form = document.querySelector("#answer-form");
const submitButton = document.querySelector("#submit-answer");
const timer = document.querySelector("#timer");
const result = document.querySelector("#result");
const duration = 30_000;
let countdownTask = null;
let timerTask = null;
let startedAt = 0;
let active = false;

function stopTimers() {
  clearTimeout(countdownTask);
  clearInterval(timerTask);
  countdownTask = null;
  timerTask = null;
  active = false;
}

function showScreen(screen, heading) {
  for (const section of [home, countdown, game]) section.hidden = section !== screen;
  document.querySelector(heading).focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderTimer(remaining) {
  const seconds = Math.max(0, Math.ceil(remaining / 1000));
  timer.textContent = `00:${String(seconds).padStart(2, "0")}`;
  timer.setAttribute("aria-label", `Tiempo restante: ${seconds} segundos`);
  timer.classList.toggle("urgent", seconds <= 10);
}

function startLevel() {
  showScreen(game, "#game-title");
  startedAt = performance.now();
  active = true;
  renderTimer(duration);
  timerTask = setInterval(() => {
    const remaining = duration - (performance.now() - startedAt);
    renderTimer(remaining);
    if (remaining <= 0) finishLevel("timeout");
  }, 100);
}

function startSample() {
  stopTimers();
  form.reset();
  form.hidden = false;
  submitButton.disabled = true;
  result.hidden = true;
  result.className = "result";
  renderTimer(duration);
  let count = 1;
  document.querySelector("#countdown-number").textContent = count;
  showScreen(countdown, "#countdown-title");
  function nextCount() {
    if (count === 3) {
      startLevel();
      return;
    }
    count += 1;
    document.querySelector("#countdown-number").textContent = count;
    countdownTask = setTimeout(nextCount, 1000);
  }
  countdownTask = setTimeout(nextCount, 1000);
}

function finishLevel(outcome) {
  if (!active) return;
  const elapsed = Math.min(duration, Math.max(0, performance.now() - startedAt));
  stopTimers();
  renderTimer(duration - elapsed);
  const success = outcome === "correct";
  const title = success ? "¡Nivel 1 superado!" : outcome === "timeout" ? "Se agotó el tiempo" : "Esta señal no es la correcta";
  document.querySelector("#result-label").textContent = success ? "MUESTRA COMPLETADA" : "PARTIDA TERMINADA";
  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-message").textContent = success
    ? "Reconociste la señal principal. Aquí termina esta muestra del primer nivel."
    : outcome === "timeout"
      ? "Los 30 segundos terminaron antes de enviar una respuesta. Revisa qué delata este correo."
      : "La opción seleccionada no identifica la señal principal de este mensaje. Revisa la explicación e inténtalo de nuevo.";
  document.querySelector("#response-time").textContent = `${(elapsed / 1000).toLocaleString("es", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;
  result.classList.add(success ? "success" : "failure");
  form.hidden = true;
  result.hidden = false;
  document.querySelector("#result-title").focus({ preventScroll: true });
  result.scrollIntoView({ block: "start", behavior: "instant" });
}

document.querySelector("#start-button").addEventListener("click", startSample);
document.querySelector("#retry-button").addEventListener("click", startSample);
document.querySelector("#exit-button").addEventListener("click", () => {
  stopTimers();
  showScreen(home, "#home-title");
});

form.addEventListener("change", () => {
  submitButton.disabled = !form.querySelector('input[name="signal"]:checked');
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!active) return;
  if (performance.now() - startedAt >= duration) {
    finishLevel("timeout");
    return;
  }
  const selected = form.querySelector('input[name="signal"]:checked');
  if (selected) finishLevel(selected.value === "spelling" ? "correct" : "incorrect");
});

document.addEventListener("visibilitychange", () => {
  if (active && performance.now() - startedAt >= duration) finishLevel("timeout");
});
