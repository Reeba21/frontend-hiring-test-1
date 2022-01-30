import React from "react";
import { Button } from "react-bootstrap";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
export default function Call({ call, modalmodal, archive }) {
  return (
    <tr>
      <td>{call.from}</td>
      <td>{call.to}</td>
      <td>{call.via}</td>
      <td>{call.time}</td>
      <td>{call.typeofCall}</td>
      <td>
        <Button
          className=" bg-dark m-4"
          onClick={() => modalmodal(call)}
          className="btn btn-info"
        >
          Call Log
        </Button>
        {console.log(call)}
        {call.is_archived ? (
          <Button
            className=" bg-dark m-4"
            onClick={(e) => {
              archive(false, e.target.id);
              e.target.innerHTML = "Archive";
            }}
            id={call.id}
          >
            Unarchive Call
          </Button>
        ) : (
          <Button
            className=" bg-dark m-4"
            onClick={(e) => {
              archive(true, e.target.id);
              e.target.innerHTML = "Unarchive";
            }}
            id={call.id}
          >
            Archive Call
          </Button>
        )}
      </td>
    </tr>
  );
}
// Call Modal
export default function CallModal({ call, modalState, setModalState, time }) {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => setModalState(true)}
      style={modalStyles}
    >
      <Button onClick={() => setModalState(false)}>
        Close
      </Button>
      <table>
        <tbody>
          <tr>
            <th>Call Duration</th>
            <td>{time}</td>
          </tr>
          <tr>
            <th>Call Type</th>
            <td>{call.typeofCall}</td>
          </tr>
          <tr>
            <th>Via</th>
            <td>{call.via}</td>
          </tr>
          <tr>
            <th>Archived</th>
            <td>{call.is_archived ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
        <div class="card">
            <p>From: </p> {call.from}
            <p>To: </p> {call.to}
        </div>
      <h3  style={{ fontSize: "12px", fontFamily: "Calibri" }}>
          Call Notes:
        </h3>
        {call.notes.map((obj, i) => (
          <div class="card">
            <p style={{ color: "black" }}>{i + 1}</p>
            <p style={{ color: "black" }}>{obj.content}</p>
          </div>
        ))}
    </Modal>
  );
}
