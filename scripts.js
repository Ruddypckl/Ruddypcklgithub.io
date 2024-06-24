import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import app from "./firebaseConfig.js"; // Asegúrate de que la ruta sea correcta

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
        form.reset();
    });

    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const data = {
            name: name,
            email: email,
            message: message,
            timestamp: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "contacts"), data);
            alert('Formulario enviado');
            document.getElementById('contact-form').reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Hubo un error al enviar el formulario');
        }
    });

    // Cargar el contenido del blog desde un archivo Markdown
    fetch('blog-post.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('blog-container').innerHTML = marked(text);
        });

    // Inicializar la galería de imágenes con Lightbox (opcional)
    if (typeof lightbox !== "undefined") {
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

function initMap() {
    var location = { lat: -25.344, lng: 131.036 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location
    });
    var marker = new google.maps.Marker({ position: location, map: map });
}
