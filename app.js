const exams = window.PSYCH_EXAMS || [];
const essayQuestions = window.PSYCH_ESSAY_QUESTIONS || [];

const state = {
  selectedExamId: 1,
  activeExam: null,
  activeTab: "exam",
  essayFilter: "all",
  mode: "finish",
  currentIndex: 0,
  answers: {},
  checked: {},
  finished: false,
};

const els = {};

function $(selector) {
  return document.querySelector(selector);
}

function initializeElements() {
  els.topTabs = $("#topTabs");
  els.examTabButton = $("#examTabButton");
  els.essayTabButton = $("#essayTabButton");
  els.examGrid = $("#examGrid");
  els.startButton = $("#startExam");
  els.setup = $("#setupView");
  els.essay = $("#essayView");
  els.essayFilters = $("#essayFilters");
  els.essayGrid = $("#essayGrid");
  els.exam = $("#examView");
  els.results = $("#resultsView");
  els.modeRadios = [...document.querySelectorAll("input[name='answerMode']")];
  els.examTitle = $("#examTitle");
  els.examSubtitle = $("#examSubtitle");
  els.modeBadge = $("#modeBadge");
  els.progressText = $("#progressText");
  els.progressBar = $("#progressBar");
  els.scoreNow = $("#scoreNow");
  els.questionNav = $("#questionNav");
  els.questionCard = $("#questionCard");
  els.prevButton = $("#prevQuestion");
  els.nextButton = $("#nextQuestion");
  els.finishButton = $("#finishExam");
  els.backButton = $("#backToSetup");
  els.resetButton = $("#resetExam");
  els.resultScore = $("#resultScore");
  els.resultLabel = $("#resultLabel");
  els.resultMeta = $("#resultMeta");
  els.typeBreakdown = $("#typeBreakdown");
  els.sourceBreakdown = $("#sourceBreakdown");
  els.reviewList = $("#reviewList");
  els.newExamButton = $("#newExam");
  els.finishModal = $("#finishModal");
  els.finishSummary = $("#finishSummary");
  els.cancelFinishButton = $("#cancelFinish");
  els.confirmFinishButton = $("#confirmFinish");
}

function normalizeAnswer(value) {
  return String(value || "")
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9%]+/gi, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function isCorrect(question) {
  const answer = state.answers[question.id];

  if (question.type === "multiple") {
    return answer === question.answer;
  }

  const normalizedAnswer = normalizeAnswer(answer);
  if (!normalizedAnswer) {
    return false;
  }

  return question.acceptable.some((acceptable) => {
    const normalizedAcceptable = normalizeAnswer(acceptable);
    if (normalizedAnswer === normalizedAcceptable) {
      return true;
    }

    return (
      normalizedAcceptable.length >= 18 &&
      normalizedAnswer.length >= 6 &&
      normalizedAcceptable.includes(normalizedAnswer)
    );
  });
}

function hasAnswer(question) {
  const answer = state.answers[question.id];
  return typeof answer === "string" && answer.trim().length > 0;
}

function isRevealed(question) {
  return state.finished || Boolean(state.checked[question.id]);
}

function scoreExam() {
  const questions = state.activeExam?.questions || [];
  const breakdown = {
    total: questions.length,
    correct: 0,
    unanswered: 0,
    byType: {
      fill: { total: 0, correct: 0 },
      multiple: { total: 0, correct: 0 },
    },
    bySource: {},
  };

  for (const question of questions) {
    const correct = isCorrect(question);
    breakdown.byType[question.type].total += 1;

    if (!breakdown.bySource[question.source]) {
      breakdown.bySource[question.source] = { total: 0, correct: 0 };
    }
    breakdown.bySource[question.source].total += 1;

    if (!hasAnswer(question)) {
      breakdown.unanswered += 1;
    }

    if (correct) {
      breakdown.correct += 1;
      breakdown.byType[question.type].correct += 1;
      breakdown.bySource[question.source].correct += 1;
    }
  }

  breakdown.percent = Math.round((breakdown.correct / breakdown.total) * 100);
  return breakdown;
}

function performanceLabel(percent) {
  if (percent >= 90) return "Mükemmel";
  if (percent >= 80) return "Çok iyi";
  if (percent >= 70) return "İyi";
  if (percent >= 60) return "Temel seviye tamam";
  return "Tekrar çalışılmalı";
}

