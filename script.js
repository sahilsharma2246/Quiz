const questions = [

  { text: "Which of the following is a JavaScript framework?", 
    options: ["React", "Django", "Flask", "Ruby on Rails"], 
    answer: "React" },
  { text: "What does HTML stand for?", 
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "None of the above"],
     answer: "Hyper Text Markup Language" },
  { text: "Which method is used to add an element at the end of an array in JavaScript?",
     options: ["push()", "add()", "append()", "insert()"], 
     answer: "push()" },
 
  { text: "What is the purpose of the `alt` attribute in an `img` tag?",
     options: ["To specify the image source", "To provide alternative text for the image", "To set the image width", "To set the image height"],
      answer: "To provide alternative text for the image" },
  { text: "Which CSS property is used to change the text color?", 
    options: ["text-color", "color", "font-color", "text-style"], 
    answer: "color" },
  { text: "What is the correct way to comment in JavaScript?",
     options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
     answer: "// comment" },
  
  { text: "What is the purpose of the CSS `margin` property?", 
    options: ["To add space inside an element", "To add space outside an element", "To set the element's width", "To set the element's height"], 
    answer: "To add space outside an element" },
  { text: "Which JavaScript method is used to remove the last element from an array?", 
    options: ["pop()", "remove()", "delete()", "splice()"], 
    answer: "pop()" },
  
  { text: "Which CSS property is used to set the background color?",
     options: ["background-color", "color", "bgcolor", "background"], 
     answer: "background-color" },
  { text: "What is the purpose of the `title` attribute in HTML?", 
    options: ["To specify the title of the page", "To provide a tooltip for an element", "To set the page's metadata", "To define the page's heading"], 
    answer: "To provide a tooltip for an element" }
];

let currentIndex = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.querySelector('.question-text');
const optionsEl = document.querySelector('.options');
const feedbackEl = document.getElementById('feedback');
const resultText = document.querySelector('.result-text');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
totalEl.textContent = questions.length;

function renderQuestion(idx) {
    const q = questions[idx];
    questionEl.textContent = `Question ${idx + 1}: ${q.text}`;
    optionsEl.innerHTML = '';
    q.options.forEach(opt => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, idx);
        li.appendChild(btn);
        optionsEl.appendChild(li);
    });
    feedbackEl.style.display = 'none';
}

function checkAnswer(selected, idx) {
    const q = questions[idx];
    const buttons = optionsEl.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === q.answer) {
            btn.style.backgroundColor = '#28a745'; 
        }
        if (btn.textContent === selected && selected !== q.answer) {
            btn.style.backgroundColor = '#dc3545'; 
        }
    });
    if (selected === q.answer) {
        score++;
        resultText.textContent = 'Correct!';
        resultText.className = 'result-text correct';
        userAnswers.push({ question: q.text, correct: true, answer: selected, questionNumber: idx + 1 });
    } else {
        resultText.textContent = `Wrong! The correct answer is "${q.answer}".`;
        resultText.className = 'result-text wrong';
        userAnswers.push({ question: q.text, correct: false, answer: selected, correctAnswer: q.answer, questionNumber: idx + 1 });
    }
    scoreEl.textContent = score;
    feedbackEl.style.display = 'block';
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        renderQuestion(currentIndex);
    } else {
        showResults();
    }
};

function showResults() {
    questionEl.textContent = 'Quiz completed!';
    optionsEl.innerHTML = '';
    nextBtn.style.display = 'none';
    let resultsHtml = '';
    userAnswers.forEach((answer, index) => {
        resultsHtml += `<p><strong>Question ${answer.questionNumber}: ${answer.question}</strong></p>`;
        if (answer.correct) {
            resultsHtml += `<p>Your answer: ${answer.answer} (Correct)</p>`;
        } else {
            resultsHtml += `<p>Your answer: ${answer.answer} (Wrong)</p>`;
            resultsHtml += `<p>Correct answer: ${answer.correctAnswer}</p>`;
        }
        resultsHtml += '<hr>';
    });
    resultsHtml += `<p>Your final score: ${score} / ${questions.length}</p>`;
    optionsEl.innerHTML = resultsHtml;
    feedbackEl.style.display = 'block';
}

renderQuestion(currentIndex);
