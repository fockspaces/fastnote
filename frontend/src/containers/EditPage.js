import { useEffect, useState } from "react";
import List from "./List";
import Note from "../components/Note/Note";
import { updateNote } from "../utils/noteHelper";
import { saveDocument } from "../api/saveDocument";

const EditPage = ({ document }) => {
  const [currentDoc, setCurrentDoc] = useState(document);
  const [selectedNote, setSelectedNote] = useState({ content: null });

  useEffect(() => {
    setCurrentDoc(document);
  }, [document]);

  // update document
  const updateSelectedNote = (content) => {
    if (!content || !currentDoc.paragraphs.length) return;
    const newNote = updateNote(selectedNote, content);
    const updatedParagraphs = currentDoc.paragraphs.map((paragraph) => {
      return paragraph._id === selectedNote._id ? newNote : paragraph;
    });
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
  };

  // auto-save in 5 secs
  useEffect(() => {
    let timeoutId;
    const saveDelay = 5000; // set the delay time to 5 seconds

    const saveCurrentDoc = async () => {
      try {
        console.log("document has been saved!", currentDoc);
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
      <List notes={currentDoc.paragraphs} setSelectedNote={setSelectedNote} />
      <Note
        selectedNote={selectedNote}
        updateSelectedNote={updateSelectedNote}
      />
    </>
  );
};

export default EditPage;
