import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import List from "./ListContainer";
import "../../../styles/EditPage/listModal.scss";
import SearchBar from "../../ListPage/utils/SearchBar";

const ListModal = ({
  showModal,
  toggleModal,
  createNote,
  notes,
  selectedNote,
  setSelectedNote,
  deleteNote,
  setCurrentDoc,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      size="lg"
      centered
      className="list-modal" // Add the new CSS class
    >
      <Modal.Header closeButton>
        <Modal.Title>Chapters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <List
          createNote={createNote}
          notes={notes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          deleteNote={deleteNote}
          setCurrentDoc={setCurrentDoc}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ListModal;
