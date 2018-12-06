import React, { useState } from "react";
import PropTypes from "prop-types";
import Todo, { createTodo } from "./components/Todo";

export default function TodoList(props) {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(props.initialTodos || []);
  const [completedTodoIds, setCompletedTodoIds] = useState([]);

  function handleTodoInput(e) {
    setTodoInput(e.target.value);
  }

  function handleAddTodo() {
    const value = todoInput.trim();
    value.length > 0 && setTodos([...todos, createTodo(value)]);
  }

  function handleComplete(id) {
    setCompletedTodoIds([...completedTodoIds, id]);
  }

  function handleUndo(id) {
    const ids = completedTodoIds.filter(completedId => completedId !== id);
    setCompletedTodoIds(ids);
  }

  function handleDelete(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
      const newTodos = [
        ...todos.slice(0, todoIndex),
        ...todos.slice(todoIndex + 1, todos.length)
      ];
      setTodos(newTodos);
    }

    const completedTodoIndex = completedTodoIds.findIndex(
      completedTodoId => completedTodoId === id
    );
    if (completedTodoIndex > -1) {
      const newCompletedTodoIds = [
        ...completedTodoIds.slice(0, completedTodoIndex),
        ...completedTodoIds.slice(
          completedTodoIndex + 1,
          completedTodoIds.length
        )
      ];
      setCompletedTodoIds(newCompletedTodoIds);
    }
  }

  const todosMarkup = todos.map(({ id, value }) => (
    <li key={id}>
      <Todo
        id={id}
        item={value}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        handleUndo={handleUndo}
      />
    </li>
  ));

  const completedTodoMarkup = completedTodoIds.map(id => {
    const todo = todos.find(todo => todo.id === id);
    return (
      todo && (
        <li key={id} className="Todo-item--done">
          {todo.value}
        </li>
      )
    );
  });

  return (
    <div className="TodoList">
      <form>
        <input type="text" onChange={handleTodoInput} value={todoInput} />
        <button type="button" onClick={handleAddTodo}>
          Add
        </button>
      </form>
      <section>
        <h2>Todos:</h2>
        <ul>{todosMarkup}</ul>
      </section>
      {Boolean(completedTodoIds.length) && (
        <section>
          <h2>Completed todos:</h2>
          <ul>{completedTodoMarkup}</ul>
        </section>
      )}
    </div>
  );
}

TodoList.propTypes = {
  initialTodos: PropTypes.arrayOf(Object)
};
