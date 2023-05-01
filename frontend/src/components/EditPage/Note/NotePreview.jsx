const NotePreview = ({ createNote }) => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const commandKey = isMac ? "⌘" : "Ctrl";

  return (
    <div
      className="note-preview"
      onClick={createNote}
    >{`Press ${commandKey} + m to open paragraphs list`}</div>
  );
};

export default NotePreview;
