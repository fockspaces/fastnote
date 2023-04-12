import React, { useState, useEffect } from "react";
import Tiptap from "../Editor/Tiptap";
import NotePreview from "./NotePreview";
import { updateNote } from "../../utils/noteHelper";
import { useParams } from "react-router-dom";
import { updateDoc } from "../../api/updateDocument";

function Note({ selectedNote, setCurrentDoc }) {
  const [content, setContent] = useState(selectedNote.content);
  const { document_id } = useParams();

  // auto-save to the doc
  useEffect(() => {
    let timeoutId;
    const saveDelay = 500; // set the delay time to 0.5 seconds

    const updateSelectedNote = async () => {
      if (!content || !selectedNote._id) return;
      const newNote = updateNote(selectedNote, content);
      setCurrentDoc((currentDoc) => {
        const updatedParagraphs = currentDoc.paragraphs.map((paragraph) => {
          return paragraph._id === selectedNote._id ? newNote : paragraph;
        });
        return { ...currentDoc, paragraphs: updatedParagraphs };
      });
      await updateDoc(
        { document_id, ...newNote, paragraph_id: newNote._id },
        "update_paragraph"
      );
    };
    const handleAutoSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSelectedNote, saveDelay);
    };
    handleAutoSave();
    return () => clearTimeout(timeoutId);
  }, [content]);

  if (selectedNote.preview) return <NotePreview />;

  return (
    <div className="note">
      <div className="container">
        <Tiptap note={selectedNote} setContent={setContent} />
      </div>
    </div>
  );
}

export default Note;
