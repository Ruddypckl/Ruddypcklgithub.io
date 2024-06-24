// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq4RIddDlri2JUgLa5XLrL-0A1T_Bg-dE",
  authDomain: "ruddypckl-d939f.firebaseapp.com",
  projectId: "ruddypckl-d939f",
  storageBucket: "ruddypckl-d939f.appspot.com",
  messagingSenderId: "384269323168",
  appId: "1:384269323168:web:9d542423f4e2bc659b72c5",
  measurementId: "G-DR69RMZZXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app; // Exporta la instancia de la aplicación Firebase para ser utilizada en otros archivos
