import { db } from "./firebaseConfig.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();

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
                    // Actualiza el perfil del usuario con el nombre
                    return updateProfile(auth.currentUser, {
                        displayName: name
                    });
                })
                .then(() => {
                    alert('Registro exitoso');
                    window.location.href = 'index.html'; // Redirige a la página de inicio
                })
                .catch((error) => {
                    console.error("Error al registrarse: ", error);
                    alert('Error al registrarse');
                });
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
                    window.location.href = 'index.html'; // Redirige a la página de inicio
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión: ", error);
                    alert('Error al iniciar sesión');
                });
        });
    }

    // Actualización del nombre de usuario en la barra de navegación
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuario está autenticado, actualizar UI
            console.log("Usuario autenticado:", user.displayName);
        } else {
            // Usuario no está autenticado
            console.log("Usuario no autenticado");
        }
    });

    // Resto del código para manejo de inicio de sesión, carga de blog, etc.
});
