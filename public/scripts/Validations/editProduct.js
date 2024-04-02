window.addEventListener("load", function () {

    // VALIDACION DE LOS INPUTS PARA ENVIAR EL FORMULARIO
    let formIsValid = true;

    // OBTENEMOS LOS INPUTS
    let nameInput = document.querySelector("#name");
    let divErrorName = document.querySelector("#errorName");

    let priceInput = document.querySelector("#price");
    let divErrorPrice = document.querySelector("#errorPrice");

    let discountInput = document.querySelector("#discount");
    let divErrorDiscount = document.querySelector("#errorDiscount");

    let imageInput = document.querySelector("#image");
    let divErrorImage = document.querySelector("#errorImage");

    let descriptionInput = document.querySelector("#description");
    let divErrorDescription = document.querySelector("#errorDescription");

    // MOSTRAMOS LOS ERRORES DEL NOMBRE
    nameInput.addEventListener('keyup', function () {
        let nameErrors = "";

        // VALIDACION DEL NOMBRE
        if (nameInput.value.length < 6) {
            nameErrors = "* El campo de nombre debe tener al menos 5 caracteres";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (nameErrors.length > 0) {
            divErrorName.innerHTML = nameErrors;
            divErrorName.style.color = "#BF2020";
        } else {
            divErrorName.innerHTML = "El nombre es válido";
            divErrorName.style.color = "green";
        }
    });

    // MOSTRAMOS LOS ERRORES DEL PRECIO
    priceInput.addEventListener('keyup', function () {
        let priceErrors = "";

        // VALIDACION DEL PRECIO
        let numberFormat = /^[0-9]+$/;

        if (!numberFormat.test(priceInput.value)) {
            priceErrors = "* El campo de precio solo puede contener números";
            formIsValid = false;
        } else if (priceInput.value.length < 4) {
            priceErrors = "* El campo de precio debe tener al menos 4 digitos";
            formIsValid = false; 
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (priceErrors.length > 0) {
            divErrorPrice.innerHTML = priceErrors;
            divErrorPrice.style.color = "#BF2020";
        } else {
            divErrorPrice.innerHTML = "El precio es válido";
            divErrorPrice.style.color = "green";
        }
    });

    // MOSTRAMOS LOS ERRORES DEL DESCUENTO
    discountInput.addEventListener('keyup', function () {
        let discountErrors = "";

        // VALIDACION DEL DESCUENTO
        let numberFormat = /^[0-9]+$/;

        if (discountInput.value.length < 1) {
            discountErrors = "* El campo de descuento debe tener al menos 1 número, incluido el 0";
            formIsValid = false;
        } else if (discountInput.value.length > 2) {
            discountErrors = "* El campo de descuento no puede ser mayor a 100";
            formIsValid = false;
        } else if (!numberFormat.test(discountInput.value)) {
            discountErrors = "* El campo de descuento solo puede contener números";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (discountErrors.length > 0) {
            divErrorDiscount.innerHTML = discountErrors;
            divErrorDiscount.style.color = "#BF2020";
        } else {
            divErrorDiscount.innerHTML = "El descuento es válido";
            divErrorDiscount.style.color = "green";
        }
    });

    // VALIDACION DE LA IMAGEN
    imageInput.addEventListener('change', function () {
        let imageErrors = "";
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i; // extensiones permitidas

        if (!allowedExtensions.exec(imageInput.value)) {
            imageErrors = "* El formato de imagen no es válido. Solo se permiten .jpg, .jpeg, .png, .gif, .webp";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (imageErrors.length > 0) {
            divErrorImage.innerHTML = imageErrors;
            divErrorImage.style.color = "#BF2020";
        } else {
            divErrorImage.innerHTML = "El formato de imagen es válido";
            divErrorImage.style.color = "green";
        }
    });

    // MOSTRAMOS LOS ERRORES DEL NOMBRE
    descriptionInput.addEventListener('keyup', function () {
        let descriptionErrors = "";

        // VALIDACION DEL USUARIO
        if (descriptionInput.value.length < 21) {
            descriptionErrors = "* El campo de descripción debe tener al menos 20 caracteres";
            formIsValid = false;
        } else {
            formIsValid = true;
        }

        // MOSTRAMOS LOS ERRORES O EL MENSAJE DE EXITO
        if (descriptionErrors.length > 0) {
            divErrorDescription.innerHTML = descriptionErrors;
            divErrorDescription.style.color = "#BF2020";
        } else {
            divErrorDescription.innerHTML = "La descripción es válida";
            divErrorDescription.style.color = "green";
        }
    });


    // OBTENEMOS EL FORMULARIO
    let form = document.querySelector("#editProductForm");

    // VALIDACION DEL FORMULARIO
    form.addEventListener("submit", function (event) {
        if (!formIsValid) {
            event.preventDefault();
        }
    });
});