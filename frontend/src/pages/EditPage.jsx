import "../styles/EditPage/editPage.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import List from "../components/EditPage/List/ListContainer";
import Note from "../components/EditPage/List/Note";
import NotFound from "./functionPage/NotFound";
import { Loading } from "./functionPage/Loading";

import { updateDoc } from "../api/documents/updateDocument";
import { fetchDocument } from "../api/documents/fetchDocument";
import { Modal } from "react-bootstrap";
import ListModal from "../components/EditPage/List/ListModal";

const EditPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [selectedNote, setSelectedNote] = useState({ preview: true });
  const [showModal, setShowModal] = useState(false);

  const { document_id } = useParams();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  // control fetch document
  useEffect(() => {
    const fetchDoc = async () => {
      const fetchedDocument = await fetchDocument(document_id);
      setCurrentDoc(fetchedDocument);
      setLoading(false);
    };
    fetchDoc();
  }, [document_id]);

  // shortcut popup
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      const cmdKey = isMac ? event.metaKey : event.ctrlKey;
      // Check if the 'Cmd' key is pressed (metaKey) and the 'M' key (keyCode 77)
      if (cmdKey && event.keyCode === 77) {
        event.preventDefault();
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!currentDoc) {
    return <NotFound />;
  }

  // create new note
  const createNote = async () => {
    const note = { document_id, title: "new chapter", content: "" };
    const result = await updateDoc(note, "insert_paragraph");
    const newNote = result.data;

    const updatedParagraphs = [...currentDoc.paragraphs, newNote];
    setCurrentDoc((currentDoc) => {
      return { ...currentDoc, paragraphs: updatedParagraphs };
    });
    setSelectedNote(newNote);
  };

  // delete note
  const deleteNote = async (note) => {
    const updatedParagraphs = currentDoc.paragraphs.filter(
      (p) => p._id !== note._id
    );
    const lastNote = updatedParagraphs.slice(-1);
    console.log(lastNote);
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
    setSelectedNote(
      lastNote.length
        ? lastNote[0]
        : {
            preview: true,
          }
    );
    await updateDoc(
      { document_id, paragraph_id: note._id },
      "delete_paragraph"
    );
  };

  return (
    <div className="EditPage">
      <ListModal
        showModal={showModal}
        toggleModal={toggleModal}
        createNote={createNote}
        notes={currentDoc.paragraphs}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
        setCurrentDoc={setCurrentDoc}
      />
      <div className="note">
        <Note
          selectedNote={selectedNote}
          setCurrentDoc={setCurrentDoc}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default EditPage;
