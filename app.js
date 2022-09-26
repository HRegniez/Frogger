const timerDisplay = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');
const startPauseBtn = document.querySelector('#start-pause');
const squares = document.querySelectorAll('.grid div');

const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let timerId;

let currentTime = 20;

//---------------------Init Position

let currentPosition = 76;

//----------------------------------------Move Frog

function moveFrog (e) {

    squares[currentPosition].classList.remove('frog');

    switch(e.key) {
        case 'ArrowLeft' :
            if (currentPosition % 9 !== 0) currentPosition -=1;
            break;
        case 'ArrowUp' :
            if (currentPosition > 8) currentPosition -=9;
            break;
        case 'ArrowRight' :
            if (currentPosition % 9 < 9 - 1) currentPosition +=1;
            break;
        case 'ArrowDown' :
            if (currentPosition < 72) currentPosition +=9;
            break;
    }

    squares[currentPosition].classList.add('frog');
    lose();
    win();

}

//-------------------------------------------------Animate Elements

function autoMoveElements () {
    currentTime --;
    timerDisplay.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarLeft(carRight));
    lose();
    win();
}




//---------------------------------Anim River Top

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;

        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;

        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;

        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;

        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}

 //-------------------------------Anim River Botom

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l2');
            break;

        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l3');
            break;

        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l4');
            break;

        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l5');
            break;

        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l1');
            break;
    }
}

//--------------------------------Anim Road Top

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;

        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;

        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;

    }
}

//-------------------------------Anim Road Botom

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c2');
            break;

        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c3');
            break;

        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c1');
            break;

    }
}

//----------------------------------Lose

function lose() {
    if (
        squares[currentPosition].classList.contains('c1') ||
        squares[currentPosition].classList.contains('l4') ||
        squares[currentPosition].classList.contains('l5') ||
        currentTime <= 0
    )  {
        scoreDisplay.textContent = 'You Lose !';
        clearInterval(timerId);
        squares[currentPosition].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

//------------------------------------Win !

function win() {
    if (
        squares[currentPosition].classList.contains('ending-block')
    ) {
        scoreDisplay.textContent = 'You Win !';
        clearInterval(timerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

//-----------------------------Game Loop

startPauseBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        document.addEventListener('keyup', moveFrog);
    }
})
