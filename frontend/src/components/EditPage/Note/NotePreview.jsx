const NotePreview = () => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const commandKey = isMac ? "⌘" : "Ctrl";

  return (
    <div className="note-preview">{`Press ${commandKey} + m to open paragraphs list`}</div>
  );
};

export default NotePreview;
