const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const addJump = () => mario.classList.add('jump');
const removeJump = () => mario.classList.remove('jump');

const jump = () => {
    addJump();
    setTimeout(removeJump, 500);
}

const pointsScore = (points) => {
    localStorage.setItem('pontos', JSON.stringify(points));
};

const score = (pipePosition) => {
    const score = document.getElementById('score');
    let pontos = JSON.parse(localStorage.getItem('pontos'));
    if(pipePosition >= 30 && pipePosition <= 38) {
        pontos += 1;
        pointsScore(pontos);
    }
    score.innerHTML = `SCORE: ${pontos}`;
};

const eventDiv = () => {
    const div = document.querySelector('.relaunch');

    div.addEventListener('mouseover', () => {
        div.style.backgroundColor = 'white';
    });

    div.addEventListener('mouseout', () => {
        div.style.backgroundColor = 'rgb(34, 160, 35)';
    });

    div.addEventListener('click', () => {
        location.reload();
    });
}

const relaunch = () => {
    const divPai = document.querySelector('.game-board');
    const div = document.createElement('div');

    div.classList.add('relaunch');
    div.innerHTML = 'REINICIAR';

    divPai.appendChild(div);
    eventDiv();
}

const logicalGame = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '73px';
    mario.style.marginLeft = '50px';

    relaunch();
    
    clearInterval(loop);
    }

    score(pipePosition);
};

const loop = setInterval(logicalGame , 10);

document.addEventListener('keydown', jump);

window.onload  =  localStorage.setItem('pontos', 0);