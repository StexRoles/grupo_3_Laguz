window.addEventListener('load', function () {
    // Seleccionar los botones y el input
    let minusButtons = document.querySelectorAll('.minus');
    let plusButtons = document.querySelectorAll('.plus');
    let countInputs = document.querySelectorAll('.count');

    // Para cada conjunto de botones e input
    for (let i = 0; i < minusButtons.length; i++) {
        // Agregar event listener al botón "minus"
        minusButtons[i].addEventListener('click', function () {
            if (countInputs[i].value > 1) {
                countInputs[i].value--;
            }
        });

        // Agregar event listener al botón "plus"
        plusButtons[i].addEventListener('click', function () {
            countInputs[i].value++;
        });
    }
});