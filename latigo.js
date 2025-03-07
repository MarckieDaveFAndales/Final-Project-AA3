const questions = [
    { question: "What is the main goal of SDG 13?", options: ["Zero Hunger", "Quality Education", "Climate Action", "Gender Equality"], answer: 2 },
    { question: "Which gas is the primary contributor to climate change?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1 },
    { question: "What renewable energy source comes from the sun?", options: ["Wind Energy", "Solar Energy", "Hydroelectric Energy", "Geothermal Energy"], answer: 1 },
    { question: "Which of the following human activities contributes the most to climate change?", options: ["Recycling", "Burning Fossil Fuels", "Planting Trees", "Using Electric Cars"], answer: 1 },
    { question: "What international agreement aims to combat climate change?", options: ["Kyoto Protocol", "Paris Agreement", "Geneva Convention", "Montreal Protocol"], answer: 1 },
    { question: "Which of the following is an effect of climate change?", options: ["Rising sea levels", "Stronger hurricanes", "Extreme heatwaves", "All of the above"], answer: 3 },
    { question: "What can individuals do to reduce their carbon footprint?", options: ["Use public transport", "Reduce meat consumption", "Use energy-efficient appliances", "All of the above"], answer: 3 },
    { question: "Which sector contributes the most to global greenhouse gas emissions?", options: ["Agriculture", "Transportation", "Energy production", "Fashion industry"], answer: 2 },
    { question: "What percentage of the Earth's surface is covered by oceans, which help absorb CO₂?", options: ["30%", "50%", "70%", "90%"], answer: 2 },
    { question: "Which of the following is a renewable energy source that does NOT produce greenhouse gases?", options: ["Coal", "Natural Gas", "Wind Power", "Diesel"], answer: 2 }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function displayQuestion() {
    clearInterval(timer);
    startTimer();
    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    q.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    clearInterval(timer);
    let q = questions[currentQuestion];
    let options = document.getElementById("options").children;
    if (selected === q.answer) {
        options[selected].classList.add("correct");
        score++;
    } else {
        options[selected].classList.add("wrong");
        options[q.answer].classList.add("correct");
    }
    setTimeout(() => nextQuestion(), 1000);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        clearInterval(timer);
        document.getElementById("quiz-box").style.display = "none";
        document.getElementById("result").innerText = `You scored ${score} out of ${questions.length}`;
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("result").innerText = `Final Score: ${score} / ${questions.length}`;
}

displayQuestion();