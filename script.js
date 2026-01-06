// Вопросы викторины
const questions = [
  {
    text: "Какой результат выражения 2 + '2' в JavaScript?",
    answers: [
      "4",
      "'22'",
      "NaN",
      "Ошибка выполнения",
    ],
    correctIndex: 1,
  },
  {
    text: "Какой метод используется для добавления элемента в конец массива?",
    answers: ["push()", "add()", "append()", "insert()"],
    correctIndex: 0,
  },
  {
    text: "Как обозначается строгое равенство в JavaScript?",
    answers: ["==", "===", "!=", "="],
    correctIndex: 2,
  },
  {
    text: "Где правильно подключён внешний JavaScript‑файл?",
    answers: [
      "<script href='app.js'></script>",
      "<script src='app.js'></script>",
      "<js src='app.js'></js>",
      "<script link='app.js'>",
    ],
    correctIndex: 1,
  },
  {
    text: "Какой тип данных возвращает метод querySelector?",
    answers: ["Массив элементов", "NodeList", "Один элемент или null", "HTMLCollection"],
    correctIndex: 2,
  },
];

// Элементы DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const scoreCounter = document.getElementById("score-counter");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const resultText = document.getElementById("result-text");

// Состояние викторины
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Запуск викторины
startBtn.addEventListener("click", () => {
  resetQuiz();
  switchScreen(startScreen, quizScreen);
  showQuestion();
});

// Следующий вопрос
nextBtn.addEventListener("click", () => {
  if (!answered) return;

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Перезапуск
restartBtn.addEventListener("click", () => {
  resetQuiz();
  switchScreen(resultScreen, quizScreen);
  showQuestion();
});

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  updateScoreCounter();
}

function switchScreen(from, to) {
  from.classList.add("hidden");
  to.classList.remove("hidden");
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  answered = false;

  // Обновляем счётчики
  questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} из ${
    questions.length
  }`;
  updateScoreCounter();

  // Текст вопроса
  questionText.textContent = question.text;

  // Кнопка "Следующий вопрос"
  nextBtn.disabled = true;

  // Очищаем и создаём варианты ответов
  answersContainer.innerHTML = "";

  question.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.className = "answer";

    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D...

    button.innerHTML = `
      <span class="option-letter">${optionLetter}</span>
      <span class="option-text">${answerText}</span>
    `;

    button.addEventListener("click", () => selectAnswer(button, index));

    answersContainer.appendChild(button);
  });
}

function selectAnswer(selectedButton, selectedIndex) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === question.correctIndex;

  const answerButtons = answersContainer.querySelectorAll(".answer");

  answerButtons.forEach((btn, index) => {
    btn.classList.add("disabled");

    if (index === question.correctIndex) {
      btn.classList.add("correct");
    }

    if (index === selectedIndex && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    updateScoreCounter();
  }

  nextBtn.disabled = false;
}

function updateScoreCounter() {
  scoreCounter.textContent = `Очки: ${score}/${questions.length}`;
}

function showResult() {
  switchScreen(quizScreen, resultScreen);

  const percent = Math.round((score / questions.length) * 100);
  let message;

  if (percent === 100) {
    message = "Идеально! Ты отлично знаешь основы 🎉";
  } else if (percent >= 60) {
    message = "Хороший результат! Есть ещё, что подтянуть 💪";
  } else {
    message = "Не унывай! Попробуй ещё раз и станет лучше 🙂";
  }

  resultText.textContent = `Ты набрал(а) ${score} из ${
    questions.length
  } (${percent}%). ${message}`;
}


