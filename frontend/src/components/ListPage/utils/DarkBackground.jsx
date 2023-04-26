import styles from "../../../styles/ListPage/utils/DarkBackground.module.scss";
import React from "react";

const DarkBackground = ({ isDraggingDocument, is_trash }) => {
  if (!isDraggingDocument) {
    return null;
  }

  return (
    <>
      <div className={styles.darkBackground} />
      <div className={styles.hintContainer}>
        {is_trash ? (
          <div className={styles.restoreHint}>Restore</div>
        ) : (
          <div></div>
        )}
        <div className={styles.trashHint}>Delete</div>
      </div>
    </>
  );
};

export default DarkBackground;
