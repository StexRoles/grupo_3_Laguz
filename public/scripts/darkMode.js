window.addEventListener('load', () => {
    let buttonDark = document.querySelector('#switch');

    // Desactivar temporalmente las transiciones
    buttonDark.style.transition = 'none';
    buttonDark.style.setProperty("--after-transition", 'none');

    // traemos los elementos necesarios
    let header = document.querySelector('header');
    let navCategories = document.querySelectorAll('.nav-categorias a');
    let navCategoriesUl = document.querySelector('.nav-categorias ul');
    let navCategoriesLi = document.querySelectorAll('.nav-categorias ul li');
    let footer = document.querySelector('footer');
    let footerLinks = document.querySelectorAll('.enlaces a');
    let contactanos = document.querySelector('.contactanos');
    let massageInf = document.querySelector('.mensaje-inf p');
    let bannerMarcas = document.querySelector('.slider-box-marcas');
    let main = document.querySelector('main');
    let sectionTitle = document.querySelectorAll('.titulo-contenedor');
    let detailProductContainer = document.querySelector('.contenedor-detalles-producto');
    let productInformationP = document.querySelectorAll('.informacion-producto p');
    let productInformationH3 = document.querySelector('.informacion-producto h3');
    let buttonAmount = document.querySelector('.boton-cantidad p');
    let buttonFavoritesP = document.querySelector('.boton-favoritos p');
    let buttonFavoritesButton = document.querySelector('.boton-favoritos button');
    let loginContainer = document.querySelector('.contenedor-login');
    let titleLogin = document.querySelector('.titulo-login');
    let loginContainerA = document.querySelectorAll('.contenedor-login a');
    let titleNewProduct = document.querySelector('.contenedor-titulo h2');
    let mainContainerNewProduct = document.querySelector('.contenedor-principal');
    let notFount = document.querySelector('.not-found-text');
    let registerContainer = document.querySelector('.contenedor-register');
    let registerContainerA = document.querySelectorAll('.contenedor-register a');
    let titleRegister = document.querySelector('.titulo-register');
    let titleEditProfile = document.querySelector('.titleEditProfile');
    let labelsEditProfile = document.querySelectorAll('.user-edit-information label');

    // Desactivar temporalmente las transiciones
    header.style.transition = 'none';
    navCategories.forEach((navCategory) => {
        navCategory.style.transition = 'none';
    });
    navCategoriesUl.style.transition = 'none';
    navCategoriesLi.forEach((navCategoryLi) => {
        navCategoryLi.style.transition = 'none';
    });
    footer.style.transition = 'none';
    footerLinks.forEach((footerLink) => {
        footerLink.style.transition = 'none';
    });
    contactanos.style.transition = 'none';
    massageInf.style.transition = 'none';
    if (bannerMarcas) bannerMarcas.style.transition = 'none';
    main.style.transition = 'none';
    sectionTitle.forEach((title) => {
        if (title) title.style.transition = 'none';
    })
    if (detailProductContainer) detailProductContainer.style.transition = 'none';
    productInformationP.forEach((p) => {
       if(p) p.style.transition = 'none';
    });
    if(productInformationH3) productInformationH3.style.transition = 'none';
    if(buttonAmount) buttonAmount.style.transition = 'none';
    if(buttonFavoritesP) buttonFavoritesP.style.transition = 'none';
    if(buttonFavoritesButton) buttonFavoritesButton.style.transition = 'none';
    if(loginContainer) loginContainer.style.transition = 'none';
    if(titleLogin) titleLogin.style.transition = 'none';
    loginContainerA.forEach((a) => {
        if(a) a.style.transition = 'none';
    });
    if(titleNewProduct) titleNewProduct.style.transition = 'none';
    if(mainContainerNewProduct) mainContainerNewProduct.style.transition = 'none';
    if(notFount) notFount.style.transition = 'none';
    if(registerContainer) registerContainer.style.transition = 'none';
    registerContainerA.forEach((a) => {
        if(a) a.style.transition = 'none';
    });
    if(titleRegister) titleRegister.style.transition = 'none';
    if(titleEditProfile) titleEditProfile.style.transition = 'none';
    if(labelsEditProfile) labelsEditProfile.forEach((label) => {
        label.style.transition = 'none';
    });

    // Verificar si hay un estado almacenado en localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplicar la clase 'active' si el modo oscuro está activado
    if (isDarkMode) {
        buttonDark.classList.add('active');
        toggleDarkMode();
    }

    // Restablecer las transiciones después de que el navegador haya tenido la oportunidad de renderizar el estado inicial
    setTimeout(() => {
        buttonDark.style.transition = '';
        buttonDark.style.setProperty("--after-transition", '');

        // Restablecer las transiciones
        header.style.transition = '';
        navCategories.forEach((navCategory) => {
            navCategory.style.transition = '';
        });
        navCategoriesUl.style.transition = '';
        navCategoriesLi.forEach((navCategoryLi) => {
            navCategoryLi.style.transition = '';
        });
        footer.style.transition = '';
        footerLinks.forEach((footerLink) => {
            footerLink.style.transition = '';
        });
        contactanos.style.transition = '';
        massageInf.style.transition = '';
        if (bannerMarcas) bannerMarcas.style.transition = '';
        main.style.transition = '';
        sectionTitle.forEach((title) => {
            if (title) title.style.transition = '';
        });
        if (detailProductContainer) detailProductContainer.style.transition = '';
        productInformationP.forEach((p) => {
            if(p) p.style.transition = '';
        });
        if(productInformationH3) productInformationH3.style.transition = '';
        if(buttonAmount) buttonAmount.style.transition = '';
        if(buttonFavoritesP) buttonFavoritesP.style.transition = '';
        if(buttonFavoritesButton) buttonFavoritesButton.style.transition = '';
        if(loginContainer) loginContainer.style.transition = '';
        if(titleLogin) titleLogin.style.transition = '';
        loginContainerA.forEach((a) => {
            if(a) a.style.transition = '';
        });
        if(titleNewProduct) titleNewProduct.style.transition = '';
        if(mainContainerNewProduct) mainContainerNewProduct.style.transition = '';
        if(notFount) notFount.style.transition = '';
        if(registerContainer) registerContainer.style.transition = '';
        registerContainerA.forEach((a) => {
            if(a) a.style.transition = '';
        });
        if(titleRegister) titleRegister.style.transition = '';
        if(titleEditProfile) titleEditProfile.style.transition = '';
        if(labelsEditProfile) labelsEditProfile.forEach((label) => {
            label.style.transition = '';
        });
    }, 0);

    // Activar/desactivar el modo oscuro
    buttonDark.addEventListener('click', () => {
        buttonDark.classList.toggle('active');

        // Guardar el estado en localStorage
        localStorage.setItem('darkMode', buttonDark.classList.contains('active'));
        toggleDarkMode();

    });
});

