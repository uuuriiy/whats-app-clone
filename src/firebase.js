import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbxay8M1vJYSdeUdQEOX7IJzhgUwe_L-w",
  authDomain: "whats-app-clone-4d854.firebaseapp.com",
  projectId: "whats-app-clone-4d854",
  storageBucket: "whats-app-clone-4d854.appspot.com",
  messagingSenderId: "169269497424",
  appId: "1:169269497424:web:83f643507c721136ed8b55",
  measurementId: "G-5VZ438VGST",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
