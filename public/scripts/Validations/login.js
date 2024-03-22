window.addEventListener("load", function () {

    // OBTENEMOS EL FORMULARIO
    let form = document.querySelector("#loginForm");

    // LE AGREGAMOS UN EVENTO DE SUBMIT PARA EVITAR QUE SE ENVIE
    form.addEventListener("submit", function (event) {

        // OBTENEMOS LOS INPUTS
        let identifierInput = document.querySelector("#identifier");
        let passwordInput = document.querySelector("#password");

        // GUARDAMOS LO ERRORES
        let identifierErrors = "";
        let passwordErrors = "";

        // OBTENEMOS LOS ERRORES DEL INPUT DE EMAIL Y USUARIO
        if (identifierInput.value == "") {
            identifierErrors = "* El campo de email o usuario no puede estar vacío";
        } else if (identifierInput.value.length < 3) {
            identifierErrors = "* El campo de email o usuario debe tener al menos 3 caracteres";
        }

        // OBTENEMOS LOS ERRORES DEL INPUT DE EMAIL Y USUARIO
        if (passwordInput.value == "") {
            passwordErrors = "* El campo de contraseña no puede estar vacío";
        } else if (passwordInput.value.length < 4) {
            passwordErrors = "* El campo de contraseña debe tener al menos 4 caracteres"; 
        }

        // MOSTRAMOS LOS ERRORES DEL USUARIO Y CONTRASEÑA
        let divErrorIdentifier = document.querySelector("#errorIndetifier");
        if (identifierErrors.length > 0) {
            event.preventDefault();
            divErrorIdentifier.innerHTML = "";
            divErrorIdentifier.innerHTML += identifierErrors;
        } else {
            divErrorIdentifier.innerHTML = "";
        }

        // MOSTRAMOS LOS ERRORES DEL PASSWORD
        let divErrorPassword = document.querySelector("#errorPassword");
        if (passwordErrors.length > 0) {
            event.preventDefault();
            divErrorPassword.innerHTML = "";
            divErrorPassword.innerHTML += passwordErrors;
        } else {
            divErrorPassword.innerHTML = "";
        }

        // SI NO HAY ERRORES ENVIAMOS EL FORMULARIO
        if (identifierErrors.length == 0 && passwordErrors.length == 0) {
            form.submit();
        }
    });

});