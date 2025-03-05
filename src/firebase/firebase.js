//this work properly 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Request Google Drive API access
provider.addScope("https://www.googleapis.com/auth/drive.file");

/**
 * Google Sign-In with better error handling
 */
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in:", result.user);
        return result.user; // Returning user details
    } catch (error) {
        console.error("Authentication Error:", error.message);
        alert(`Login Failed: ${error.message}`);
        return null;
    }
};

/**
 * Google Logout with proper error handling
 */
const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout Error:", error.message);
        alert(`Logout Failed: ${error.message}`);
    }
};

export { auth, signInWithGoogle, logOut };






