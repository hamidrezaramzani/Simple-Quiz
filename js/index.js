const request = new XMLHttpRequest();
const startDom = document.getElementById("start");
const gameDom = document.getElementById("game");
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
  getData(data, startGame);
});


document.getElementById('backToStart').addEventListener('click', () => {
  startDom.classList.remove('hiddenStart');
  gameDom.classList.remove('showGame');
});



function getData(data, callback) {
  request.open("GET", "js/questions.json", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {
      let questions = JSON.parse(request.responseText);
      let questionsByData = parseQuestion(questions, data);
      callback(questionsByData[0]);
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
  currentQuestions = selectQuestions;
  document.getElementById('countQuestion').innerHTML = `1/${selectQuestions.questions.length}`;
  document.getElementById('langSelect').innerHTML = selectQuestions.lang;
  startDom.classList.add('hiddenStart');
  gameDom.classList.add('showGame');
}

