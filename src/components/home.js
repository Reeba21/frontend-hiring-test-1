import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { useNavigate } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

export default function Home() {
  const [callItems, setCallItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);
  const [archive, setArchive] = useState(false);
  const limit = 10;
  const navigate = useNavigate();
  const fetchData = async () => {
    const access_token = JSON.parse(sessionStorage.getItem("access_token"));

    await fetch(
      `https://frontend-test-api.aircall.io/calls?offset=0&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setpageCount(Math.ceil(data.totalCount / limit));
        setCallItems(data.nodes);
      })
      .catch((error) => {
        console.log(error);
        alert("Your session has expired!");
        sessionStorage.removeItem("access_token");
        navigate("/");
      });
  };
  useEffect(() => {
    fetchData();
  }, [archive]);

  return !callItems.length ? (
    <div className="center container">
      <Dots />
    </div>
  ) : (
    <Pagination
      callItems={callItems}
      totalPages={pageCount}
      limit={limit}
      archive={archive}
      setArchive={setArchive}
    ></Pagination>
  );
}
