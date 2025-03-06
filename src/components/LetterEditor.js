import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import Login from "./Login";
// import LetterList from "./components/LetterList";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const API_URL = process.env.REACT_APP_API_URL;

const LetterEditor = ({ user }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [letters, setLetters] = useState([]);
  const [showLetters, setShowLetters] = useState(false); // Toggle state
  const [userl, setUserl] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserl(currentUser);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

  const fetchDriveFiles = async () => {
    if (!user) {
      alert("Please log in to view saved letters.");
      return;
    }

    if (showLetters) {
      // If already showing, hide the letters
      setShowLetters(false);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:5001/api/letters/get-drive-files`);
      setLetters(data);
      setShowLetters(true); // Show letters after fetching
    } catch (error) {
      console.error("Error fetching drive files:", error);
      alert("Failed to retrieve saved letters.");
    }
  };

  const saveDraftToDB = async () => {
    if (!user) {
      alert("You must be logged in to save a draft.");
      return;
    }

    if (!content.trim()) {
      alert("Letter content cannot be empty!");
      return;
    }

    const letterData = {
      userId: user.uid,
      content: content.trim(),
    };

    try {
      await axios.post(`http://localhost:5001/api/letters/save-letter`, letterData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error.response?.data || error.message);
      alert("Failed to save draft.");
    }
  };

  const saveToGoogleDrive = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and letter content cannot be empty!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/letters/save-to-drive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, title }),
      });

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.statusText}`);
      }

      alert("File saved to Google Drive!");
    } catch (error) {
      console.error("Error saving to Drive:", error);
      alert("Error saving to Google Drive.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light w-100 px-5 position-absolute top-0">
        <a className="navbar-brand" href="#">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Logo" width="40" />
        </a>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-3"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item mx-3"><a className="nav-link" href="#">About</a></li>
            <li className="nav-item mx-3"><a className="nav-link" href="#">Write</a></li>
            <li className="nav-item mx-3"><a className="nav-link" href="#">History</a></li>
            <li className="nav-item mx-3"><a className="nav-link" href="#">Print</a></li>
            <li className="nav-item mx-3"><a className="nav-link" href="#">Contact Us</a></li>
          </ul>
        </div>
        {/* <button className="btn btn-danger px-4">Login</button> */}
        <p className="mt-2 me-4">Welcome, {user.displayName}</p>
        {user ? (
                <div>
                    
                    <button className="btn btn-danger px-4" onClick={() => auth.signOut()}>Log Out</button>
        
                </div>
            ) : (
                <Login setUser={setUserl} />
            )}
      </nav>


      <div className="card shadow p-3" style={{ width: "600px" }}>
        <div className="card-body">
          <h5 className="card-title">Letter Writing App</h5>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <ReactQuill value={content} onChange={setContent} theme="snow" />
          </div>
          <div className="text-end mt-3">
  <div className="d-flex justify-content-between">
    <button className="btn btn-primary" onClick={fetchDriveFiles}>
      {showLetters ? "Hide Saved Letters" : "View Saved Letters"}
    </button>

    <button className="btn btn-primary" onClick={saveDraftToDB}>
      Save To Draft
    </button>

    <button className="btn btn-success" onClick={saveToGoogleDrive}>
      Save To Google Drive
    </button>
  </div>

  {showLetters && (
    <ul className="list-group mt-3">
      {letters.map((file) => (
        <li key={file.id} className="list-group-item">
          {file.name}
        </li>
      ))}
    </ul>
  )}
</div>


          
        </div>
      </div>
    </div>
  );
};

export default LetterEditor;





















































































