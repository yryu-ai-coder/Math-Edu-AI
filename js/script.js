// Hamburger & Sidebar Menu for all pages
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebarMenu = document.getElementById('sidebarMenu');
const closeSidebar = document.getElementById('closeSidebar');

if (hamburgerMenu && sidebarMenu && closeSidebar) {
    hamburgerMenu.addEventListener('click', () => {
        sidebarMenu.classList.add('open');
    });
    closeSidebar.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });
    // 바깥 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (
            sidebarMenu.classList.contains('open') &&
            !sidebarMenu.contains(e.target) &&
            e.target !== hamburgerMenu &&
            !hamburgerMenu.contains(e.target)
        ) {
            sidebarMenu.classList.remove('open');
        }
    });
}

// 8th Grade Modeling Diagnostic Quiz Questions
const quizQuestions = [
    {
        question: "1. At a store, apples cost $0.50 each and bananas cost $0.30 each. Find the expression for the total cost when buying x apples and y bananas.",
        options: [
            "0.50x + 0.30y",
            "0.50y + 0.30x", 
            "0.80(x + y)",
            "0.50 + 0.30 + x + y"
        ],
        correct: 0,
        explanation: "x apples cost 0.50x dollars, y bananas cost 0.30y dollars, so the total cost is 0.50x + 0.30y dollars."
    },
    {
        question: "2. A rectangle has a width of 8 cm and a height of x cm. What is the expression for the area of the rectangle?",
        options: [
            "8 + x",
            "8 × x", 
            "2(8 + x)",
            "8 ÷ x"
        ],
        correct: 1,
        explanation: "The area of a rectangle is width × height, so it's 8 × x."
    },
    {
        question: "3. When 3 is added to a number and then multiplied by 2, the result is 14. Find this number.",
        options: [
            "4",
            "5", 
            "6",
            "7"
        ],
        correct: 0,
        explanation: "Let the number be x, then (x + 3) × 2 = 14 → x + 3 = 7 → x = 4."
    },
    {
        question: "4. The sum of three consecutive natural numbers is 24. What is the smallest number?",
        options: [
            "6",
            "7", 
            "8",
            "9"
        ],
        correct: 1,
        explanation: "Let the smallest number be x, then x + (x+1) + (x+2) = 24 → 3x + 3 = 24 → 3x = 21 → x = 7."
    },
    {
        question: "5. A car traveling at 60 km/h for 2 hours and 30 minutes covers what distance?",
        options: [
            "120 km",
            "150 km", 
            "180 km",
            "200 km"
        ],
        correct: 1,
        explanation: "2 hours 30 minutes = 2.5 hours, so distance = speed × time = 60 × 2.5 = 150 km."
    }
];

// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;

// DOM elements
const quizModal = document.getElementById('quizModal');
const resultModal = document.getElementById('resultModal');
const startQuizBtn = document.getElementById('startQuiz');
const closeBtns = document.querySelectorAll('.close');
const nextQuestionBtn = document.getElementById('nextQuestion');
const submitQuizBtn = document.getElementById('submitQuiz');
const closeResultBtn = document.getElementById('closeResult');

// Start quiz
startQuizBtn.addEventListener('click', startQuiz);

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quizModal.style.display = 'none';
        resultModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === quizModal) {
        quizModal.style.display = 'none';
    }
    if (event.target === resultModal) {
        resultModal.style.display = 'none';
    }
});

// Next question button
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showQuizResults();
    }
});

// Submit quiz button
submitQuizBtn.addEventListener('click', showQuizResults);

// Close result button
closeResultBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
    quizModal.style.display = 'none';
    updateProgress();
});

// Start quiz function
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizCompleted = false;
    quizModal.style.display = 'block';
    displayQuestion();
}

// Display question function
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');
    const answerContainer = document.getElementById('answerContainer');
    const quizProgress = document.getElementById('quizProgress');
    
    quizProgress.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    
    questionContainer.innerHTML = `<h3>${question.question}</h3>`;
    
    answerContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = option;
        answerDiv.addEventListener('click', () => selectAnswer(index));
        answerContainer.appendChild(answerDiv);
    });
    
    nextQuestionBtn.style.display = 'none';
    submitQuizBtn.style.display = 'none';
}

