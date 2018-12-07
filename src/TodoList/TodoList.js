import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Todo, { createTodo } from "./components/Todo";

async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await response.json();
}

export default function TodoList() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodoIds, setCompletedTodoIds] = useState([]);

  useEffect(async () => {
    const todo = await fetchTodos();
    const firstFiveTodos = todo.slice(0, 5);
    setTodos(firstFiveTodos);
    // To run an effect and clean it up only once (on mount and unmount),
    // you can pass an empty array ([]) as a second argument.
    // This tells React that your effect doesn’t depend on any values from props or state,
    // so it never needs to re-run.
  }, []);

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

  const todosMarkup = todos.map(({ id, title }) => (
    <li key={id}>
      <Todo
        id={id}
        title={title}
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
          {todo.title}
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
