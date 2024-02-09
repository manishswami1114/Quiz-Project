var startBtn = document.querySelector(".start-btn"),
  nextBtn = document.querySelector(".next-btn"),
  questionElement = document.querySelector(".question"),
  answersContainer = document.querySelector(".q-container"),
  quizTitleElement = document.querySelector(".quiz-title"),
  correctCount = document.querySelector(".correct-count");
let currentQuestion = 0;
let correct = 0;

window.addEventListener("load", () => {
  quizTitleElement.innerHTML = quizData.title;
});

startBtn.addEventListener("click", () => {
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  loadQuestion(currentQuestion);
});

function startQuiz() {
  startBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  questionElement.classList.remove("hide");
  answersContainer.classList.remove("hide");
  correctCount.classList.remove("hide");
  loadQuestion(currentQuestion);
}

function loadQuestion(questionNum) {
  if (currentQuestion === questions.length) {
    startBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
    questionElement.classList.add("hide");
    answersContainer.classList.add("hide");
    startBtn.innerHTML = "Restart";
    correctCount.innerHTML = `Correct: ${correct}/${questions.length}`;
    correct = 0;
    currentQuestion = 0;
  } else {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
    answersContainer.dataset.type = null;
    questionElement.innerHTML = questions[questionNum].text;

    // Question types

    if (questions[questionNum].type === "mc") {
      var radioGroup = document.createElement("div");
      answersContainer.appendChild(radioGroup);
      questions[questionNum].answers.forEach((answer, index) => {
        var answerElement = document.createElement("label");
        var radioInput = document.createElement("input");
        var answerText = document.createElement("span");

        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.value = index;

        answerElement.appendChild(radioInput);
        answerText.innerHTML = answer.text;
        answerElement.appendChild(answerText);

        radioGroup.appendChild(answerElement);

        radioInput.addEventListener("change", () => {
          checkAnswer();
        });
      });
      answersContainer.dataset.type = "mc";
    } else if (questions[questionNum].type === "txt") {
      var inputElement = document.createElement("input");
      var checkBtn = document.createElement("button");
      checkBtn.innerHTML = "Check";
      checkBtn.classList.add("check-btn");
      inputElement.type = "text";
      checkBtn.addEventListener("click", () => {
        checkAnswer();
      });
      answersContainer.appendChild(inputElement);
      answersContainer.appendChild(checkBtn);
      answersContainer.dataset.type = "txt";
    }

    // End types

    correctCount.innerHTML = `Correct: ${correct}`;
  }
}

function checkAnswer() {
  // Check different types

  switch (answersContainer.dataset.type) {
    case "mc":
      var selectedRadio = document.querySelector('input[name="answer"]:checked');
      if (selectedRadio) {
        var selectedAnswer = selectedRadio.value;
        if (questions[currentQuestion].answers[selectedAnswer].correct) {
          correct++;
        }
      }
      currentQuestion++;
      break;

    case "txt":
      var qInputElement = answersContainer.children[0];
      var foundValues = questions[currentQuestion].answers.find(
        (answer) =>
          answer.toUpperCase() === qInputElement.value.toUpperCase()
      );
      if (foundValues) {
        correct++;
      }
      currentQuestion++;
      break;

    default:
      return;
      break;
  }

  // End different types
}
