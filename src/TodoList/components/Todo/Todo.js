import React from "react";

export default function Todo({ index, item, handleDelete }) {
  return (
    <div className="Todo-item">
      {item}
      <button onClick={() => handleDelete(index)}>X</button>
    </div>
  );
}
