//this work properly 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCmI_nyYsnamLBNzICzfLwjJ3NkGEJNXQA",
    authDomain: "latter-3b1f1.firebaseapp.com",
    projectId: "latter-3b1f1",
    storageBucket: "latter-3b1f1.firebasestorage.app",
    messagingSenderId: "65103085191",
    appId: "1:65103085191:web:5651e0c3f4e681f9fe0222",
    measurementId: "G-5PNBPD1R2L"
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






