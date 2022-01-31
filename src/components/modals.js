import React from "react";
import Modal from "react-modal";
import dateFormat from "dateformat";

export const CallModal = ({ item, modalState, setModalState, duration }) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={callModalStyles}
      contentLabel="Call Details"
    >
      <button className="btn btn-danger" onClick={() => setModalState(false)}>
        X
      </button>

      <table className="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <th>Call Duration</th>
            <td>{duration}</td>
          </tr>
          <tr>
            <th>Call Type</th>
            <td>{item.call_type}</td>
          </tr>
          <tr>
            <th>Call Direction</th>
            <td>{item.direction}</td>
          </tr>
          <tr>
            <th>Via</th>
            <td>{item.via}</td>
          </tr>
          <tr>
            <th>Archived</th>
            <td>{item.is_archived ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>
              {dateFormat(
                Date.parse(item.created_at),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="card blue-grey darken-1">
        <div class="card-action">
          <span style={{ color: "white" }}>
            <strong>From: </strong> {item.from}
          </span>
          <span style={{ color: "white" }}>
            <strong>To: </strong> {item.to}
          </span>
        </div>
      </div>
      <div
        class="card blue-grey darken-1"
        style={{ maxHeight: "130px", overflow: "auto" }}
      >
        <div style={{ color: "white", fontWeight: "bold", marginLeft: "5px" }}>
          {" "}
          NOTES:
        </div>
        {item.notes.map((obj, i) => (
          <div class="card-action">
            {"  "}
            <span style={{ color: "white" }}>{i + 1}</span>
            {"  "}
            <span style={{ color: "white" }}>{obj.content}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export const ArchiveModal = ({ item, modalState, setModalState }) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={archiveModalStyles}
      contentLabel="Call Details"
    >
      <button className="btn btn-danger" onClick={() => setModalState(false)}>
        X
      </button>
      <div class="card blue-grey darken-1">
        <div class="card-action">
          <span style={{ color: "white" }}>CALL ARCHIVED</span>
        </div>
      </div>
    </Modal>
  );
};

export const UnArchiveModal = ({ modalState, setModalState }) => {
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={unArchiveModalStyles}
      contentLabel="Call Details"
    >
      <button className="btn btn-danger" onClick={() => setModalState(false)}>
        X
      </button>
      <div class="card blue-grey darken-1">
        <div class="card-action">
          <span style={{ color: "white" }}>CALL UNARCHIVED</span>
        </div>
      </div>
    </Modal>
  );
};
const archiveModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const unArchiveModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const callModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
