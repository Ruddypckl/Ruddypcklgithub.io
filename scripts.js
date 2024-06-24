// scripts.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAq4RIddDlri2JUgLa5XLrL-0A1T_Bg-dE",
  authDomain: "ruddypckl-d939f.firebaseapp.com",
  projectId: "ruddypckl-d939f",
  storageBucket: "ruddypckl-d939f.appspot.com",
  messagingSenderId: "384269323168",
  appId: "1:384269323168:web:9d542423f4e2bc659b72c5",
  measurementId: "G-DR69RMZZXE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
    // Manejar el envío del formulario de contacto
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

// Función para inicializar el mapa de Google
function initMap() {
    var location = { lat: -25.344, lng: 131.036 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location
    });
    var marker = new google.maps.Marker({ position: location, map: map });
}
