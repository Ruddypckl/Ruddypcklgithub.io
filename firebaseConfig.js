// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAq4RIddDlri2JUgLa5XLrL-0A1T_Bg-dE",
  authDomain: "ruddypckl-d939f.firebaseapp.com",
  projectId: "ruddypckl-d939f",
  storageBucket: "ruddypckl-d939f.appspot.com",
  messagingSenderId: "384269323168",
  appId: "1:384269323168:web:9d542423f4e2bc659b72c5",
  measurementId: "G-DR69RMZZXE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
