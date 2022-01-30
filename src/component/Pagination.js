import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
function Calldata({ calldatas, submit, archive, setArchive }) {
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  const [archiveModal, setarchiveModal] = useState(false);
  const [calldata, setcalldata] = useState({});
  useEffect(() => [archive]);
  async function archiveCall(id) {
    const access_token = JSON.parse(sessionStorage.getdata("access_token"));
    await fetch(`https://frontend-test-api.aircall.io/calls/${id}/archive`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((res) => res.json())
      .finally(() => {
        setArchive(!archive);
      });
  }
  return (
    <div>
      <h5 style={{ fontSize: "20px", color: "grey", fontStyle: "bold" }}>
        Call Information
      </h5>
      <table style={{ fontSize: "15px", color: "black", fontFamily: "sans-serif" }}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Via</th>
            <th>Duration Of Call</th>
            <th>Type of Call</th>
          </tr>
        </thead>
        <tbody>
        <ArchiveModal
        data={calldata}
        modalState={archiveModal}
        setModalState={setarchiveModal}
        />
        <UnArchiveModal
        data={calldata}
        modalState={unarchiveModal}
        setModalState={setUnarchiveModal}
        />
        </tbody>
      </table>
    </div>
  );
}
export default function Pagination({ end, calldata, totalPages, archive, setArchive }) {
  const pg = totalPages;
  const [dataOffset, setdataOffset] = useState(0);
  const [data, setdata] = useState(calldata);
  const [submit, setsubmit] = useState(false);
  const handleClick = async (event) => {
    setsubmit(true);
    const access_token = JSON.parse(sessionStorage.getdata("access_token"));
    setdataOffset(dataOffset + end);
    await fetch(
      `https://frontend-test-api.aircall.io/calls?offset=${
        dataOffset + end
      }&end=${end}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
      .then((data) => {
        setdata(data.nodes);
        const items = data.nodes.reduce((items, call) => {
          if (!items[date]) {
            items[date] = [];
          }
          items[date].push(call);
          return items;
        },);
      })
  };
  return (
      <div className="row">
        <Calldata
          calldata={data}
          submit={submit}
          archive={archive}
          setArchive={setArchive}
        />
        <ReactPaginate
          pg={pageCount}
          onPageChange={handleClick}
        />
      </div>
  );
}

