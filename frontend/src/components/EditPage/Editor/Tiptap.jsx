import "./Tiptap.scss";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";

import { Bubble } from "./Menu";
import { CustomDocument } from "./extensions/Document";
import { CustomParagraph } from "./extensions/indent";
import { CustomPlacehoder } from "./extensions/Placeholder";
import { uploadImage } from "../../../api/images/uploadImage";
import Link from "@tiptap/extension-link";

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
      Image.configure({
        inline: false,
      }),
      Link.configure({
        openOnClick: true,
        defaultProtocol: "http",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    onUpdate: updateHandler,
    content: note.content,
  });

  const imageInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = await uploadImage(file);

      if (imageUrl) {
        editor
          .chain()
          .focus()
          .setImage({ src: process.env.REACT_APP_S3_BASE_URL + imageUrl })
          .run();
      }
    }

    // Reset the input value to allow uploading the same image again
    event.target.value = null;
  };

  useEffect(() => {
    // update the document whenever the paragraph prop changes
    if (editor) editor.commands.setContent(note.content);
  }, []);

  const selectCurrentWord = () => {
    const { selection } = editor.state;
    const { $from, $to } = selection;

    if ($from.sameParent($to)) {
      const regex = /\b/;
      const fromPos = $from.start();
      const toPos = $to.end();
      const textNode = $from.parent.textContent;
      console.log(textNode.length );
      // If no text is selected
      if (textNode.length === 0) {
        // Insert space and select it
        const tr = editor.state.tr;
        tr.insertText(" ", fromPos, toPos);
        tr.setSelection(
          selection.constructor.create(tr.doc, fromPos, fromPos + 1)
        );
        editor.view.dispatch(tr);
        return;
      }

      const startOffset = textNode.slice(0, $from.parentOffset).search(regex);
      const endOffset = textNode.slice($from.parentOffset).search(regex);
      const startPos = fromPos + (startOffset === -1 ? 0 : startOffset);
      const endPos = endOffset === -1 ? toPos : $from.pos + endOffset;

      const tr = editor.state.tr;
      tr.setSelection(selection.constructor.create(tr.doc, startPos, endPos));
      editor.view.dispatch(tr);
    }
  };

  // handle image upload and bubble menu
  useEffect(() => {
    if (editor) {
      const handleKeydown = (event) => {
        const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        const cmdKey = isMac ? event.metaKey : event.ctrlKey;
        const slashKey = event.key === "/";
        const singleQuoteKey = event.key === "'";
        const escKey = event.key === "Escape";

        if (cmdKey && slashKey) {
          event.preventDefault();
          // Select the current word
          selectCurrentWord();
        }

        if (cmdKey && singleQuoteKey) {
          event.preventDefault();
          // Trigger image upload
          imageInputRef.current.click();
        }

        // Collapse selection when ESC key is pressed
        if (escKey) {
          event.preventDefault();
          const { selection } = editor.state;
          const tr = editor.state.tr;
          tr.setSelection(
            selection.constructor.create(tr.doc, selection.to, selection.to)
          );
          editor.view.dispatch(tr);
        }
      };

      editor.view.dom.addEventListener("keydown", handleKeydown);

      return () => {
        editor.view.dom.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [editor]);

  return (
    <>
      <Bubble
        editor={editor}
        tippyOptions={{ duration: 100 }}
        imageInputRef={imageInputRef}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={imageInputRef}
      />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