function toggleDarkMode() {
    // Traemos a los elementos necesarios y aplicamos la clase 'dark-mode'
    // ******************************************** HEADER ********************************************
    // header
    let header = document.querySelector('header');
    header.classList.toggle('dark-mode');

    // barra de categorias
    let navCategories = document.querySelectorAll('.nav-categorias a');
    navCategories.forEach((navCategory) => {
        navCategory.classList.toggle('dark-mode');
    });

    let navCategoriesUl = document.querySelector('.nav-categorias ul');
    navCategoriesUl.classList.toggle('dark-mode');

    let navCategoriesLi = document.querySelectorAll('.nav-categorias ul li');
    navCategoriesLi.forEach((navCategoryLi) => {
        navCategoryLi.classList.toggle('dark-mode');
    });


    // ******************************************** FOOTER ********************************************
    // footer
    let footer = document.querySelector('footer');
    footer.classList.toggle('dark-mode');

    // footer links
    let footerLinks = document.querySelectorAll('.enlaces a');
    footerLinks.forEach((footerLink) => {
        footerLink.classList.toggle('dark-mode');
    });

    // footer mensaje contactanos
    let contactanos = document.querySelector('.contactanos');
    contactanos.classList.toggle('dark-mode');

    // footer mensaje informacion
    let massageInf = document.querySelector('.mensaje-inf p');
    massageInf.classList.toggle('dark-mode');

    // ******************************************** MAIN ********************************************
    // banner de marcas
    let bannerMarcas = document.querySelector('.slider-box-marcas');
    if (bannerMarcas) {
        bannerMarcas.classList.toggle('dark-mode');
    }

    // main
    let main = document.querySelector('main');
    main.classList.toggle('dark-mode');

    // titulo de seccion
    let sectionTitle = document.querySelectorAll('.titulo-contenedor');
    sectionTitle.forEach((title) => {
        if (title) {
            title.classList.toggle('dark-mode');
        }
    });

    // ******************************************** DETALLE DE PRODUCTO ********************************************
    // contenedor de detalles de producto
    let detailProductContainer = document.querySelector('.contenedor-detalles-producto');
    if (detailProductContainer) {
        detailProductContainer.classList.toggle('dark-mode');
    }

    // informacion de producto etiquetas p
    let productInformationP = document.querySelectorAll('.informacion-producto p');
    productInformationP.forEach((p) => {
        if(p) {
            p.classList.toggle('dark-mode');
        }
    });

    // titulo de informacion de producto
    let productInformationH3 = document.querySelector('.informacion-producto h3');
    if(productInformationH3) {
        productInformationH3.classList.toggle('dark-mode');
    }

    // boton cantidad etiqueta p
    let buttonAmount = document.querySelector('.boton-cantidad p');
    if(buttonAmount) {
        buttonAmount.classList.toggle('dark-mode');
    }

    // boton favoritos etiqueta p
    let buttonFavoritesP = document.querySelector('.boton-favoritos p');
    if(buttonFavoritesP) {
        buttonFavoritesP.classList.toggle('dark-mode');
    }

    // boton favoritos boton corazon
    let buttonFavoritesButton = document.querySelector('.boton-favoritos button');
    if(buttonFavoritesButton) {
        buttonFavoritesButton.classList.toggle('dark-mode');
    }

    // ******************************************** LOGIN ********************************************
    // contenedor de login
    let loginContainer = document.querySelector('.contenedor-login');
    if(loginContainer) {
        loginContainer.classList.toggle('dark-mode');
    }

    // titulo de login
    let titleLogin = document.querySelector('.titulo-login');
    if(titleLogin) {
        titleLogin.classList.toggle('dark-mode');
    }

    //  etiquetas a del contenedor de login
    let loginContainerA = document.querySelectorAll('.contenedor-login a');
    loginContainerA.forEach((a) => {
        a.classList.toggle('dark-mode');
    });

    // ******************************************** FORMULARIO NUEVO PRODUCTO ********************************************
    // titulo de nuevo producto
    let titleNewProduct = document.querySelector('.contenedor-titulo h2');
    if(titleNewProduct) {
        titleNewProduct.classList.toggle('dark-mode');
    }

    // contenedor principal de nuevo producto
    let mainContainerNewProduct = document.querySelector('.contenedor-principal');
    if(mainContainerNewProduct) {
        mainContainerNewProduct.classList.toggle('dark-mode');
    }

    // ******************************************** NOT FOUND 404 ********************************************
    // texto de no encontrado
    let notFount = document.querySelector('.not-found-text');
    if(notFount) {
        notFount.classList.toggle('dark-mode');
    }

    // ******************************************** REGISTRO ********************************************
    // contenedor de registro
    let registerContainer = document.querySelector('.contenedor-register');
    if(registerContainer) {
        registerContainer.classList.toggle('dark-mode');
    }

    //  etiquetas a del contenedor de registro
    let registerContainerA = document.querySelectorAll('.contenedor-register a');
    registerContainerA.forEach((a) => {
        a.classList.toggle('dark-mode');
    });

    // titulo de registro
    let titleRegister = document.querySelector('.titulo-register');
    if(titleRegister) {
        titleRegister.classList.toggle('dark-mode');
    }

    // ********************************************* PERFIL ***********************************************+
    // titulo de editar perfil
    let titleEditProfile = document.querySelector('.titleEditProfile');
    if(titleEditProfile) {
        titleEditProfile.classList.toggle('dark-mode');
    }

    // etiquetas de editar perfil
    let labelsEditProfile = document.querySelectorAll('.user-edit-information label');
    labelsEditProfile.forEach((label) => {
        label.classList.toggle('dark-mode');
    });
}

