window.addEventListener("load", function () {

    // VALIDACION DE LOS INPUTS PARA ENVIAR EL FORMULARIO
    let formIsValid = true;

    // OBTENEMOS LOS INPUTS
    let nameInput = document.querySelector("#name");
    let divErrorName = document.querySelector("#errorName");

    let avatarInput = document.querySelector("#avatar");
    let divErrorAvatar = document.querySelector("#errorAvatar");

    // MOSTRAMOS LOS ERRORES DEL NOMBRE
    nameInput.addEventListener('keyup', function () {
        let nameErrors = "";

        // VALIDACION DEL USUARIO
        if (nameInput.value.length < 3) {
            nameErrors = "* El campo de nombre debe tener al menos 3 caracteres";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (nameErrors.length > 0) {
            divErrorName.innerHTML = nameErrors;
            divErrorName.style.color = "#E44242";
        } else {
            divErrorName.innerHTML = "El nombre es válido";
            divErrorName.style.color = "#2ACF41";
        }
    });

    // VALIDACION DEL AVATAR
    avatarInput.addEventListener('change', function () {
        let avatarErrors = "";
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // extensiones permitidas

        if (!allowedExtensions.exec(avatarInput.value)) {
            avatarErrors = "* El formato de imagen no es válido. Solo se permiten .jpg, .jpeg, .png, .gif";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (avatarErrors.length > 0) {
            divErrorAvatar.innerHTML = avatarErrors;
            divErrorAvatar.style.color = "#E44242";
        } else {
            divErrorAvatar.innerHTML = "El formato de imagen es válido";
            divErrorAvatar.style.color = "#2ACF41";
        }
    });


    // OBTENEMOS EL FORMULARIO
    let form = document.querySelector("#profileForm");

    // VALIDACION DEL FORMULARIO
    form.addEventListener("submit", function (event) {
        if (!formIsValid) {
            event.preventDefault();
        }
    });
});