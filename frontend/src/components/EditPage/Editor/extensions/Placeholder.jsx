import Placeholder from "@tiptap/extension-placeholder";

export const CustomPlacehoder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "Title...";
    }
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    const commandKey = isMac ? "⌘" : "Ctrl";
    return `press ${commandKey} + /  to show menu`;
  },
});
