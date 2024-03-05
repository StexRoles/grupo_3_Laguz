window.addEventListener('load', () => {
    let buttonDark = document.querySelector('#switch');
    
    // Verificar si hay un estado almacenado en localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Aplicar la clase 'active' si el modo oscuro está activado
    if (isDarkMode) {
        buttonDark.classList.add('active');
    }

    buttonDark.addEventListener('click', () => {
        buttonDark.classList.toggle('active');
        
        // Guardar el estado en localStorage
        localStorage.setItem('darkMode', buttonDark.classList.contains('active'));
    });
});

