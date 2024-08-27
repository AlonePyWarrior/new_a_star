




// Define the correct answers for each question
const answers_of_questions = {
    "0": "4",
    "1": "2",
    "2": "3"
};
const course_parts_title = [
    "تاریخچه هوش مصنوعی",
    "تعریف هوش مصنوعی",
    "سطوح هوش مصنوعی",
    "کاربردهای هوش مصنوعی",
    "زبان هوش مصنوعی",
    "زبان هوش مصنوعی",
    "انواع هوش مصنوعی",
    "چرایی هوش مصنوعی",
    "زمستان هوش مصنوعی",
    "ایلیا سوستکاور",
    "کاربرد هوش مصنوعی در زندگی"
]
const current_co_part = document.querySelector(".current-active-part-txt");
// Define a function to check the answer correctness
function checkAnswerCorrectness(options, answers_of_questions, index) {
    let answer_correctness = false;
    options.forEach((option, option_index) => {
        if (option.checked) {
            if (option_index == answers_of_questions[index] - 1) {
                answer_correctness = true;
            }
        }
    });
    return answer_correctness;
}

// Define a function to disable options after submit button is clicked
function disableOptions(options, question) {
    options.forEach((option) => {
        option.disabled = true;
    });
    const question_options = question.querySelectorAll('.q_option');
    question_options.forEach((question_option) => {
        question_option.style.cursor = "no-drop";
    });
}

// Define a function to display the correct or incorrect message
function displayMessage(answer_correctness, question, answers_of_questions, index, correct_sound_effect, fail_sound_effect) {
    const co = question.querySelector(".submit-answer .correct");
    const inco = question.querySelector(".submit-answer .incorrect");
    const options_points = question.querySelectorAll('.checkmark');
    const outer_option_points = question.querySelectorAll(".q_option");
    let play_sound = true;

    if (answer_correctness == true) {
        co.classList.add("animate");
        if (play_sound == true) {
            correct_sound_effect.play();
        }
        play_sound = false;
    } else {
        inco.classList.add("animate");
        // Make the correct answer green
        options_points[answers_of_questions[index] - 1].style.backgroundColor = "#008200";
        outer_option_points[answers_of_questions[index] - 1].classList.add("correct");
        if (play_sound) {
            fail_sound_effect.play();
        }
        play_sound = false;
    }
}

// Define a function to toggle the display of question and answer
function toggleDisplay(question, answer, show) {
    if (show == 'question') {
        answer.style.display = 'none';
        question.style.display = 'block';
    } else if (show == 'answer') {
        question.style.display = 'none';
        answer.style.display = 'block';
    }
}

// Define a function to hide all course parts
function hideAllCourseParts(course_parts) {
    course_parts.forEach((course_part) => {
        course_part.style.display = "none";
    });
}

// Define a function to show a specific course part
function showCoursePart(course_part, display) {
    course_part.style.display = display;
}

// Define a function to create progress steps
function createProgressSteps(scroll_wrapper, course_parts) {
    for (let i = 0; i < course_parts.length; i++) {
        scroll_wrapper.appendChild(document.createElement("div"));
    }
}

// Define a function to update the current course part title
function updateCoursePartTitle(course_parts_title, active_course_part) {
    course_parts_title.textContent = course_parts_title[active_course_part];
}

// Define a function to handle the click event of the next section button
function handleNextSectionButtonClick(event, course_parts, active_course_part, progress_steps, current_co_part, course_parts_title, quiz_answer_submited) {
    //check that this is quiz-button clicked
    if (event.target.classList.contains("submit-quiz-btn")) {
        if (quiz_answer_submited === 0) {
            quiz_answer_submited++;
            event.target.querySelector(".submit_btn_text").textContent = "رفتن به قسمت بعدی";
        } else {
            // quiz naswer submited: goto next course-part
            quiz_answer_submited = 0;
            active_course_part++;
            showCoursePart(course_parts[active_course_part], "block grid");
            course_parts[active_course_part].scrollIntoView({ behavior: "smooth" });
            progress_steps.item(active_course_part).classList.add("completed");
            current_co_part.textContent = course_parts_title[active_course_part + 1];
        }
    } else {
        //check that it is the last next-btn-clicked
        if (active_course_part < goto_next_section_btns.length) {
            active_course_part++;
            progress_steps.item(active_course_part).classList.add("completed");
            event.target.style.display = "none";
            showCoursePart(course_parts[active_course_part], "block grid");
            course_parts[active_course_part].scrollIntoView({ behavior: "smooth" });
            current_co_part.textContent = course_parts_title[active_course_part + 1];
        }
    }
}

// Define a function to handle the click event of the video show button
function handleVideoShowButtonClick(event, qoutes, video_show_btn, video_sec, video_next_btn, index) {
    qoutes[index].style.display = "none";
    video_show_btn[index].style.display = "none";
    video_sec[index].style.display = "block";
    video_next_btn[index].style.display = "block";
}

// Define a function to handle the click event of the finish button
function handleFinishButtonClick(event) {
    window.location.replace("finish.html");
}

const course_parts = document.querySelectorAll(".course-part");
const goto_next_section_btns = document.querySelectorAll(".goto-next-btn");
let active_course_part = 0;
let quiz_answer_submited = 0;

// top progress bar navigation
hideAllCourseParts(course_parts);
showCoursePart(course_parts[0], "block grid");

// write comment for this code
// Get the scroll wrapper element
scroll_wrapper = document.getElementById("scroll_wrapper");
// Create progress steps based on the number of course parts
createProgressSteps(scroll_wrapper, course_parts);
progress_steps = scroll_wrapper.childNodes;

// Update the current course part title
updateCoursePartTitle(course_parts_title, active_course_part);

// Add click event listener to next section buttons
goto_next_section_btns.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleNextSectionButtonClick(event, course_parts, active_course_part, progress_steps, current_co_part, course_parts_title, quiz_answer_submited);
    });
});

const qoutes = document.querySelectorAll(".qoute");
const video_sec = document.querySelectorAll(".video-sec-container");
const video_show_btn = document.querySelectorAll(".qoute-btn");
const video_next_btn = document.querySelectorAll(".goto-next-video");

// Add click event listener to video show buttons
video_show_btn.forEach((video, index) => {
    video.addEventListener("click", (event) => {
        handleVideoShowButtonClick(event, qoutes, video_show_btn, video_sec, video_next_btn, index);
    });
});

// Add click event listener to finish button
document.querySelector(".finish-btn").addEventListener("click", (event) => {
    handleFinishButtonClick(event);
});
