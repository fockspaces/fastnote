import Placeholder from "@tiptap/extension-placeholder";

export const CustomPlacehoder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "Title...";
    }

    return "press 'ctrl' + '/' to show menu";
  },
});
