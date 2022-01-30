import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
export default function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setsubmit] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await fetch("https://frontend-test-api.aircall.io/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          "access_token",
          JSON.stringify(data.access_token)
        );
        navigate("/CallLog");
      })
      .finally(() => setsubmit(false));
  };
  return submit ? (
    <div>
      <Dots />
    </div>
  ) : (
    <div
      className="container center"
      //   inline css for the div
      style={{
        textAlign: "center",
        maxWidth: "300px",
        paddingBottom: "20px",
        paddingTop: "20px",
        border: "3px solid black",
        marginTop: "150px",
      }}
    >
      <h1
        //   inline css for heading
        style={{
          color: "grey",
        }}
      >
        Log In
      </h1>
      {/* Form for login fields */}
      <form
        onSubmit={(e) => handleLogin(e)}
        //   inline css for the form
        style={{ fontSize: "12px", fontFamily: "Calibri" }}
      >
        <h5>
          User ID:
          <input
            placeholder="Enter User ID"
            onChange={(e) => setUserid(e.target.value)}
          />
        </h5>

        <h5>
          Password:
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </h5>
        <Button
          style={{
            color: "white",
            backgroundColor: "black",
          }}
          type="submit"
          className=" btn-success"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
