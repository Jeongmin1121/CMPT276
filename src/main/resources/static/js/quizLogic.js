

const quiz = [
    {
        qnum : "Question 1",
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        qnum : "Question 2",
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        qnum : "Question 3",
        question: "Who painted the Mona Lisa?",
        choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        qnum : "Question 4",
        question: "What is the largest ocean in the world?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        qnum : "Question 5",
        question: "What is the tallest mountain in the world?",
        choices: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
        correctAnswer: "Mount Everest"
    }
];

playerAnswers = ["" , "" , "" , "" , ""];

let currentQuestion = 0;
let score = 0;
let choices = quiz[currentQuestion].choices;
let end = false;

function displayQuestion() {
    let questionNumber = quiz[currentQuestion].qnum;
    let question = quiz[currentQuestion].question;
    let choices = quiz[currentQuestion].choices;
    
    document.getElementById("qnum").innerHTML = questionNumber;
    document.getElementById("question").innerHTML = question;
    document.getElementById("answerDescription1").innerHTML = choices[0];
    document.getElementById("answerDescription2").innerHTML = choices[1];
    document.getElementById("answerDescription3").innerHTML = choices[2];
    document.getElementById("answerDescription4").innerHTML = choices[3];
    
    // Hide or show previousButton based on currentQuestion
    if (currentQuestion === 0) {
        document.getElementById("previousButton").style.visibility = "hidden";
    } else {
        document.getElementById("previousButton").style.visibility = "visible";
    }
    
    // Hide or show nextButton based on currentQuestion
    if (currentQuestion === quiz.length - 1) {
        document.getElementById("nextButton").style.visibility = "hidden";
        checkAllQuestionsAnswered(); 
    } else {
        document.getElementById("nextButton").style.visibility = "visible";
        document.getElementById("submitButton").style.visibility = "hidden"; 
    }

    
}

function checkAllQuestionsAnswered() {
    const unansweredQuestions = playerAnswers.filter(answer => answer === "");
    if (unansweredQuestions.length === 0) {
        const submitButton = document.getElementById("submitButton");
        submitButton.style.visibility = "visible"; 
        submitButton.addEventListener("click", function() {
            submitButton.disabled = true; 

        });
    }
}

function clearSelectedClass() {
    const answerChoices = document.querySelectorAll(".answerChoices");
    answerChoices.forEach(choice => {
        choice.classList.remove("selected");
        choice.classList.remove("correctAnswer");
    });
}

function answerReview() {
    const answerChoices = document.querySelectorAll(".answerChoices");
    for (let index = 0; index < answerChoices.length; index++) {
        const choice = answerChoices[index];
        console.log("im here");
        
        if (playerAnswers[currentQuestion] === quiz[currentQuestion].choices[index]) {
            console.log( quiz[currentQuestion].choices[index]);
            console.log(playerAnswers[currentQuestion]);
            choice.classList.add("selected");
            console.log("im also here");
        }
    }
}

function answerShow() {
    const answerChoices = document.querySelectorAll(".answerChoices");
    
    for (let index = 0; index < answerChoices.length; index++) {

        const choice = answerChoices[index];
        if (playerAnswers[currentQuestion] === quiz[currentQuestion].correctAnswer) {
            return;
        }

        if (quiz[currentQuestion].correctAnswer === quiz[currentQuestion].choices[index]) {
           
            choice.classList.add("correctAnswer");
            console.log("im also here");
        }
    }
}


function previousQuestion() {
    clearSelectedClass();
    if (currentQuestion > 0) {
        currentQuestion--;
        console.log("Current question: " + currentQuestion);
        displayQuestion();
    }
    answerReview();
    if(end){
        answerShow()
    }
}


function nextQuestion() {
    clearSelectedClass();
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        console.log("Current question: " + currentQuestion);
        displayQuestion();
    }
    answerReview();
    if(end){
        answerShow()
    }
}

function answerSelection() {
    const answerChoices = document.querySelectorAll(".answerChoices");

    answerChoices.forEach(choice => {
        choice.addEventListener("click", function() {
            answerChoices.forEach(choice => {
                choice.classList.remove("selected");
                console.log("unselected");
            });
            choice.classList.add("selected");
            console.log("Answer pressed: " + choice.textContent + " added selection");

            // Get the selected choice number
            const selectedChoiceNumber = Array.from(answerChoices).indexOf(choice) + 1;
            console.log("Selected choice number: " + selectedChoiceNumber);
            playerAnswers[currentQuestion] = quiz[currentQuestion].choices[selectedChoiceNumber - 1];
            checkAllQuestionsAnswered();
        });
    });
}


function answerCheck() {
    score = 0;
    for (let i = 0; i < quiz.length; i++) {
        if (playerAnswers[i] === quiz[i].correctAnswer) {
            score++;
        }
    }
    
    console.log("Your score is: " + score + " out of " + quiz.length);
    
    // Display the score on the screen
    document.getElementById("score").textContent = "Your score is: " + score + " out of " + quiz.length;
}





displayQuestion();
console.log("Current question: " + currentQuestion);

document.getElementById("nextButton").addEventListener("click", function() {
    nextQuestion();
    displayQuestion();
});

document.getElementById("previousButton").addEventListener("click", function() {
    previousQuestion();
    displayQuestion();
});


answerSelection();

document.getElementById("submitButton").addEventListener("click", function() {   
    end = true;
    answerCheck();
    answerShow();
});










