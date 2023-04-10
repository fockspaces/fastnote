import { useEffect, useState } from "react";
import List from "./List";
import Note from "../components/Note/Note";
import { updateNote } from "../utils/noteHelper";
import { saveDocument } from "../api/saveDocument";
import { v4 as uuidv4 } from "uuid";

const EditPage = ({ document }) => {
  const [currentDoc, setCurrentDoc] = useState(document);
  const [selectedNote, setSelectedNote] = useState({ content: null });

  // re-render when document changed
  useEffect(() => {
    setCurrentDoc(document);
  }, [document]);

  // update existing notes
  const updateSelectedNote = (content) => {
    if (!content || !currentDoc.paragraphs.length) return;
    const newNote = updateNote(selectedNote, content);
    const updatedParagraphs = currentDoc.paragraphs.map((paragraph) => {
      return paragraph.id === selectedNote.id ? newNote : paragraph;
    });
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
  };

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
    setSelectedNote({ content: null });
  };

  // auto-save in 5 secs
  useEffect(() => {
    let timeoutId;
    const saveDelay = 2000; // set the delay time to 5 seconds

    const saveCurrentDoc = async () => {
      try {
        console.log("document has been saved!");
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
      <Note
        selectedNote={selectedNote}
        updateSelectedNote={updateSelectedNote}
      />
    </>
  );
};

export default EditPage;
