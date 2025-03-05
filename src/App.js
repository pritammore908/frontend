// import React, { useState } from "react";
// import LetterEditor from "./components/LetterEditor";
// import axios from "axios";

// function App() {
//   const [draft, setDraft] = useState("");

//   const saveDraft = async (letterContent) => {
//     setDraft(letterContent);
//     localStorage.setItem("letterDraft", letterContent);
  
//     // Save to backend
//     await saveDraftToDB(letterContent, user?.uid);
//   };

//   const fetchDriveFiles = async () => {
//     const { data } = await axios.get("http://localhost:5000/get-drive-files");
//     console.log("Files from Drive:", data);
// };
//   return (
//     <div>
//       <h1>Letter Writing App</h1>
//       <LetterEditor onSave={saveDraft} />
//       {draft && <div><h3>Saved Draft:</h3><div dangerouslySetInnerHTML={{ __html: draft }} /></div>}
//       <button onClick={fetchDriveFiles}>View Saved Letters</button>
//     </div>
//   );
// }

// export default App;








// //ITs work perfectly only send to google drive not work 
// import React, { useState, useEffect } from "react";
// import LetterEditor from "./components/LetterEditor";
// import { signInWithGoogle, logOut, auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import axios from "axios";

// function App() {
//     const [user, setUser] = useState(null);
//     const [letters, setLetters] = useState([]);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => unsubscribe(); // Cleanup on unmount
//     }, []);

//     const handleLogin = async () => {
//         const userData = await signInWithGoogle();
//         if (!userData) {
//             alert("Login unsuccessful. Please try again.");
//         }
//     };

//     const fetchDriveFiles = async () => {
//         if (!user) {
//             alert("Please log in to view saved letters.");
//             return;
//         }
//         try {
//             const { data } = await axios.get("http://localhost:5001/get-drive-files");
//             setLetters(data);
//         } catch (error) {
//             console.error("Error fetching drive files:", error);
//             alert("Failed to retrieve saved letters.");
//         }
//     };

//     return (
//         <div>
//             <h1>Letter Writing App</h1>
//             {user ? (
//                 <div>
//                     <p>Welcome, {user.displayName}</p>
//                     <button onClick={logOut}>Log Out</button>
//                     <LetterEditor user={user} />
//                     <button onClick={fetchDriveFiles}>View Saved Letters</button>
//                     <ul>
//                         {letters.map((file) => (
//                             <li key={file.id}>{file.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ) : (
//                 <button onClick={handleLogin}>Sign in with Google</button>
//             )}
//         </div>
//     );
// }

// export default App;





























import React, { useState, useEffect } from "react";
import LetterEditor from "./components/LetterEditor";
import Login from "./components/Login";
// import LetterList from "./components/LetterList";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <div>
            {/* <h1>Letter Writing App</h1> */}
            {user ? (
                <div>
                    {/* <p>Welcome, {user.displayName}</p>
                    <button onClick={() => auth.signOut()}>Log Out</button> */}
                    <LetterEditor user={user} />
                    {/* <LetterList user={user} /> */}
                </div>
            ) : (
                <Login setUser={setUser} />
            )}
        </div>
    );
}

export default App;





































































