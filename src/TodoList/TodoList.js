import React, { useState } from "react";
import Todo from "./components/Todo";

export default function TodoList(props) {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(props.initialTodos);

  function handleTodoInput(e) {
    setTodoInput(e.target.value);
  }

  function handleAddTodo() {
    setTodos([...todos, todoInput]);
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
        <Todo index={i} item={todo} handleDelete={handleDelete} />
      </li>
    ));

  return (
    <>
      <form>
        <input type="text" onChange={handleTodoInput} value={todoInput} />
        <button type="button" onClick={handleAddTodo}>
          Add
        </button>
      </form>
      <ul>{todosMarkup}</ul>
    </>
  );
}
