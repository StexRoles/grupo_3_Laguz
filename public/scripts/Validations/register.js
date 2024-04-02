window.addEventListener("load", function () {

    // VALIDACION DE LOS INPUTS PARA ENVIAR EL FORMULARIO
    let formIsValid = false;

    // OBTENEMOS LOS INPUTS Y EL DIV DE SUS ERRORES
    let userInput = document.querySelector("#user");
    let divErrorUser = document.querySelector("#errorUser");

    let emailInput = document.querySelector("#email");
    let divErrorEmail = document.querySelector("#errorEmail");

    let passwordInput = document.querySelector("#password");
    let divErrorPassword = document.querySelector("#errorPassword");

    let repasswordInput = document.querySelector("#repassword");
    let divErrorRepassword = document.querySelector("#errorRepassword");

    // MOSTRAMOS LOS ERRORES DEL USUARIO
    userInput.addEventListener('keyup', function () {
        let userErrors = "";

        // VALIDACION DEL USUARIO
        if (userInput.value.length < 3) {
            userErrors = "* El campo de usuario debe tener al menos 3 caracteres";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (userErrors.length > 0) {
            divErrorUser.innerHTML = userErrors;
            divErrorUser.style.color = "#BF2020";
        } else {
            divErrorUser.innerHTML = "El usuario es válido";
            divErrorUser.style.color = "green";
        }
    });


    // MOSTRAMOS LOS ERRORES DEL EMAIL
    emailInput.addEventListener('keyup', function () {
        let emailErrors = "";

        //  EXPRESION REGULAR PARA VALIDAR EL EMAIL
        let emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailFormat.test(emailInput.value)) {
            emailErrors = "* El formato del correo no es válido";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (emailErrors.length > 0) {
            divErrorEmail.innerHTML = emailErrors;
            divErrorEmail.style.color = "#BF2020";
        } else {
            divErrorEmail.innerHTML = "El usuario es válido";
            divErrorEmail.style.color = "green";
        }
    });

    // MOSTRAMOS LOS ERRORES DE LA CONTRASEÑA
    passwordInput.addEventListener('keyup', function () {
        let passwordErrors = "";

        // VALIDACION DE LA CONTRASEÑA
        if (passwordInput.value.length < 9) {
            passwordErrors = "* La contraseña debe tener al menos 8 caracteres";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (passwordErrors.length > 0) {
            divErrorPassword.innerHTML = passwordErrors;
            divErrorPassword.style.color = "#BF2020";
        } else {
            divErrorPassword.innerHTML = "La contraseña es válida";
            divErrorPassword.style.color = "green";
        }
    });

    // MOSTRAMOS LOS ERRORES DE LA CONFIRMACION DE CONTRASEÑA
    repasswordInput.addEventListener('keyup', function () {
        let repasswordErrors = "";

        // VALIDACION DE LA CONFIRMACION DE CONTRASEÑA
        if (repasswordInput.value != passwordInput.value) {
            repasswordErrors = "* Las contraseña no coinciden";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (repasswordErrors.length > 0) {
            divErrorRepassword.innerHTML = repasswordErrors;
            divErrorRepassword.style.color = "#BF2020";
        } else {
            divErrorRepassword.innerHTML = "La contraseña es válida";
            divErrorRepassword.style.color = "green";
        }
    });


    // OBTENEMOS EL FORMULARIO
    let form = document.querySelector("#registerForm");

    // VALIDACION DEL FORMULARIO
    form.addEventListener("submit", function (event) {
        if (!formIsValid) {
            event.preventDefault();
        }
    });


});