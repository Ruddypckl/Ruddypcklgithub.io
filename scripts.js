import { db } from "./firebaseConfig.js"; 
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();

    // Manejo del formulario de contacto
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log("Datos capturados:", { name, email, message });

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

    // Manejo del formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión: ", error);
                    alert('Error al iniciar sesión');
                });
        });
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert('Registro exitoso');
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Error al registrarse: ", error);
                    alert('Error al registrarse');
                });
        });
    }

    // Cargar el contenido del blog desde un archivo Markdown
    fetch('blog-post.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('blog-container').innerHTML = marked(text);
        });
});
