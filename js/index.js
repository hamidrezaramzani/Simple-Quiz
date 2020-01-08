const request = new XMLHttpRequest();
const startDom = document.getElementById("start");
const gameDom = document.getElementById("game");
const allAnswer = document.getElementById("allAnswer");
let index = 0;
let currentQuestions = {};
let resultQuestions = [];
// start game ...
document.getElementById("startQuizBtn").addEventListener("click", function(e) {
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
  (index = 0),
    (resultQuestions = []),
    (currentQuestions = []),
    (allAnswer.innerHTML = "");
  startDom.classList.remove("hiddenStart");
  gameDom.classList.remove("showGame");
}

// 1 - get data from json file ...
function getData(data) {
  request.open("GET", "js/questions.json", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {
      let questions = JSON.parse(request.responseText);
      let questionsByData = parseQuestion(questions, data);
      startGame(questionsByData[0]);
    }
  };
  request.send(null);
}

// parse questions
function parseQuestion(questions, data) {
  return questions
    .filter(item => item.level == data.level)[0]
    .allQuestions.filter(
      item2 => item2.lang.toLowerCase() == data.lang.toLowerCase()
    );
}

// 2 - call set info and show game
function startGame(selectQuestions) {
  if (selectQuestions) {
    currentQuestions = selectQuestions;
    gotoGame(selectQuestions);
    startDom.classList.add("hiddenStart");
    gameDom.classList.add("showGame");
  } else {
    alert("question not found!");
  }
}

// 3 - set info game in page
function gotoGame(selectQuestions) {
  createQuestionDom(selectQuestions.questions[0]);
  setGameInfo();
}

// 4 - create question dom ...
function createQuestionDom(question) {
  const form = document.createElement("form");
  const submitForm = getSubmitForm(form);
  document.getElementById("questionText").innerText = question.question;
  question.answers.forEach((answer, index) => {
    form.innerHTML += `
    <div class="answer">
      <input type="radio" name="answer" value="${index}" id="${index}"> <label for="${index}">${answer}</label>
    </div>
    `;
  });
  form.append(submitForm);
  allAnswer.appendChild(form);
}

function getSubmitForm(form) {
  const submitFormBtn = document.createElement("button");
  submitFormBtn.classList.add("nextBtn");
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
  answerDom.value == current.correctQuestion
    ? (current.status = true)
    : (current.status = false);
  resultQuestions.push(current);
  if (currentQuestions.questions.length != index + 1) {
    index++;
    allAnswer.innerHTML = "";
    createQuestionDom(currentQuestions.questions[index]);
    setGameInfo();
  } else {
    finishGame();
  }
}

function setGameInfo() {
  document.getElementById("countQuestion").innerHTML = `${index + 1} / ${
    currentQuestions.questions.length
  }`;
  document.getElementById("langSelect").innerHTML = currentQuestions.lang;
}

function finishGame() {
  alert(`
    correct : ${resultQuestions.filter(item => item.status).length}
  `);
  resetGameDom();
}
