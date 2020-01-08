<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quiz app</title>
</head>
<link rel="stylesheet" href="css/main.css">

<body>
    <div class="main" id="start">
        <h2>Select category?</h2>
        <br>
        <form action="">
            <label for="lang">select programming language:</label>
            <select name="lang" id="lang" class="textBox">
                <option value="Php">Php</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
            </select>

            <label for="level">select level:</label>
            <select name="level" id="level" class="textBox">
                <option value="hard">hard</option>
                <option value="medium">medium</option>
                <option value="easy">easy</option>
            </select>

            <button id="startQuizBtn" class="btn">start</button>
        </form>
    </div>


    <div class="main" id="game">
        <div class="gameInfo">
            <button id="backToStart">Back</button>
            <p>
                <span id="countQuestion"></span> 
                -
                 <span id="langSelect"></span>
            </p>
        </div>
        <br>
        <h2 id="questionText"></h2>                                              
        <br>  
        <div id="allAnswer"></div>        
        
                          
    </div>


</body> 
<script src="js/index.js"></script>
</html>