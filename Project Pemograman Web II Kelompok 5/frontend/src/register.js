import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, [navigate]);

  async function signUp() {
    if (!name || !password || !email) {
      setError("All fields are required!");
      return;
    }

    setError(null);
    setLoading(true);

    let item = { name, password, email };

    try {
      let response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      let result = await response.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/add");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Register</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Name"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
        />
        <br />
        <button
          onClick={signUp}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign-Up"}
        </button>
      </div>
    </>
  );
}

export default Register;
