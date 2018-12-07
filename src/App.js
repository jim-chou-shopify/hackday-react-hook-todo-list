import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./TodoList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>
            Todo List - Built with hooks{" "}
            <span role="img" aria-label="hooks">
              🧐
            </span>
          </span>
        </header>
        <TodoList />
      </div>
    );
  }
}

export default App;
