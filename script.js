let timeValue =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let TotalQuestions = 10;

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
 const continue_btn = info_box.querySelector(".buttons .restart");
// const continue_btn = info_box.querySelector(".buttons");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(timeValue); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}



// const restart_quiz = result_box.querySelector(".buttons .restart");
// const quit_quiz = result_box.querySelector(".buttons .quit");



const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < TotalQuestions - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
// Create an array to store the selected questions
let selectedQuestions = [];
let correcAns;
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  let currentQuestion;

  // Select a random question from questionSet1
 
    do {
      currentQuestion = questionSet1[Math.floor(Math.random() * questionSet1.length)];
    } while (selectedQuestions.includes(currentQuestion));
  
  selectedQuestions.push(currentQuestion); // Add the selected question to the array
  correcAns = currentQuestion.answer; //getting correct answer from array
  let que_tag =
    "<span>" +
    (index + 1) +
    ". " +
    currentQuestion.question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    currentQuestion.options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[3] +
    "</span></div>";

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

  
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    // let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}


function showResult() {
    

    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.remove("activeQuiz"); // hide quiz box
    result_box.classList.add("activeResult"); // show result box

    const scoreText = result_box.querySelector(".score_text");
    
    if (userScore === 10) {
        let scoreTag = '<div class="circle" style="background-color: black ">10/10</div><div class="discount">50% discount</div><div class="congrats">Congratulations! 🎉</div>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore >= 7) {
        let scoreTag = '<div class="circle" style="background-color: black ">'+userScore+'/'+ TotalQuestions+'</div><div class="discount">30% discount</div><div class="congrats">Congratulations! 🎉</div>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore >= 5) {
        let scoreTag = '<div class="circle" style="background-color: black ">'+userScore+'/'+ TotalQuestions+'</div><div class="discount">20% discount</div><div class="congrats">Congratulations! 🎉</div>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<div class="circle" style="background-color: black ">'+userScore+'/'+ TotalQuestions+'</div><div class="congrats">Better Luck next time</div>';
        scoreText.innerHTML = scoreTag;
    }

    const restart_quiz = result_box.querySelector(".buttons .restart");
    const quit_quiz = result_box.querySelector(".buttons .quit");

}



function startTimer(time){
    time--;
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            // let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function updateProgressBarColor(progress) {
    const progressBar = document.querySelector('.quiz_box header .time_line');
    const redValue = Math.round(255 * progress);
    const greenValue = Math.round(255 * (1 - progress));
    const color = `rgb(${redValue}, ${greenValue}, 0)`;
    progressBar.style.width = `${progress * 100}%`;
    progressBar.style.background = color;
  }

function startTimerLine(time) {
    //find width of quiz_box
    time_line.style.width = 0 + "px"; //initial width of time_line is 0
    var widthValue = quiz_box.clientWidth;
    console.log("width=" + widthValue);
    var maxWidth = widthValue; // target width for time_line
    var time = 0; // initialize the time variable
    // calculate the width increment per time unit
    var increment = maxWidth / timeValue;


    
    counterLine = setInterval(timer, 100);
    
    function timer() {
      time += 0.1; // upgrade time value by 1
      console.log("time=" + time);
      var width = time * increment; // calculate the current width based on time and increment
       // set the width of time_line
      var currentProgress = width/maxWidth
        updateProgressBarColor(currentProgress);
      
      if (width >= maxWidth) {
        clearInterval(counterLine); // clear counterLine
      }
      else{
        time_line.style.width = width + "px"; // increase width of time_line by increment
      }
    }
  }
function queCounter(index){
   
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ TotalQuestions +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}
