import Header from "./Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, [navigate]);

  async function login() {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    try {
      let item = { email, password };
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      result = await result.json();
      if (result.error) {
        alert("Invalid email or password");
      } else {
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/add");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong, please try again later.");
    }
  }

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <br />
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
