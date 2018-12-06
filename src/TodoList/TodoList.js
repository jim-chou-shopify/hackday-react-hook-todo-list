import React, { useState } from "react";
import PropTypes from "prop-types";
import Todo from "./components/Todo";

export default function TodoList(props) {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(props.initialTodos || []);
  const [completedTodoIds, setCompletedTodoIds] = useState([]);

  function handleTodoInput(e) {
    setTodoInput(e.target.value);
  }

  function handleAddTodo() {
    setTodos([...todos, todoInput]);
  }

  function handleComplete(id) {
    setCompletedTodoIds([...completedTodoIds, id]);
  }

  function handleUndo(id) {
    const ids = completedTodoIds.filter(completedId => completedId !== id);
    console.log(ids);
    setCompletedTodoIds(ids);
  }

  function handleDelete(index) {
    const newTodos = [
      ...todos.slice(0, index),
      ...todos.slice(index + 1, todos.length)
    ];
    setTodos(newTodos);
  }

  const todosMarkup =
    todos &&
    todos.map((todo, i) => (
      <li key={i}>
        <Todo
          id={i}
          item={todo}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
          handleUndo={handleUndo}
        />
      </li>
    ));

  const completedTodoMarkup =
    completedTodoIds &&
    completedTodoIds.map(id => {
      return <li key={id}>{todos[id]}</li>;
    });
  return (
    <>
      <form>
        <input type="text" onChange={handleTodoInput} value={todoInput} />
        <button type="button" onClick={handleAddTodo}>
          Add
        </button>
      </form>
      <ul>{todosMarkup}</ul>
      <section>
        <h2>Completed todos:</h2>
        <ul>{completedTodoMarkup}</ul>
      </section>
    </>
  );
}

TodoList.propTypes = {
  initialTodos: PropTypes.object
};
