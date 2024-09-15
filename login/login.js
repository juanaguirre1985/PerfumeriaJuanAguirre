document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Obtener los datos del almacenamiento local
    let storedUser = JSON.parse(localStorage.getItem('user'));

    // Validar las credenciales
    if (storedUser && storedUser.email === username && storedUser.password === password) {
        // Mostrar un mensaje de éxito
        alert('Inicio de sesión exitoso. Redirigiendo a la página principal.');

        // Redirigir a la página principal en caso de éxito
        window.location.href = '../pagina_principal/pagina_principal.html';
    } else {
        // Mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos. Redirigiendo a la página de registro.');

        // Redirigir a la página de registro en caso de error
        window.location.href = '../registro/registro.html';
    }
});
