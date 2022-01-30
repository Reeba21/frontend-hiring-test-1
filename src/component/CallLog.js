import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { useNavigate } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
export default function CallLog() {
  const [callItems, setCallItems] = useState([]);
  const [access_token, setAccess_token] = useState(
    JSON.parse(sessionStorage.getItem("access_token"))
  );
  const [pg, setpg] = useState(0);
  const [archive, setArchive] = useState(false);
  const limit = 5;
  useEffect(async () => {
    await fetch(
      `https://frontend-test-api.aircall.io/calls?offset=0&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setpg(Math.ceil(data.totalCount / limit));
        setCallItems(data.nodes);
      });
  }, [archive]);
  setInterval(() => {
    fetch("https://frontend-test-api.aircall.io/auth/refresh-token", {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          "access_token",
          JSON.stringify(data.access_token)
        );
        setAccess_token(data.access_token);
      });
  });

  return !callItems.length ? (
    <div>
      <Dots />
    </div>
  ) : (
    (<CallModal />)(
      <Pagination
        callItems={callItems}
        pg={pageCount}
        total={limit}
        archive={archive}
        setArchive={setArchive}
      ></Pagination>
    )
  );
}
