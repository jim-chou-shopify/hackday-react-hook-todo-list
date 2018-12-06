import React from "react";
import PropTypes from "prop-types";

export default function Todo({
  id,
  item,
  handleDelete,
  handleComplete,
  handleUndo
}) {
  return (
    <div className="Todo-item">
      {item}
      <button onClick={() => handleDelete(id)}>X</button>
      <label>
        <input
          type="checkbox"
          onChange={e => (e.target.value ? handleComplete(id) : handleUndo(id))}
        />
      </label>
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number,
  item: PropTypes.string,
  handleComplete: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUndo: PropTypes.func
};
