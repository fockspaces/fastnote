import { useState } from "react";
import Tiptap from "../components/Editor/Tiptap";
import ParagraphList from "../components/Note/ParagraphList";

const Editor = ({ document }) => {
  if (!document) {
    return <div className="note-preview">Select a note to view</div>;
  }

  const { paragraphs } = document;
  const [content, setContent] = useState("");

  return (
    <>
      <ParagraphList paragraphs={paragraphs} />
      <Tiptap content={content} setContent={setContent} />
    </>
  );
};

export default Editor;
