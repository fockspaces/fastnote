import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import List from "../containers/List";
import Note from "../components/Note/Note";
import { saveDocument } from "../api/saveDocument";
import { v4 as uuidv4 } from "uuid";
import { fetchDocument } from "../api/fetchDocument";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";
import { updateDoc } from "../api/updateDocument";

const EditPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [selectedNote, setSelectedNote] = useState({ preview: true });
  const { id } = useParams();

  useEffect(() => {
    const fetchDoc = async () => {
      const fetchedDocument = await fetchDocument(id);
      setCurrentDoc(fetchedDocument);
      setLoading(false);
    };
    fetchDoc();
  }, [id]);

  // auto-save in 5 secs
  // useEffect(() => {
  //   let timeoutId;
  //   const saveDelay = 500; // set the delay time to 0.5 seconds

  //   const saveCurrentDoc = async () => {
  //     try {
  //       await saveDocument(currentDoc);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handleAutoSave = () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(saveCurrentDoc, saveDelay);
  //   };
  //   handleAutoSave();
  //   return () => clearTimeout(timeoutId);
  // }, [currentDoc]);

  if (loading) {
    return <Loading />;
  }
  if (!currentDoc) {
    return <NotFound />;
  }

  // create new note
  const createNote = async () => {
    const newNote = { id: uuidv4(), title: "new note", content: "" };
    const updatedParagraphs = [...currentDoc.paragraphs, newNote];
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
    setSelectedNote(newNote);
    // save to db
    await updateDoc({ document: currentDoc, ...newNote }, "insert_paragraph");
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

  return (
    <>
      <List
        createNote={createNote}
        notes={currentDoc.paragraphs}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
        currentDoc={currentDoc}
        setCurrentDoc={setCurrentDoc}
      />
      <Note selectedNote={selectedNote} setCurrentDoc={setCurrentDoc} />
    </>
  );
};

export default EditPage;
