import "./Tiptap.scss";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import { Floating, Bubble } from "./Menu";
import { CustomParagraph } from "./extensions/indent";

const Tiptap = ({ content, setContent }) => {
  const updateHandler = () => {
    const context = editor.getHTML();
    setContent(context);
  };

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit,
      CustomParagraph,
    ],
    onUpdate: updateHandler,
    content,
  });

  return (
    <>
      <Bubble editor={editor} tippyOptions={{ duration: 100 }} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
