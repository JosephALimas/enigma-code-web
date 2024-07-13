// Declaramos el valor máximo que vamos a generar para el puzzle
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

function selectCircle(circleClass) {
    circle_numbr = circleClass;
    selectedCircle = document.querySelector(`.${circleClass}`);
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('selected');
    });
    selectedCircle.classList.add('selected');
    // Reseteo de rotación a 0 cuando se selecciona un nuevo círculo
    rotation = 0;
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
        rotation += 90;
    } else if (direction === 'left') {
        rotation -= 90;
    }

    selectedCircle.style.transform = `rotate(${rotation}deg)`;
    const iconStrip = selectedCircle.querySelector('.icon-strip');
    if (iconStrip) {
        iconStrip.style.transform = `rotate(${-rotation}deg)`;
    }

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
            break; 
        }
    }
    solved_flag = true;
}