import Placeholder from "@tiptap/extension-placeholder";

export const CustomPlacehoder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "What’s the title?";
    }

    return "Can you add some further context?";
  },
});
