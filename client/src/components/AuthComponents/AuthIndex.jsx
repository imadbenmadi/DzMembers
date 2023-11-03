import React from 'react'
import { Link } from 'react-router-dom';
export default function AuthIndex() {
  return (
      <div>
          <div
              style={{
                  background: "green",
                  padding: "20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: "15px",
                  textAlign: "center",
              }}
          >
              <Link to="/Auth/Sign_up">
                  Create Your <br /> own Account
              </Link>
          </div>
          <div
              style={{
                  color: "#fff",
                  background: "blue",
                  padding: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "fit-content",
                  margin: "auto",
              }}
          >
              <Link to="/Auth/Login">Login</Link>
          </div>
          <div style={{ fontSize: "13px" }}>If you already have an account</div>
          <div
              id="guss_btn"
              style={{
                  position: "absolute",
                  bottom: "10px",
                  color: "gray",
                  cursor: "pointer",
              }}
          >
              LogIn as a gust
          </div>
      </div>
  );
}
