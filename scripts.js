import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
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
                contactForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Hubo un error al enviar el formulario');
            }
        });
    }

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
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name
                    }).then(() => {
                        alert('Registro exitoso');
                        window.location.href = 'index.html'; // Redirige a la página de inicio
                    }).catch((error) => {
                        console.error("Error al actualizar el perfil: ", error);
                        alert('Error al actualizar el perfil');
                    });
                })
                .catch((error) => {
                    console.error("Error al registrarse: ", error);
                    alert('Error al registrarse');
                });
        });
    }

    // Manejo del estado de autenticación
    onAuthStateChanged(auth, (user) => {
        const nav = document.querySelector('nav ul');
        if (user) {
            // Usuario está autenticado
            nav.innerHTML = `
                <li><a href="index.html">Inicio</a></li>
                <li><a href="bots.html">Bots/Aplicaciones</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                <li><a href="sobre.html">Sobre Nosotros</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li id="user-name" class="username">Hola, ${user.displayName}</li>
                <li><a href="#" id="logout">Cerrar Sesión</a></li>
            `;

            document.getElementById('logout').addEventListener('click', function(event) {
                event.preventDefault();
                signOut(auth).then(() => {
                    alert('Cierre de sesión exitoso');
                    window.location.href = 'index.html';
                }).catch((error) => {
                    console.error("Error al cerrar sesión: ", error);
                    alert('Error al cerrar sesión');
                });
            });
        } else {
            // Usuario no está autenticado
            nav.innerHTML = `
                <li><a href="index.html">Inicio</a></li>
                <li><a href="bots.html">Bots/Aplicaciones</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                <li><a href="sobre.html">Sobre Nosotros</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="login.html">Iniciar Sesión</a></li>
                <li><a href="register.html">Registrarse</a></li>
            `;
        }
    });

    // Cargar el contenido del blog desde un archivo Markdown
    fetch('blog-post.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('blog-container').innerHTML = marked(text);
        });
});
