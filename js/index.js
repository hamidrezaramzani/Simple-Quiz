const request = new XMLHttpRequest();
const startDom = document.getElementById("start");
const gameDom = document.getElementById("game");
const allAnswer = document.getElementById('allAnswer');
let index = 1;
let currentQuestions = {};
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

document.getElementById("backToStart").addEventListener("click", () => {  
  resetGameDom();
  startDom.classList.remove("hiddenStart");
  gameDom.classList.remove("showGame");
});

function resetGameDom() {
  index = 1;
  currentQuestions = {};
  allAnswer.innerHTML = "";
}

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

function parseQuestion(questions, data) {
  return questions
    .filter(item => item.level == data.level)[0]
    .allQuestions.filter(
      item2 => item2.lang.toLowerCase() == data.lang.toLowerCase()
    );
}

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

function gotoGame(selectQuestions) {
  createQuestionDom(selectQuestions.questions[0]);
  document.getElementById(
    "countQuestion"
  ).innerHTML = `1/${selectQuestions.questions.length}`;
  document.getElementById("langSelect").innerHTML = selectQuestions.lang;
}

function createQuestionDom(question) {
  const form = document.createElement("form");
  document.getElementById("questionText").innerText = question.question;
  question.answers.forEach((answer , index) => {
    form.innerHTML += `
    <div class="answer">
      <input type="radio" name="answer" id="${index}"> <label for="${index}">${answer}</label>
    </div>
    `;
  });
  allAnswer.appendChild(form);
}