function renderExamGrid() {
  els.examGrid.innerHTML = exams
    .map((exam) => {
      const selected = exam.id === state.selectedExamId;
      return `
        <button class="exam-tile ${selected ? "is-selected" : ""}" type="button" data-exam-id="${exam.id}" aria-pressed="${selected}">
          <span class="exam-tile__title">${exam.title}</span>
          <span class="exam-tile__meta">35 soru</span>
          <span class="exam-tile__mix">4 PDF karışık</span>
        </button>
      `;
    })
    .join("");

  els.examGrid.querySelectorAll("[data-exam-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedExamId = Number(button.dataset.examId);
      renderExamGrid();
    });
  });
}

function renderTabs() {
  const isExamTab = state.activeTab === "exam";
  els.examTabButton.classList.toggle("is-active", isExamTab);
  els.essayTabButton.classList.toggle("is-active", !isExamTab);
  els.examTabButton.setAttribute("aria-pressed", String(isExamTab));
  els.essayTabButton.setAttribute("aria-pressed", String(!isExamTab));
}

function showHomeTab(tabName) {
  state.activeTab = tabName;
  renderTabs();
  els.topTabs.hidden = false;
  els.exam.hidden = true;
  els.results.hidden = true;
  els.setup.hidden = tabName !== "exam";
  els.essay.hidden = tabName !== "essay";

  if (tabName === "exam") {
    renderExamGrid();
  } else {
    renderEssayQuestions();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderEssayQuestions() {
  const sourceFilters = [
    ["all", "Tümü"],
    ["genc", "Genç"],
    ["orta", "Orta"],
    ["ileri", "İleri"],
    ["olum", "Ölüm ve Yas"],
  ];

  els.essayFilters.innerHTML = sourceFilters
    .map(([key, label]) => `
      <button class="filter-button ${state.essayFilter === key ? "is-active" : ""}" type="button" data-filter="${key}" aria-pressed="${state.essayFilter === key}">
        ${label}
      </button>
    `)
    .join("");

  els.essayFilters.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.essayFilter = button.dataset.filter;
      renderEssayQuestions();
    });
  });

  const visibleQuestions = essayQuestions.filter((question) => (
    state.essayFilter === "all" || question.sourceKey === state.essayFilter
  ));

  els.essayGrid.innerHTML = visibleQuestions
    .map((question, index) => `
      <article class="essay-card">
        <div class="essay-card__head">
          <span class="source-chip source-${question.sourceKey}">
            <span>${question.source}</span>
            <small>${question.topic}</small>
          </span>
          <span class="essay-count">${index + 1}/${visibleQuestions.length}</span>
        </div>
        <h3>${question.question}</h3>
        <div class="keyword-row">
          ${question.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}
        </div>
        <button class="secondary-action essay-answer-toggle" type="button" data-essay-id="${question.id}" aria-expanded="false">
          Örnek cevabı göster
        </button>
        <div class="essay-answer" id="answer-${question.id}" hidden>
          ${question.answer.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </article>
    `)
    .join("");

  els.essayGrid.querySelectorAll("[data-essay-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = $(`#answer-${button.dataset.essayId}`);
      const willOpen = answer.hidden;
      answer.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
      button.textContent = willOpen ? "Örnek cevabı gizle" : "Örnek cevabı göster";
    });
  });
}

function updateModeFromInputs() {
  state.mode = els.modeRadios.find((radio) => radio.checked)?.value || "finish";
}

function startExam() {
  updateModeFromInputs();
  state.activeExam = exams.find((exam) => exam.id === state.selectedExamId) || exams[0];
  state.currentIndex = 0;
  state.answers = {};
  state.checked = {};
  state.finished = false;

  els.setup.hidden = true;
  els.essay.hidden = true;
  els.topTabs.hidden = true;
  els.results.hidden = true;
  els.exam.hidden = false;
  renderExam();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function leaveExam() {
  els.exam.hidden = true;
  els.results.hidden = true;
  closeFinishModal();
  showHomeTab("exam");
}

function resetExam() {
  state.currentIndex = 0;
  state.answers = {};
  state.checked = {};
  state.finished = false;
  els.results.hidden = true;
  renderExam();
}

function renderExam() {
  if (!state.activeExam) return;

  els.examTitle.textContent = state.activeExam.title;
  els.examSubtitle.textContent = state.activeExam.subtitle;
  els.modeBadge.textContent = state.mode === "instant" ? "Tek tek cevap modu" : "Sınav sonunda cevap modu";

  renderProgress();
  renderQuestionNav();
  renderQuestion();
}

function renderProgress() {
  const questions = state.activeExam.questions;
  const answered = questions.filter(hasAnswer).length;
  const score = scoreExam();
  const visibleCorrect = state.mode === "instant" || state.finished ? score.correct : "-";

  els.progressText.textContent = `${answered}/${questions.length} cevaplandı`;
  els.progressBar.style.width = `${Math.round((answered / questions.length) * 100)}%`;
  els.scoreNow.textContent = state.finished
    ? `${score.correct}/${score.total} · %${score.percent}`
    : state.mode === "instant"
      ? `${visibleCorrect}/${questions.length} doğru`
      : "Puan bitince açılır";
}

function renderQuestionNav() {
  els.questionNav.innerHTML = state.activeExam.questions
    .map((question, index) => {
      const active = index === state.currentIndex;
      const answered = hasAnswer(question);
      const revealed = isRevealed(question);
      const correct = revealed && isCorrect(question);
      const classes = [
        "nav-dot",
        active ? "is-active" : "",
        answered ? "is-answered" : "",
        revealed && correct ? "is-correct" : "",
        revealed && !correct ? "is-wrong" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `<button class="${classes}" type="button" data-index="${index}" aria-label="${index + 1}. soru">${index + 1}</button>`;
    })
    .join("");

  els.questionNav.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentIndex = Number(button.dataset.index);
      renderExam();
    });
  });
}

