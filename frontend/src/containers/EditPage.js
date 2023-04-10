import { useEffect, useState } from "react";
import List from "./List";
import Note from "../components/Note/Note";
import { updateNote } from "../utils/noteHelper";
import { saveDocument } from "../api/saveDocument";
import { v4 as uuidv4 } from "uuid";

const EditPage = ({ document }) => {
  const [currentDoc, setCurrentDoc] = useState(document);
  const [selectedNote, setSelectedNote] = useState({ preview: true });

  // re-render when document changed
  useEffect(() => {
    setCurrentDoc(document);
  }, [document]);

  // create new note
  const createNote = () => {
    const newNote = { id: uuidv4(), title: "new note", content: "" };
    const updatedParagraphs = [...currentDoc.paragraphs, newNote];
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
    setSelectedNote(newNote);
  };

  // delete note
  const deleteNote = (note) => {
    const updatedParagraphs = currentDoc.paragraphs.filter(
      (p) => p.id !== note.id
    );
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
    setSelectedNote({
      preview: true,
    });
  };

  // auto-save in 5 secs
  useEffect(() => {
    let timeoutId;
    const saveDelay = 1000; // set the delay time to 1 seconds

    const saveCurrentDoc = async () => {
      try {
        await saveDocument(currentDoc);
      } catch (error) {
        console.error(error);
      }
    };

    const handleAutoSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(saveCurrentDoc, saveDelay);
    };
    handleAutoSave();
    return () => clearTimeout(timeoutId);
  }, [currentDoc]);

  return (
    <>
      <List
        createNote={createNote}
        notes={currentDoc.paragraphs}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
      />
      <Note selectedNote={selectedNote} setCurrentDoc={setCurrentDoc} />
    </>
  );
};

export default EditPage;
