import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import "firebase/compat/storage";

const config = {
    apiKey: "AIzaSyBy2WnDSVZ2Yjuw_DEJOlQhumC-A8bhWtI",
    authDomain: "tattoo-studio-1bf28.firebaseapp.com",
    projectId: "tattoo-studio-1bf28",
    storageBucket: "tattoo-studio-1bf28.appspot.com",
    messagingSenderId: "434152323259",
    appId: "1:434152323259:web:7227f4d8631cdf50b6d19e",
    measurementId: "G-5S53CEDTPT"
};

// const firebaseApp = firebase.initializeApp(config);


// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage().ref();

// export { db, auth, storage };

// export default db;

const app = initializeApp(config);
export const db = getFirestore(app);