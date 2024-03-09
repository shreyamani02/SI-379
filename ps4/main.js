let questions = [];
let answers = [];
let correct_answers = [];
let clicked = 0;
let correct_counter = 0;
let total = 0;

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

fetch('https://the-trivia-api.com/api/questions')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < 10; ++i){
        questions.push(data[i]['question']);
        correct_answers.push(data[i]['correctAnswer']);

        let all_ans = data[i]['incorrectAnswers'];
        all_ans.push(data[i]['correctAnswer']);
        all_ans = shuffleArray(all_ans);
        answers.push(all_ans);
        console.log(answers)
    }
    write_questions(questions, answers, correct_answers);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function write_questions(questions, answers, correct_answers){
    for (let i = 0; i < 10; ++i){
        let q = document.createElement('ul');
        q.innerText = questions[i];
        for (let j = 0; j < 4; ++j){
            let ans = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = answers[i][j];
            ans.appendChild(button);

            if (ans.innerText == correct_answers[i]){
                ans.classList.add('correct');
            }
            q.appendChild(ans);
            button.addEventListener('click', () => {
                const ulElement = button.closest('ul');
                const allButtons = ulElement.querySelectorAll('button');
                allButtons.forEach(btn => {
                    btn.disabled = true;
                });
                if (ans.classList.contains('correct')){
                    button.classList.add('correct-clicked');
                    correct_counter += 1;
                }
                else{
                    button.classList.add('incorrect-clicked');
                }
                total += 1;
                document.querySelector('p').innerText = 'Correct Counter: ' + correct_counter + ' / ' + total;
            });
        }
        document.body.append(q);
    }
}
