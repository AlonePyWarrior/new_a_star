class Quiz{
    constructor(containerSelector, quizAnswerSelector){
        this.container = containerSelector;
        this.answerContainer = quizAnswerSelector;
        this.options = this.container.querySelectorAll('input[type="radio"]');
        this.showExplanationButton =  this.container.querySelector('.show-explanation-btn');
        this.showQuestionButton = this.answerContainer.querySelector('.show_question');
        this.question_body = this.answerContainer.querySelector('.body');
        this.submit_btn = this.container.querySelector(".submit-quiz-btn");
        this.options_points = this.container.querySelectorAll('.checkmark');
        this.outer_option_points = this.container.querySelectorAll(".q_option");
        this.play_sound = true;
        
    }
    initQuiz(){
        this.showExplanationButton.style.display = 'none';
        this.submit_btn.disabled = true;
        this.options.forEach((option) => {
            option.checked = false;

            // Add click event listener to options
            option.addEventListener('click', () => {
                this.submit_btn.disabled = false;
            });
        });

        
        // Add click event listener to show explanation button
        this.showExplanationButton.addEventListener('click', () => {
            this.container.style.display = 'none';
            this.answerContainer.style.display = 'block';
        });

        // Add click event listener to show question button
        this.showQuestionButton.addEventListener('click', () => {
            this.answerContainer.style.display = 'none';
            this.container.style.display = 'block';
        
        });


    }

}


const correct_sound_effect = document.querySelector("#correct_audio_sound_effect");
const fail_sound_effect = document.querySelector("#failed_audio_sound_effect");


const questions = document.querySelectorAll('.quiz.quiz-part');
const answers = document.querySelectorAll('.quiz-answer');
questions.forEach((question, index) => {
    const quiz = new Quiz(question, answers[index]);
    quiz.initQuiz();
    alert("Hello Wordl");
})



const answers_of_short_quizes = {
    // first quiz
    "0":{
        "0" : `<p class="text">
                کاملا درسته.
                </p>
                <p class="text">
                        مقدار تابع هیوریستیک در بلاک سمت راست برابر با 11 است که کمتر از مقدار تابع هیوریستیک در بلاک سمت چپ به مقدار 13 است. بنابراین بر اساس الگوریتم G-BFS وضعتی که دارای مقدار کمتر تابع هیوریستیک است به عنوان حالت بعدی انتخاب میشود.
                </p>
                `,
        "1": `<p class="text">
                مقدار تابع هیوریستیک (فاصله منهتن تا وضعیت هدف) خانه سمت چپ برابر با 13 است که بیشتر از مقدار خانه سمت راست با مقدار هیوریستیک 11 است بنابراین خانه سمت چپ به عنوان وضعیت بعدی انتخاب نمی شود</p>`
        },
    // second quiz    
}
sh_quizes = document.querySelectorAll(".sh-quiz");
sh_quizes.forEach((sh_quiz , quiz_index) => {
    const sh_quiz_btns = sh_quiz.querySelectorAll(".short-quiz-btn");
    for (let i = 0; i < sh_quiz_btns.length; i++) {
        sh_quiz_btns[i].addEventListener("click", () => {
            sh_quiz_btns[i].style.backgroundColor = "#dbdbdb";
            sh_answers[quiz_index].style.display = "block"; 
            scroll_to_pos(sh_answers[quiz_index]);
            
            sh_btns_to_diable = sh_quiz_btns[i].parentElement.querySelectorAll(".short-quiz-btn");
            sh_btns_to_diable.forEach((sh_btn_to_diable) =>{
                sh_btn_to_diable.disabled = true;
                sh_btn_to_diable.style.cursor = "no-drop";
            
                
            });
            sh_answers[quiz_index].querySelector(".sh-answer-text").innerHTML = answers_of_short_quizes[quiz_index][i];
        });
    }
    
});

class ShortQuiz{
    constructor(){

    }

}



