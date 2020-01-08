const request = new XMLHttpRequest();
document.getElementById("startQuizBtn").addEventListener("click", function(e) {
  e.preventDefault();
  const langInput = document.getElementById("lang");
  const levelInput = document.getElementById("level");
  let data = {
    lang: langInput.value,
    level: levelInput.value
  };
  startGame(data);
});

function startGame(data) {
  request.overrideMimeType("application/json");
  request.open("GET", "js/questions.json", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {    
      console.log(request.responseText);
    }
  };
  request.send(null);
}
