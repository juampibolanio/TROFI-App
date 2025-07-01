import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Para Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAowWzeRoyJPCGrSW4hfCBlT2wPGyVSpr8",
  authDomain: "mensajeria-f3118.firebaseapp.com",
  databaseURL: "https://mensajeria-f3118-default-rtdb.firebaseio.com",
  projectId: "mensajeria-f3118",
  storageBucket: "mensajeria-f3118.firebasestorage.app",
  messagingSenderId: "248490030519",
  appId: "1:248490030519:web:be5327e85ebc043e03a432",
};

// Inicializar la app
const app = initializeApp(firebaseConfig);

// Obtener instancia de Realtime Database
export const database = getDatabase(app);
