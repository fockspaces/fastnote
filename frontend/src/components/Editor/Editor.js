import { useEffect, useState } from "react";
import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import GoogleOAuth from "../GoogleOAuth";

import "@blocknote/core/style.css";

// fetch data
const data = JSON.parse(localStorage.getItem("blocks"));

function Editor() {
  const [blocks, setBlocks] = useState(data);
  const [title, setTitle] = useState("123");
  const [tags, setTags] = useState([1, 2, 3]);

  const editor = useBlockNote({
    initialContent: blocks,
    onEditorContentChange: (editor) => {
      setBlocks(editor.topLevelBlocks);
      localStorage.setItem("blocks", JSON.stringify(editor.topLevelBlocks));
    },
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(","));
  };

  const handleSubmit = async () => {
    try {
      console.log({ title, tags, blocks });
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          title: title,
          tags: tags,
          blocks: blocks,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <label htmlFor="tags">Tags:</label>
      <input type="text" id="tags" value={tags} onChange={handleTagChange} />
      <br />
      <BlockNoteView editor={editor} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default Editor;
