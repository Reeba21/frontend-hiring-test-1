import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch("https://frontend-test-api.aircall.io/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          "access_token",
          JSON.stringify(data.access_token)
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => setIsLoading(false));
  };

  return isLoading ? (
    <div className="center container">
      <Dots />
    </div>
  ) : (
    <div
      className="center container"
      style={{
        maxWidth: "500px",
        border: "2px solid gray",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "150px"
      }}
    >
      <h3>Please login to proceed!</h3>
      <form onSubmit={(e) => handleLoginForm(e)}>
        <div className="input-field">
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}
