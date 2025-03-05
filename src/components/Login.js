
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithGoogle } from "../firebase/firebase";

const LoginPage = ({ setUser }) => {
  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    if (!userData) {
      alert("Login unsuccessful. Please try again.");
    } else {
      setUser(userData);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
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
        <button className="btn btn-danger px-4" onClick={handleLogin}>Login</button>
      </nav>

      {/* Main Section */}
      <div className="row w-75">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
            WRITE <span style={{ color: "#FF007F" }}>A LETTER</span>
          </h1>
          <p className="text-muted">
            Welcome to LetterEase, your simple and secure letter-writing tool! Sign in with Google to create, edit, and save your letters effortlessly. With seamless Google Drive integration, your documents are safely stored and easily accessible anytime. Whether drafting a quick note or formatting a formal letter, our intuitive editor makes writing smooth and efficient. Get started now and keep your letters organized in one place!
          </p>
          <div className="d-flex mt-3">
            <button className="btn btn-primary px-4 me-3" onClick={handleLogin} >Signup</button>
          </div>
        </div>
        <div className="col-md-6 text-center">
          {/* Outer border (Green) - 70% visible on the left */}
          <div
            style={{
              display: "inline-block",
              position: "relative",
              padding: "20px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "8px solid #FF007F", // Pink border

                clipPath: "polygon(0% 0%, 70% 0%, 70% 100%, 0% 100%)", // Show 70% left
              }}
            ></div>

            {/* Middle border (Pink) - 70% visible on the right */}
            <div
              style={{
                display: "inline-block",
                position: "relative",
                padding: "20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "8px solid #28A745", // Green border
                  clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%)", // Show 70% right
                }}
              ></div>

              {/* Image */}
              <img
                src="Login.png"
                alt="Writing Illustration"
                style={{
                  width: "320px",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;