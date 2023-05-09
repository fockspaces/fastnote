/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../styles/ListPage/utils/titleList.scss";

const TitleList = ({ documents }) => {
  const scrollToDocument = (documentId) => {
    const documentElement = document.getElementById(`document-${documentId}`);
    if (documentElement) {
      documentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderList = documents.map((document) => {
    return (
      <div key={document._id}>
        <a
          onClick={() => {
            scrollToDocument(document._id);
          }}
          className="title-link"
        >
          {document.paragraphs[0].title}
        </a>
      </div>
    );
  });

  return (
    <div className="title-list-container">
      {renderList}
    </div>
  );
};

export default TitleList;
