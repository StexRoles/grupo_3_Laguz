window.addEventListener("load", function () {

    // VALIDACION DE LOS INPUTS PARA ENVIAR EL FORMULARIO
    let formIsValid = false;
    

        // OBTENEMOS LOS INPUTS
        let identifierInput = document.querySelector("#identifier");
        let divErrorIdentifier = document.querySelector("#errorIndetifier");

        let passwordInput = document.querySelector("#password");
        let divErrorPassword = document.querySelector("#errorPassword");

        // MOSTRAMOS LOS ERRORES DEL USUARIO Y CONTRASEÑA
        identifierInput.addEventListener('keyup', function () {
            let identifierErrors = "";
    
            // VALIDACION DEL USUARIO
            if (identifierInput.value.length < 3) {
                identifierErrors = "* El campo de usuario o email debe tener al menos 3 caracteres";
                formIsValid = false;
            } else {
                formIsValid = true;
            }
    
            // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
            if (identifierErrors.length > 0) {
                divErrorIdentifier.innerHTML = identifierErrors;
                divErrorIdentifier.style.color = "#BF2020";
            } else {
                divErrorIdentifier.innerHTML = "El usuario o email es válido";
                divErrorIdentifier.style.color = "green";
            }
        });

        // MOSTRAMOS LOS ERRORES DEL PASSWORD
        passwordInput.addEventListener('keyup', function () {
            let passwordErrors = "";
    
            // VALIDACION DE LA CONTRASEÑA
            if (passwordInput.value.length < 4) {
                passwordErrors = "* La contraseña debe tener al menos 4 caracteres";
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


    // OBTENEMOS EL FORMULARIO
    let form = document.querySelector("#loginForm");

    // VALIDACION DEL FORMULARIO
    form.addEventListener("submit", function (event) {
        if (!formIsValid) {
            event.preventDefault();
        }
    });
});