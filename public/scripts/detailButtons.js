window.addEventListener('load', function () {
    // Seleccionar los botones y el input
    let minusButton = document.getElementById('minus');
    let plusButton = document.getElementById('plus');
    let countInput = document.getElementById('count');

    // Agregar event listener al botón "minus"
    minusButton.addEventListener('click', function () {
        if (countInput.value > 1) {
            countInput.value--;
        }
    });

    // Agregar event listener al botón "plus"
    plusButton.addEventListener('click', function () {
        countInput.value++;
    });

    // Seleccionar el botón
    let favoriteButton = document.getElementById('favorite');

    // Crear una variable para rastrear el estado del botón
    let isRed = false;

    // Agregar event listener al botón
    favoriteButton.addEventListener('click', function () {
        if (isRed) {
            // Si el botón está en estado "rojo", cambiar su color de fondo a su color original
            this.style.color = '';
            isRed = false;
        } else {
            // Si el botón no está en estado "rojo", cambiar su color de fondo a rojo
            this.style.color = 'red';
            isRed = true;
        }
    });
});