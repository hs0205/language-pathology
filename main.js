const quizData = [
    {
        question: "사과",
        options: ["Apple", "Banana", "Cherry", "Date"],
        answer: "Apple"
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
        resultEl.textContent = "정답!";
    } else {
        resultEl.textContent = `오답! 정답은 ${currentQuestion.answer} 입니다.`;
    }

    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
    });
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        // 퀴즈 종료
        questionEl.textContent = "퀴즈 끝!";
        optionsContainer.innerHTML = '';
        nextBtn.style.display = 'none';

        resultEl.innerHTML = `총 ${quizData.length} 문제 중 ${score} 문제를 맞혔습니다.`;

        // 🔥 여기서 폼을 강제로 보여줌
        contactForm.style.display = 'block';
    }
});

loadQuiz();
