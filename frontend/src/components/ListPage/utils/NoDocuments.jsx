import '../../../styles/ListPage/utils/noDocuments.scss'

function NoDocumentsHint({ is_trash }) {
  if (is_trash)
    return (
      <div className="no-documents-hint">
        <h2>No documents in trash.</h2>
        <p>Try dragging the documents into trash bin.</p>
      </div>
    );

  return (
    <div className="no-documents-hint">
      <h2>No matching documents found.</h2>
      <p>Try adjusting your search or adding new documents.</p>
    </div>
  );
}

export default NoDocumentsHint;
