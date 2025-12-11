// ---------- QUIZ DATA ----------
const originalQuestions = [
    {
        question: "Which of the following is not an input device?",
        options: [
            "Keyboard.",
            "Mouse.",
            "Monitor.",
            "scanner."
        ],
        answer: "Monitor."
    },
    {
        question: "Which data type in C is used to store decimal values?",
        options: ["<int>", "<float>", "<char>", "<long>"],
        answer: "<float>"
    },
    {
        question: "In CSS, what property is used to change the background color of an element?",
        options: ["color", "font-color", "background-color", "bgcolor"],
        answer: "background-color"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["Boolean", "String", "Float", "Symbol"],
        answer: "Float"
    },
    {
        question: "What does the 'npm' acronym stand for?",
        options: [
            "Node Package Manager",
            "New Project Module",
            "Network Protocol Management",
            "Native Performance Monitor"
        ],
        answer: "Node Package Manager"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userSelection = null;

// DOM Elements
const questionTextEl = document.getElementById('questionText');
const optionsContainerEl = document.getElementById('optionsContainer');
const nextButton = document.getElementById('nextButton');
const progressEl = document.getElementById('progress');
const quizContentEl = document.getElementById('quizContent');
const resultsEl = document.getElementById('results');
const finalScoreEl = document.getElementById('finalScore');
const messageBoxEl = document.getElementById('messageBox');


// ---------- UTILITY ----------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// ---------- MAIN FUNCTIONS ----------
function loadQuestion() {
    const currentQ = shuffledQuestions[currentQuestionIndex];

    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;

    optionsContainerEl.innerHTML = "";
    userSelection = null;
    nextButton.disabled = true;
    nextButton.textContent = "Next Question";
    messageBoxEl.textContent = "";

    currentQ.options.forEach((option, index) => {
        const id = `option-${index}`;

        const div = document.createElement('div');
        div.className = "flex items-center";

        const radio = document.createElement('input');
        radio.type = "radio";
        radio.id = id;
        radio.name = "quizOption";
        radio.value = option;
        radio.className = "hidden";
        radio.onchange = handleOptionSelect;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = option;
        label.className =
            "option-label w-full p-4 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition";

        div.appendChild(radio);
        div.appendChild(label);
        optionsContainerEl.appendChild(div);
    });
}

function handleOptionSelect(event) {
    userSelection = event.target.value;
    nextButton.disabled = false;

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextButton.textContent = "Submit Quiz";
    }
}

function handleNext() {
    if (userSelection === null) {
        messageBoxEl.textContent = "Please select an answer before proceeding.";
        return;
    }

    if (userSelection === shuffledQuestions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    quizContentEl.classList.add("hidden");
    resultsEl.classList.remove("hidden");
    finalScoreEl.textContent = `${score} / ${shuffledQuestions.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userSelection = null;

    shuffledQuestions = [...originalQuestions];
    shuffleArray(shuffledQuestions);

    quizContentEl.classList.remove("hidden");
    resultsEl.classList.add("hidden");

    loadQuestion();
}

// ---------- START QUIZ ----------
window.onload = resetQuiz;
