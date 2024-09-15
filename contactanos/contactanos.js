// contactanos.js
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Mostrar un mensaje de éxito
    alert('Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.');

    // Limpiar el formulario después de enviar
    document.getElementById('contactForm').reset();
});

