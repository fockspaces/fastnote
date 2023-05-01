const NotePreview = ({ setShowModal }) => {
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  const commandKey = isMac ? "⌘" : "Ctrl";

  return (
    <div
      className="note-preview"
      onClick={() => setShowModal(true)}
    >{`Press ${commandKey} + m to open note list`}</div>
  );
};

export default NotePreview;