function renderQuestion() {
  const question = state.activeExam.questions[state.currentIndex];
  const questionNumber = state.currentIndex + 1;
  const revealed = isRevealed(question);
  const answered = hasAnswer(question);
  const correct = revealed && isCorrect(question);

  const controls = question.type === "multiple"
    ? renderMultipleControls(question, revealed)
    : renderFillControls(question, revealed);

  const feedback = revealed
    ? `
      <div class="feedback ${correct ? "is-correct" : "is-wrong"}">
        <strong>${correct ? "Doğru" : "Yanlış"}</strong>
        <span>Doğru cevap: ${question.answer}</span>
        <p>${question.explanation}</p>
      </div>
    `
    : `
      <div class="feedback is-muted">
        ${state.mode === "instant" ? "Cevabı işaretleyince kontrol edebilirsin." : "Cevaplar sınavı bitirince açılacak."}
      </div>
    `;

  els.questionCard.innerHTML = `
    <div class="question-head">
      <div>
        <span class="question-kicker">${questionNumber}. soru · ${question.type === "fill" ? "Boşluk doldurma" : "Çoktan seçmeli"}</span>
        <h2>${question.prompt}</h2>
      </div>
      <div class="source-chip source-${question.sourceKey}">
        <span>${question.source}</span>
        <small>${question.topic}</small>
      </div>
    </div>
    ${controls}
    ${feedback}
  `;

  bindQuestionControls(question, revealed);
  els.prevButton.disabled = state.currentIndex === 0;
  els.nextButton.disabled = state.currentIndex === state.activeExam.questions.length - 1;
  els.finishButton.disabled = state.finished;
  els.finishButton.textContent = state.finished ? "Sınav tamamlandı" : answered ? "Sınavı bitir" : "Sınavı bitir";
}

