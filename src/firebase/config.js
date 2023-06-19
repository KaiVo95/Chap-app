import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3wjNTZUBOXONmmKoHQBsr9d-0U5a0Kco",
    authDomain: "chat-app-b8de6.firebaseapp.com",
    projectId: "chat-app-b8de6",
    storageBucket: "chat-app-b8de6.appspot.com",
    messagingSenderId: "924298173995",
    appId: "1:924298173995:web:be646f4bd79627368ed46e",
    measurementId: "G-RTML6VP0QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new FacebookAuthProvider();
const db = getFirestore(app);

// connect Authentication and FireStore on local
connectAuthEmulator(auth, "http://127.0.0.1:9099");
if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

export { auth, provider, db }