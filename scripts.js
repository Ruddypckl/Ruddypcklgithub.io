// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Manejar el envío del formulario de contacto
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
        form.reset();
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const data = {
            name: name,
            email: email,
            message: message
        };

        // Aquí puedes usar fetch o AJAX para enviar los datos a un servicio backend
        console.log(data);
        alert('Formulario enviado');

        // Para limpiar el formulario
        document.getElementById('contact-form').reset();
    });

    // Cargar el contenido del blog desde un archivo Markdown
    fetch('blog-post.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('blog-container').innerHTML = marked(text);
        });

    // Inicializar la galería de imágenes con Lightbox (opcional)
    if (lightbox) {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }

    // Inicializar el mapa de Google
    if (typeof initMap === "function") {
        initMap();
    }
});

// Función para inicializar el mapa de Google
function initMap() {
    var location = { lat: -25.344, lng: 131.036 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location
    });
    var marker = new google.maps.Marker({ position: location, map: map });
}
