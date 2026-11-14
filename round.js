(function (root) {
  "use strict";
  function createRound(emails) {
    if (emails.length !== 8 || new Set(emails.map(mail => mail.id)).size !== 8) {
      throw new Error("La ronda necesita ocho correos con identificadores únicos.");
    }
    let index = 0;
    let answers = [];
    let finished = false;
    return {
      get current() { return emails[index]; },
      get index() { return index; },
      get answered() { return answers.length > index; },
      get finished() { return finished; },
      get count() { return answers.length; },
      answer(choice) {
        if (finished || answers.length > index || !["real", "malicious"].includes(choice)) return false;
        answers.push({ id: emails[index].id, choice });
        return true;
      },
      next() {
        if (finished || answers.length <= index) return false;
        if (index === emails.length - 1) finished = true;
        else index += 1;
        return true;
      },
      results() {
        if (!finished) return [];
        return emails.map((mail, i) => ({ mail, choice: answers[i].choice, correct: answers[i].choice === mail.kind }));
      },
      reset() { index = 0; answers = []; finished = false; }
    };
  }
  root.createPhishingRound = createRound;
  if (typeof module !== "undefined" && module.exports) module.exports = createRound;
})(typeof window !== "undefined" ? window : globalThis);
