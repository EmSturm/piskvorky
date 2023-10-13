import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const allButtons = document.querySelectorAll('.button');

const convertToSymbol = (button) => {
    if (button.classList.contains('board__field--circle')) {
        return 'o'
    }
    else if (button.classList.contains('board__field--cross')) {
        return 'x'
    }
    else {
        return '_'
    }
}

const makeCircleAndCross = (event) => {
    if (currentPlayer === 'circle') {
        event.target.classList.add('board__field--circle');
        currentPlayer = 'cross';
        document.querySelector('#play__sign').src = 'circle.svg'
        document.querySelector('#play__sign').alt = 'právě hraje kroužek'
        document.querySelectorAll('.button').disabled = true
        
        const allButtonsArray = Array.from(allButtons)
        const symbolsArray = allButtonsArray.map((button) => convertToSymbol(button)) 
        console.log(symbolsArray)

        const result = findWinner(symbolsArray) 
            
        if (result === 'x') {
            alert("Vyhrál křížek!");
        } else if (result === 'o') {
            alert("Vyhrálo kolečko!");
        } else if (result === 'tie') {
            alert("Nerozhodně!");
        } else if (result === 'null') {
            alert("Hra ještě probíhá!");
        }  
    } else  {
        event.target.classList.add('board__field--cross');
        currentPlayer = 'circle'; 
        document.querySelector('#play__sign').src = 'cross.svg'
        document.querySelector('#play__sign').alt = 'právě hraje křížek'
        document.querySelectorAll('.button').disabled = true
    }
    event.target.disabled = true
    } 

allButtons.forEach((button) => {
    button.addEventListener('click', makeCircleAndCross);
}) 
