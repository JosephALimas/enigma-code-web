const max_int = 5;
let solutions = [0, 0, 0, 0, 0];
let real_solutions = [
    Math.floor(Math.random() * max_int),
    Math.floor(Math.random() * max_int),
    Math.floor(Math.random() * max_int),
    Math.floor(Math.random() * max_int),
    Math.floor(Math.random() * max_int)
];
console.log(real_solutions);

let rotation = 0;
let selectedCircle = null;
let circle_numbr = "";
let solved_flag = false;
const rotations = {
    circle1: 0,
    circle2: 0,
    circle3: 0,
    circle4: 0,
    circle5: 0
};


function selectCircle(circleClass) {
    circle_numbr = circleClass;
    selectedCircle = document.querySelector(`.${circleClass}`);
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('selected');
    });
    selectedCircle.classList.add('selected');
    
    rotation = rotations[circleClass];
    selectedCircle.style.transform = `rotate(${rotation}deg)`;
    const iconStrip = selectedCircle.querySelector('.icon-strip');
    if (iconStrip) {
        iconStrip.style.transform = `rotate(${-rotation}deg)`;
    }
    console.log(circle_numbr);
}


function rotateSelectedCircle(direction) {
    if (!selectedCircle) return;
    if (direction === 'right') {
        rotation += 72;
    } else if (direction === 'left') {
        rotation -= 72;
    }

    selectedCircle.style.transform = `rotate(${rotation}deg)`;
    const iconStrip = selectedCircle.querySelector('.icon-strip');
    if (iconStrip) {
        iconStrip.style.transform = `rotate(${-rotation}deg)`;
    }

    rotations[circle_numbr] = rotation;

    switch (circle_numbr) {
        case 'circle1':
            updateSolution(0, direction);
            break;
        case 'circle2':
            updateSolution(1, direction);
            break;
        case 'circle3':
            updateSolution(2, direction);
            break;
        case 'circle4':
            updateSolution(3, direction);
            break;
        case 'circle5':
            updateSolution(4, direction);
            break;
        default:
            break;
    }

    console.log(solutions);
}

function updateSolution(index, direction) {
    if (direction === 'right') {
        solutions[index] = (solutions[index] + 1) % max_int;
    } else if (direction === 'left') {
        solutions[index] = (solutions[index] - 1 + max_int) % max_int;
    }

    if (solutions[index] == real_solutions[index]) {
        compararSoluciones(solutions, real_solutions)
    }

}

function compararSoluciones(arr1, arr2) {
    for (let i = 0; i < 5; i++) {
        if (arr1[i] !== arr2[i]) {
            solved_flag = false;
            return; 
        }
    }
    solved_flag = true;
    changeHighlightStyle();
}


document.addEventListener('DOMContentLoaded', (event) => {
    let segundos = 0;
    let intervalId;
    const contadorElemento = document.getElementById('contador');

    function actualizarContador() {
        segundos++;
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        const minutosFormateados = minutos.toString().padStart(2, '0');
        const segundosFormateados = segundosRestantes.toString().padStart(2, '0');

        contadorElemento.textContent = `${minutosFormateados}:${segundosFormateados}`;
    }

    intervalId = setInterval(actualizarContador, 1000);

    window.stopCounter = function() {
        clearInterval(intervalId);
    };

    window.changeHighlightStyle = function() {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let sheet = document.styleSheets[i];

            for (let j = 0; j < sheet.cssRules.length; j++) {
                let rule = sheet.cssRules[j];

                if (rule.selectorText === '.loose') {
                    rule.style.display = 'none';
                }
                else if (rule.selectorText === '.hidden') {
                    rule.style.removeProperty('display');
                    document.getElementById('circ1').className = "circle circle1 shake";
                    document.getElementById('circ2').className = "circle circle2 shake";
                    document.getElementById('circ3').className = "circle circle3 shake";
                    document.getElementById('circ4').className = "circle circle4 shake";
                    document.getElementById('circ5').className = "circle circle5 shake";
                }
                else if (rule.selectorText === '.up-button') {
                    rule.style.display = 'none';
                }
                else if (rule.selectorText === '.down-button') {
                    rule.style.display = 'none';
                }

            }
        }
        stopCounter();
    };
});