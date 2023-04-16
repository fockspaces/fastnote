import "./Tiptap.scss";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";

import { Floating, Bubble } from "./Menu";
import { CustomDocument } from "./extensions/Document";
import { CustomParagraph } from "./extensions/indent";
import { CustomPlacehoder } from "./extensions/Placeholder";

const Tiptap = ({ note, setContent }) => {
  const updateHandler = () => {
    const context = editor.getHTML();
    setContent(context);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: false, document: false }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      CustomDocument,
      CustomParagraph,
      CustomPlacehoder,
      Image,
    ],
    onUpdate: updateHandler,
    content: note.content,
  });

  useEffect(() => {
    // update the document whenever the paragraph prop changes
    if (editor) editor.commands.setContent(note.content);
  }, [note]);

  return (
    <>
      <Bubble editor={editor} tippyOptions={{ duration: 100 }} />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={(input) => (imageInput = input)}
      />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
