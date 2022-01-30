import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
//  UnArchive Modal
export default function UnArchiveModal({ modalState, setModalState }) {
    return (
        <Modal
   isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={modalStyles}
  size="md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">UnArchived</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
    <h5>Call has been UnArchived</h5>
  </Modal.Footer>
        </Modal>
    );
}
//  Archive Modal
export default function ArchiveModal({ modalState, setModalState }) {
    return (
        <Modal
   isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={modalStyles}
  size="md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">Archived</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
    <h5>Call has been Archived</h5>
  </Modal.Footer>
        </Modal>
    );
}

