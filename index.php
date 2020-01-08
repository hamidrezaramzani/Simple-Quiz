<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quiz app</title>
</head>
<link rel="stylesheet" href="css/main.css">

<body>
    <div class="main start">
        <h2>Select category?</h2>
        <br>
        <form action="">
            <label for="lang">select programming language:</label>
            <select name="lang" id="lang" class="textBox">
                <option value="1">PHP</option>
                <option value="2">JavaScript</option>
                <option value="3">Java</option>
                <option value="4">C#</option>
            </select>

            <label for="level">select level:</label>
            <select name="level" id="level" class="textBox">
                <option value="1">hard</option>
                <option value="2">medium</option>
                <option value="3">easy</option>
            </select>

            <button id="startQuizBtn" class="btn">start</button>
        </form>
    </div>


    <div class="main game">
        <h2>this is name</h2>       
    </div>


</body> 
<script src="js/index.js"></script>
</html>