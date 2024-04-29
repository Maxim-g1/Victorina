// Массив с вопросами, вариантами ответов и правильными ответами


let questions = [
    {
        question: "В каком году началась Великая Отечественная война",
        options: ["1941", "1939", "1942", "1938"],
        correctAnswer: "1941"
    },
    {
        question: "Чем увлекался Адольф Гитлер до становления фюрером?",
        options: ["Архитектурой", "Садоводством", "Футболом", "Живописью"],
        correctAnswer: "Живописью"
    },
    {
        question: "Кто Иосиф Сталин по национальности?",
        options: ["Грузин", "Русский", "Турок", "Азербайджанец"],
        correctAnswer: "Грузин"
    },
    {
        question: "Как расшивровывается обревиатура СССР",
        correctAnswer: "союз советских социалистических республик"
    },
    {
        question: "В каком году пала Западная Римская империя?",
        options: ["486", "1015", "504", "476"],
        correctAnswer: "476"
    },
    {
        question: "Кто в 1914 году убил эрцгерцога Австрии - Франца Фердинанда",
        options: ["Адольф Гитлер", "Александр Керенский", "Владимир Гачинович", "Гаврило Принцип"],
        correctAnswer: "Гаврило Принцип"
    },
    {
        question: "Какого числа мы победили в Великой Отечесвенной войне(пример ответа: 4 марта 1234 года)",
        correctAnswer: "9 мая 1945 года"
    },
    {
        question: "Кто в 1914 году убил эрцгерцога Австрии - Франца Фердинанда",
        options: ["Адольф Гитлер", "Александр Керенский", "Владимир Гачинович", "Гаврило Принцип"],
        correctAnswer: "Гаврило Принцип"
    },
]

let currentQuestions = 0 // Текущий вопрос
let correctAnswers = 0 // Количество правильных ответов


// Фунция для отображения текущего вопроса и вариантов ответов
function displayQuestion() {
    let questionElement = document.getElementById("question")
    questionElement.textContent = `Вопрос ${currentQuestions + 1}: ${questions[currentQuestions].question}`
    let optionsElement = document.getElementById("options")
    optionsElement.innerHTML = ''// Очищаем содержимое блока optionsElement

    const answerInput = document.getElementById('answerInput')
    answerInput.innerHTML = ''
    if ('options' in questions[currentQuestions]) {
        let optionsArray = questions[currentQuestions].options
        optionsElement.classList.add('options')
        answerInput.classList.remove('answerInput1')
        optionsArray.forEach((option) => {
            let button = document.createElement('button')
            optionsElement.append(button)
            button.textContent = option
            button.classList.add('btnOp')
        })

    } else {

        let input = document.createElement('input')
        let btn = document.createElement('button')
        btn.textContent = 'Отправить ответ'
        answerInput.append(input, btn)
        answerInput.classList.add('answerInput1')
        input.classList.add('inp')
        optionsElement.classList.remove('options')
        btn.addEventListener('click', () => {
            nextQuestion(input.value)
        })
    }




    optionsElement.addEventListener('click', (e) => {
        let target = e.target
        // Вызвать функцию для перехода к следующиму вопросу и передать текстовое значение кнопки на которую кликнули
        nextQuestion(target.textContent)

    }, { once: true })



}
let otvet = []
// Фунция перехода к следующиму вопросу
function nextQuestion(answer) {
    // Если кликнули на правильный ответ то увеличить на 1 счётчик правильных ответов
    if (answer.toLowerCase() === questions[currentQuestions].correctAnswer.toLowerCase()) {
        correctAnswers++
    } else {
        otvet.push(` Вопрос ${currentQuestions + 1}: ${questions[currentQuestions].question}`)
        console.log(questions[currentQuestions].question)
    }
    currentQuestions++ // Перейти к следующиму вопросу
    if (currentQuestions < questions.length) {
        displayQuestion()//отобразить следующий вопрос
    }
    else {
        //отобразить результаты теста
        displayResult()
    }
}


//функция отображения результатов теста
function displayResult() {
    let questionElement = document.getElementById("question")
    let optionsElement = document.getElementById("options")
    let resultElement = document.getElementById("result")
    let oshibkaElement = document.getElementById('oshibka')
    let procent = Math.round(correctAnswers / questions.length * 100)
    let ocenka = Math.floor((correctAnswers + 4) * 0.56)


    questionElement.style.display = 'none' // Отключить видимость блока вопросов
    optionsElement.style.display = 'none'

    resultElement.textContent = ` ваша оценка ${ocenka} у вас правильных ответов ${correctAnswers} из ${questions.length} (${procent}%),
    Вопросы на которые вы ответили неправильно: `//отобразить результаты теста

    otvet.forEach((otvet) => {
        let div = document.createElement('div')
        div.append(otvet)
        resultElement.append(div)
    })
}



displayQuestion()

