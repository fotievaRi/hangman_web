window.onload = function () {

    var alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж',
        'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с',
        'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ','ъ','ы','ь','э','ю','я'];

    var categories;         // Array of topics
    var chosenCategory;     // Selected category
    var word ;              // Selected word
    var guess ;             // Guess
    var geusses = [ ];      // Stored geusses
    var lives ;             // Lives
    var counter ;           // Count correct geusses
    var space;              // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("catagoryName");

    // create alphabet ul
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Select Catagory
    var selectCat = function () {
        if (chosenCategory === categories[0]) {
            catagoryName.innerHTML = "Программирование";
        } else if (chosenCategory === categories[1]) {
            catagoryName.innerHTML = "Кино";
        } else if (chosenCategory === categories[2]) {
            catagoryName.innerHTML = "Города";
        }
        else if (chosenCategory === categories[3]) {
            catagoryName.innerHTML = "Животные";
        }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function () {
        showLives.innerHTML = "У вас  " + lives + "жизней";
        if (lives < 1) {
            showLives.innerHTML = "Игра закончена";
            document.getElementById('score').value='-5';
        }
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "Вы выиграли!";
                document.getElementById('score').value='10';
            }
        }
    }

    // Animate man
    var animate = function () {
        var drawMe = lives ;
        drawArray[drawMe]();
    }


    // Hangman
    canvas =  function(){

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function() {
        draw (0, 150, 150, 150);
    };

    frame2 = function() {
        draw (10, 0, 10, 600);
    };

    frame3 = function() {
        draw (0, 5, 70, 5);
    };

    frame4 = function() {
        draw (60, 5, 60, 15);
    };

    torso = function() {
        draw (60, 36, 60, 70);
    };

    rightArm = function() {
        draw (60, 46, 100, 50);
    };

    leftArm = function() {
        draw (60, 46, 20, 50);
    };

    rightLeg = function() {
        draw (60, 70, 100, 100);
    };

    leftLeg = function() {
        draw (60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


    // OnClick Function
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    geusses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }


    // Play
    play = function () {
        categories = [
            ["компилятор","многопотчность","полиморфизм","наследование","интерфейс","сервер","инкапсуляция","программирование","отладчик","разработчик"],
            ["аватар","леон","матрица","титаник","хатико","гарри","хогвартс","мстители","человекпаук","малифесента"],
            [ "рим","токио","париж","москва","венеция","стамбул","лондон","бомбей","санкт-петербург","барселона"],
            ["страус","носорог","акула","панда","пантера","крокодил","шиншила","медведь","лось","кролик"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        geusses = [ ];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();
    // Reset
    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        context.clearRect(0, 0, 400, 400);
        play();
    }
}