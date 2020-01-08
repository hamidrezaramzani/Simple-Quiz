document.getElementById("startQuizBtn").addEventListener("click", function(e) {
  e.preventDefault();
  removePrevGame();
  const langInput = document.getElementById("lang");
  const levelInput = document.getElementById("level");
    let data = {
        lang: langInput.value,
        level : levelInput.value
    };
    console.log(data);
});

const removePrevGame = () => {
  localStorage.removeItem("quiz");
};
