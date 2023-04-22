import React from "react";
import { useDragLayer } from "react-dnd";

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    zIndex: 998, // zIndex value lower than DarkBackground.jsx
  };
}

const DragLayer = () => {
  const { itemType, isDragging, currentOffset } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== "document") {
    return null;
  }

  return (
    <div style={getItemStyles(currentOffset)}>
      {/* You can customize the appearance of the dragging item here */}
      <div style={{ opacity: 0.5, pointerEvents: "none" }}>Dragging Item</div>
    </div>
  );
};

export default DragLayer;
