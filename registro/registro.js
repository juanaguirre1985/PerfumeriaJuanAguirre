document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;

    // Guardar los datos en el almacenamiento local
    localStorage.setItem('user', JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password
    }));

    // Mostrar un mensaje de éxito
    alert('Tus datos han sido registrados correctamente.');

    // Redirigir a la página de login
    window.location.href = '../login/login.html';
});
