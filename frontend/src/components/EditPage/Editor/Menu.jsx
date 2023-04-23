import { BubbleMenu } from "@tiptap/react";
import { useRef } from "react";
import "./Menu.scss";

export const Bubble = ({ editor, imageInputRef }) => {
  const boldButtonRef = useRef(null);
  const italicButtonRef = useRef(null);
  const bulletListButtonRef = useRef(null);
  const codeBlockButtonRef = useRef(null);

  if (!editor) {
    return null;
  }
  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu"
      tippyOptions={{ duration: 100 }}
    >
      <button>
        <div className="button-content">
          Heading <span className="hint-shortcut">⌘ + ⌥ + Number</span>
        </div>
      </button>
      <button
        ref={boldButtonRef}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <div className="button-content">
          bold <span className="hint-shortcut">⌘ + B</span>
        </div>
      </button>
      <button
        ref={italicButtonRef}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <div className="button-content">
          italic <span className="hint-shortcut">⌘ + I</span>
        </div>
      </button>
      <button
        ref={bulletListButtonRef}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <div className="button-content">
          BulletList <span className="hint-shortcut">⌘ + shift + 8</span>
        </div>
      </button>
      <button
        ref={codeBlockButtonRef}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <div className="button-content">
          CodeBlock <span className="hint-shortcut">⌘ + ⌥ + C</span>
        </div>
      </button>
      <button
        onClick={() => {
          imageInputRef.current.click();
        }}
      >
        <div className="button-content">
          Image Upload <span className="hint-shortcut">⌘ + '</span>
        </div>
      </button>
    </BubbleMenu>
  );
};
