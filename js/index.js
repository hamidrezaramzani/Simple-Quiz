const request = new XMLHttpRequest();
const startDom = document.getElementById("start");
const gameDom = document.getElementById("game");
const allAnswer = document.getElementById("all-answer");
let index = 0;
let currentQuestions = {};
let resultQuestions = [];
// start game ...
document.getElementById("start-quiz-btn").addEventListener("click", function(e) {
  e.preventDefault();
  const langInput = document.getElementById("lang");
  const levelInput = document.getElementById("level");
  let data = {
    lang: langInput.value,
    level: levelInput.value
  };
  getData(data);
});

// back to home page
document.getElementById("backToStart").addEventListener("click", () => {
  if (confirm("are you sure to close in quiz?")) {
    resetGameDom();
  }
});

// reset questions if btn reset clicked
function resetGameDom() {
  index = 0;
  resultQuestions = [];
  currentQuestions = [];
  allAnswer.innerHTML = "";
  startDom.classList.remove("hidden-start");
  gameDom.classList.remove("show-game");
}

// 1 - get data from json file ...
function getData(data) {
  request.open("GET", "js/questions.json", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {
      let questions = JSON.parse(request.responseText);
      let questionsByData = parseQuestion(questions, data);
      startGame(questionsByData);
    }
  };
  request.send(null);
}

// parse questions
function parseQuestion(questions, data) {
  return questions
    .find(item => item.level == data.level)
    .allQuestions.find(
      item2 => item2.lang.toLowerCase() == data.lang.toLowerCase()
    );
}

// 2 - call set info and show game
function startGame(selectQuestions) {
  if (!selectQuestions) {
    alert("question not found!");
    return;
  }
  currentQuestions = selectQuestions;
  gotoGame(selectQuestions);
  startDom.classList.add("hidden-start");
  gameDom.classList.add("show-game");
}

// 3 - set info game in page
function gotoGame(selectQuestions) {
  createQuestionDom(selectQuestions.questions[0]);
  setGameInfo();
}

// 4 - create question dom ...
function createQuestionDom(question) {
  const form = document.createElement("form");
  const submitForm = getSubmitForm();
  document.getElementById("question-text").innerText = question.question;
  question.answers.forEach((answer, index) => {
    let divDom = getDiv();
    divDom.append(getInput(index));
    divDom.append(getLabel(index, answer));
    form.append(divDom);
  });
  form.append(submitForm);
  allAnswer.appendChild(form);
}

function getSubmitForm() {
  const submitFormBtn = document.createElement("button");
  submitFormBtn.classList.add("next-btn");
  submitFormBtn.type = "button";
  submitFormBtn.innerText = "Next";
  submitFormBtn.onclick = nextClicked;
  return submitFormBtn;
}

function nextClicked() {
  const answer = document.getElementsByName("answer");
  for (const answerDom of answer) {
    if (answerDom.checked) {
      loadNextLevel(answerDom);
      break;
    }
  }
}

function loadNextLevel(answerDom) {
  let current = currentQuestions.questions[index];
  current.status = answerDom.value == current.correctQuestion;
  resultQuestions.push(current);
  if (currentQuestions.questions.length == index + 1) {
    finishGame();
    return;
  }
  index++;
  allAnswer.innerHTML = "";
  createQuestionDom(currentQuestions.questions[index]);
  setGameInfo();
}

function setGameInfo() {
  document.getElementById("count-questions").innerHTML = `${index + 1} / ${
    currentQuestions.questions.length
  }`;
  document.getElementById("lang-select").innerHTML = currentQuestions.lang;
}

function finishGame() {
  alert(`
    correct : ${resultQuestions.filter(item => item.status).length}
  `);
  resetGameDom();
}

// create dom
function getDiv() {
  const div = document.createElement("div");
  div.classList.add("answer");
  return div;
}

function getLabel(index, answer) {
  const label = document.createElement("label");
  label.innerText = answer;
  label.setAttribute("for", index);
  return label;
}

function getInput(index) {
  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", index);
  input.setAttribute("id", index);
  return input;
}
