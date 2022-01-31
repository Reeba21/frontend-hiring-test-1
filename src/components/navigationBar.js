import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <nav>
      <div className="nav-wrapper center blue">
        <div className="brand-logo center container">Frontend Hiring Test</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {sessionStorage.getItem("access_token") && (
            <li>
              <button onClick={handleLogout} className="btn btn-danger m-2">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
