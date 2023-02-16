import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Logger } from '@firebase/logger';

const config = {
    apiKey: "AIzaSyBy2WnDSVZ2Yjuw_DEJOlQhumC-A8bhWtI",
    authDomain: "tattoo-studio-1bf28.firebaseapp.com",
    projectId: "tattoo-studio-1bf28",
    storageBucket: "tattoo-studio-1bf28.appspot.com",
    messagingSenderId: "434152323259",
    appId: "1:434152323259:web:7227f4d8631cdf50b6d19e",
    measurementId: "G-5S53CEDTPT"
};

const logger = new Logger(`@firebase/<COMPONENT>`); 
/* 
    import { logger } from "./../../firebase"; 

    logger.info("test");...
*/

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                isAdmin: false,
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            isAdmin: false,
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};


const logAnalyticsEvent = async (message = "default") =>
{
    try
    {
        await logEvent(analytics, message, {
            content_type: 'text',
            content_id: 'P12453',
            items: [{ name: 'test' }]
        });
    }
    catch (err)
    {
        console.error(err);
        alert(err.message);
    }
}

export {
    auth,
    db,
    analytics,
    config,
    app,
    logger,
    getAnalytics,
    logAnalyticsEvent,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};