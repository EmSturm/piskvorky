let currentPlayer = 'circle';


const makeCircle = (event) => {
    if (currentPlayer === 'circle') {
        event.target.classList.remove('board__field--cross');
        event.target.classList.add('board__field--circle');
        currentPlayer = 'cross';
    } else  {

        event.target.classList.remove('board__field--circle');
        event.target.classList.add('board__field--cross');
        currentPlayer = 'circle'; 
    }
}
       
    

document.querySelector('#button__one').addEventListener('click', makeCircle)
document.querySelector('#button__two').addEventListener('click', makeCircle)
document.querySelector('#button__three').addEventListener('click', makeCircle)
document.querySelector('#button__four').addEventListener('click', makeCircle)
document.querySelector('#button__five').addEventListener('click', makeCircle)
document.querySelector('#button__six').addEventListener('click', makeCircle)
document.querySelector('#button__seven').addEventListener('click', makeCircle)
document.querySelector('#button__eight').addEventListener('click', makeCircle)
document.querySelector('#button__nine').addEventListener('click', makeCircle)
document.querySelector('#button__ten').addEventListener('click', makeCircle)
