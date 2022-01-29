import React from "react";
import { Button } from "react-bootstrap";
import "react-activity/dist/Dots.css";
export default function NavigationBar() {
  function LogoutBtn() {
    sessionStorage.removeItem("access_token");
  }

  return (
    // Navigation Bar
    <nav class="navbar center navbar-dark bg-dark">
      <span
        class="navbar-brand h1"
        style={{ paddingLeft: "20px", fontSize: "30px" }}
      >
        Call Log
      </span>
      <ul>
        {sessionStorage.getItem("access_token") && (
          <li classname="navbar-dark bg-dark">
            <Button onClick={LogoutBtn} className=" bg-dark m-4">
              Log Out
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