// Select answer function
function selectAnswer(selectedIndex) {
    const answerOptions = document.querySelectorAll('.answer-option');
    const question = quizQuestions[currentQuestionIndex];
    
    // Clear previous selections
    answerOptions.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark current selection
    answerOptions[selectedIndex].classList.add('selected');
    
    // Show correct answer
    answerOptions[question.correct].classList.add('correct');
    if (selectedIndex !== question.correct) {
        answerOptions[selectedIndex].classList.add('incorrect');
    }
    
    // Save answer
    userAnswers[currentQuestionIndex] = selectedIndex;
    
    // Show next button
    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextQuestionBtn.style.display = 'inline-block';
    } else {
        submitQuizBtn.style.display = 'inline-block';
    }
}

// Show quiz results function
function showQuizResults() {
    const score = userAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correct
    ).length;
    
    const percentage = (score / quizQuestions.length) * 100;
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const recommendation = document.getElementById('recommendation');
    
    scoreDisplay.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
        <div>Score: ${score}/${quizQuestions.length} (${percentage}%)</div>
    `;
    
    let recommendationText = '';
    if (percentage >= 80) {
        recommendationText = `
            <h4>🎉 Excellent!</h4>
            <p>You have a good understanding of 8th grade modeling concepts. You can start the 9th grade curriculum directly.</p>
            <p><strong>Recommended learning order:</strong> Functions → Algebra → Geometry → Statistics</p>
        `;
    } else if (percentage >= 60) {
        recommendationText = `
            <h4>👍 Good!</h4>
            <p>You understand the basic concepts but need more practice.</p>
            <p><strong>Recommended learning order:</strong> Modeling review → Functions → Algebra → Geometry → Statistics</p>
        `;
    } else {
        recommendationText = `
            <h4>📚 Keep studying!</h4>
            <p>It would be good to review 8th grade modeling concepts.</p>
            <p><strong>Recommended learning order:</strong> Modeling basics → Functions → Algebra → Geometry → Statistics</p>
        `;
    }
    
    recommendation.innerHTML = recommendationText;
    
    // Save results to local storage
    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizPercentage', percentage);
    localStorage.setItem('quizCompleted', 'true');
    
    quizModal.style.display = 'none';
    resultModal.style.display = 'block';
    quizCompleted = true;
}

// Update learning progress function
function updateProgress() {
    const quizCompleted = localStorage.getItem('quizCompleted') === 'true';
    const quizPercentage = parseInt(localStorage.getItem('quizPercentage')) || 0;
    
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Modeling progress (based on quiz results)
    if (quizCompleted) {
        const modelingProgress = Math.min(quizPercentage, 100);
        progressFills[0].style.width = `${modelingProgress}%`;
        progressFills[0].setAttribute('data-progress', modelingProgress);
    }
    
    // Progress for other chapters (from local storage)
    const chapters = ['functions', 'algebra', 'geometry', 'statistics'];
    chapters.forEach((chapter, index) => {
        const progress = parseInt(localStorage.getItem(`${chapter}Progress`)) || 0;
        progressFills[index + 1].style.width = `${progress}%`;
        progressFills[index + 1].setAttribute('data-progress', progress);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    
    // Set animation order for curriculum cards
    const curriculumCards = document.querySelectorAll('.curriculum-card');
    curriculumCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
});

// Save progress function (for use in other pages)
function saveProgress(chapter, progress) {
    localStorage.setItem(`${chapter}Progress`, progress);
    updateProgress();
}

// Get quiz results function
function getQuizResults() {
    return {
        completed: localStorage.getItem('quizCompleted') === 'true',
        score: parseInt(localStorage.getItem('quizScore')) || 0,
        percentage: parseInt(localStorage.getItem('quizPercentage')) || 0
    };
} 