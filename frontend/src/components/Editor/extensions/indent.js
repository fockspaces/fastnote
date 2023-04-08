import Paragraph from "@tiptap/extension-paragraph";

const handleIndent = (editor) => {
  if (!(editor.isActive("bulletList") || editor.isActive("orderedList")))
    return editor.commands.insertContent("  ");

  return editor.commands.sinkListItem("listItem");
};

// Overwrite the keyboard shortcuts
export const CustomParagraph = Paragraph.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () =>
        this.editor
          .chain()
          .focus()
          .command(() => {
            handleIndent(this.editor);
          }),
    };
  },
});
