//H ypothetical data
const data = [
  {
    question: "what is your name?",
    answers: [ 
      "ok" , "no" , "by" , "hello"
    ],
    level: "hard", 
    
  }
];



const xmlHttp = new XMLHttpRequest();
document.getElementById("startQuizBtn").addEventListener("click", function(e) {
  e.preventDefault();
  const langInput = document.getElementById("lang");
  const levelInput = document.getElementById("level");
  let data = {
    lang: langInput.value,
    level: levelInput.value
  };
  changePage(data);
});

async function changePage(data) {
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log(xmlHttp.response);
    } else {
      alert("error!");
    }
  };
  xmlHttp.open("POST", "localhost:3000/api/questions");
  xmlHttp.setRequestHeader("content-type", "application/json");
  xmlHttp.send(data);
};
