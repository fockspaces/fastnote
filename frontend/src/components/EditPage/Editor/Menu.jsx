import { BubbleMenu, FloatingMenu } from "@tiptap/react";
import "./Menu.scss";

export const Bubble = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu"
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
    </BubbleMenu>
  );
};

export const Floating = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <FloatingMenu
      editor={editor}
      className="floating-menu"
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
    </FloatingMenu>
  );
};
