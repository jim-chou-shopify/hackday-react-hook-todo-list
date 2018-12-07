import React from "react";
import PropTypes from "prop-types";

export default function Todo({
  id,
  title,
  handleDelete,
  handleComplete,
  handleUndo
}) {
  return (
    <div className="Todo-item">
      <span className="Todo-item__text">{title}</span>
      <div>
        <button onClick={() => handleDelete(id)}>Remove</button>
        <label>
          <input
            type="checkbox"
            onChange={e => {
              return e.target.checked ? handleComplete(id) : handleUndo(id);
            }}
          />
        </label>
      </div>
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  handleComplete: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUndo: PropTypes.func
};
