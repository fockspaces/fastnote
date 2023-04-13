import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import List from "../components/EditPage/List/ListContainer";
import Note from "../components/EditPage/List/Note";
import { NotFound } from "./functionPage/NotFound";
import { Loading } from "./functionPage/Loading";

import { updateDoc } from "../api/documents/updateDocument";
import { fetchDocument } from "../api/documents/fetchDocument";

const EditPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [selectedNote, setSelectedNote] = useState({ preview: true });
  const { document_id } = useParams();

  useEffect(() => {
    const fetchDoc = async () => {
      const fetchedDocument = await fetchDocument(document_id);
      setCurrentDoc(fetchedDocument);
      setLoading(false);
    };
    fetchDoc();
  }, [document_id]);

  if (loading) {
    return <Loading />;
  }
  if (!currentDoc) {
    return <NotFound />;
  }

  // create new note
  const createNote = async () => {
    const note = { document_id, title: "new note", content: "" };
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
    setCurrentDoc({ ...currentDoc, paragraphs: updatedParagraphs });
    setSelectedNote({
      preview: true,
    });
    await updateDoc(
      { document_id, paragraph_id: note._id },
      "delete_paragraph"
    );
  };

  return (
    <div className="EditPage">
      <List
        createNote={createNote}
        notes={currentDoc.paragraphs}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
        setCurrentDoc={setCurrentDoc}
      />
      <div className="note">
        <Note selectedNote={selectedNote} setCurrentDoc={setCurrentDoc} />
      </div>
    </div>
  );
};

export default EditPage;