function renderMultipleControls(question, revealed) {
  return `
    <div class="option-list">
      ${question.options
        .map((option) => {
          const selected = state.answers[question.id] === option;
          const isAnswer = question.answer === option;
          const className = [
            "option-button",
            selected ? "is-selected" : "",
            revealed && isAnswer ? "is-correct" : "",
            revealed && selected && !isAnswer ? "is-wrong" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return `
            <button class="${className}" type="button" data-option="${encodeURIComponent(option)}" ${revealed ? "disabled" : ""}>
              <span class="option-mark"></span>
              <span>${option}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderFillControls(question, revealed) {
  const value = state.answers[question.id] || "";
  return `
    <div class="fill-control">
      <input id="fillAnswer" type="text" autocomplete="off" placeholder="Cevabını yaz" value="${escapeHtml(value)}" ${revealed ? "disabled" : ""}>
      ${
        state.mode === "instant" && !state.finished
          ? `<button class="secondary-action" type="button" id="checkFill" ${revealed || !value.trim() ? "disabled" : ""}>Kontrol et</button>`
          : ""
      }
    </div>
  `;
}

function bindQuestionControls(question, revealed) {
  if (question.type === "multiple") {
    els.questionCard.querySelectorAll("[data-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if (revealed || state.finished) return;
        state.answers[question.id] = decodeURIComponent(button.dataset.option);
        if (state.mode === "instant") {
          state.checked[question.id] = true;
        }
        renderExam();
      });
    });
    return;
  }

  const input = $("#fillAnswer");
  if (input) {
    input.addEventListener("input", () => {
      state.answers[question.id] = input.value;
      const checkButton = $("#checkFill");
      if (checkButton) {
        checkButton.disabled = input.value.trim().length === 0;
      }
      renderProgress();
      renderQuestionNav();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && state.mode === "instant" && input.value.trim()) {
        state.answers[question.id] = input.value;
        state.checked[question.id] = true;
        renderExam();
      }
    });
  }

  const checkButton = $("#checkFill");
  if (checkButton) {
    checkButton.addEventListener("click", () => {
      state.answers[question.id] = input.value;
      state.checked[question.id] = true;
      renderExam();
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function moveQuestion(delta) {
  const nextIndex = Math.min(
    Math.max(state.currentIndex + delta, 0),
    state.activeExam.questions.length - 1,
  );
  state.currentIndex = nextIndex;
  renderExam();
}

function openFinishModal() {
  if (state.finished) return;
  const questions = state.activeExam.questions;
  const answered = questions.filter(hasAnswer).length;
  const unanswered = questions.length - answered;
  els.finishSummary.textContent = `${answered}/${questions.length} soru cevaplandı, ${unanswered} soru boş. Bitirirsen cevap anahtarı ve puanlama açılacak; cevapları değiştiremeyeceksin.`;
  els.finishModal.hidden = false;
  els.confirmFinishButton.focus();
}

function closeFinishModal() {
  if (!els.finishModal) return;
  els.finishModal.hidden = true;
}

function finishExam() {
  state.finished = true;
  state.activeExam.questions.forEach((question) => {
    if (question.type === "fill" && typeof state.answers[question.id] !== "string") {
      state.answers[question.id] = "";
    }
  });
  renderExam();
  renderResults();
  els.results.hidden = false;
  els.results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResults() {
  const score = scoreExam();
  els.resultScore.textContent = `${score.correct}/${score.total}`;
  els.resultLabel.textContent = `${performanceLabel(score.percent)} · %${score.percent}`;
  els.resultMeta.textContent = `${score.unanswered} boş bırakılan soru · ${score.byType.fill.correct}/${score.byType.fill.total} boşluk · ${score.byType.multiple.correct}/${score.byType.multiple.total} test`;

  els.typeBreakdown.innerHTML = [
    ["Boşluk doldurma", score.byType.fill],
    ["Çoktan seçmeli", score.byType.multiple],
  ]
    .map(([label, item]) => metricRow(label, item.correct, item.total))
    .join("");

  els.sourceBreakdown.innerHTML = Object.entries(score.bySource)
    .map(([label, item]) => metricRow(label, item.correct, item.total))
    .join("");

  els.reviewList.innerHTML = state.activeExam.questions
    .map((question, index) => {
      const correct = isCorrect(question);
      const userAnswer = hasAnswer(question) ? state.answers[question.id] : "Boş";
      return `
        <article class="review-item ${correct ? "is-correct" : "is-wrong"}">
          <div>
            <span>${index + 1}. ${question.type === "fill" ? "Boşluk" : "Test"} · ${question.source}</span>
            <h3>${question.prompt}</h3>
          </div>
          <p><strong>Senin cevabın:</strong> ${escapeHtml(userAnswer)}</p>
          <p><strong>Doğru cevap:</strong> ${question.answer}</p>
          <p>${question.explanation}</p>
        </article>
      `;
    })
    .join("");
}

function metricRow(label, correct, total) {
  const percent = Math.round((correct / total) * 100);
  return `
    <div class="metric-row">
      <span>${label}</span>
      <strong>${correct}/${total}</strong>
      <div class="mini-bar"><span style="width:${percent}%"></span></div>
    </div>
  `;
}

function bindEvents() {
  els.examTabButton.addEventListener("click", () => showHomeTab("exam"));
  els.essayTabButton.addEventListener("click", () => showHomeTab("essay"));
  els.startButton.addEventListener("click", startExam);
  els.prevButton.addEventListener("click", () => moveQuestion(-1));
  els.nextButton.addEventListener("click", () => moveQuestion(1));
  els.finishButton.addEventListener("click", openFinishModal);
  els.backButton.addEventListener("click", leaveExam);
  els.resetButton.addEventListener("click", resetExam);
  els.newExamButton.addEventListener("click", leaveExam);
  els.cancelFinishButton.addEventListener("click", closeFinishModal);
  els.confirmFinishButton.addEventListener("click", () => {
    closeFinishModal();
    finishExam();
  });
  els.finishModal.addEventListener("click", (event) => {
    if (event.target === els.finishModal) {
      closeFinishModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.finishModal.hidden) {
      closeFinishModal();
    }
  });

  els.modeRadios.forEach((radio) => {
    radio.addEventListener("change", updateModeFromInputs);
  });
}

function init() {
  initializeElements();
  renderExamGrid();
  renderEssayQuestions();
  renderTabs();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
