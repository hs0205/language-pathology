const quizData = [
    {
        question: "사과",
        options: ["Apple", "Banana", "Cherry", "Date"],
        answer: "Apple"
    },
    {
        question: "바나나",
        options: ["Apple", "Banana", "Cherry", "Date"],
        answer: "Banana"
    },
    {
        question: "의자",
        options: ["Chair", "Table", "Desk", "Sofa"],
        answer: "Chair"
    },
    {
        question: "책상",
        options: ["Chair", "Table", "Desk", "Sofa"],
        answer: "Desk"
    },
    {
        question: "컴퓨터",
        options: ["Computer", "Mouse", "Keyboard", "Monitor"],
        answer: "Computer"
    }
];

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const contactForm = document.getElementById('contact-form-container');

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function loadQuiz() {
    answerSelected = false;
    resultEl.textContent = '';
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, option));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, selectedOption) {
    if (answerSelected) return;
    answerSelected = true;

    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        button.classList.add('correct');
        resultEl.textContent = "정답!";
    } else {
        button.classList.add('incorrect');
        resultEl.textContent = `오답! 정답은 ${currentQuestion.answer} 입니다.`;
    }

    // Show correct answer
    Array.from(optionsContainer.children).forEach(btn => {
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add('correct');
        }
        btn.disabled = true;
    });
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
        Array.from(optionsContainer.children).forEach(btn => btn.disabled = false);
    } else {
        questionEl.textContent = "퀴즈 끝!";
        optionsContainer.innerHTML = `총 ${quizData.length} 문제 중 ${score} 문제를 맞혔습니다.`;
        nextBtn.style.display = 'none';
        resultEl.textContent = '';
        contactForm.style.display = 'block'; // Show the form
    }
});

loadQuiz();
