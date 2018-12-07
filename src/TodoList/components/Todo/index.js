import Todo from "./Todo";
export default Todo;

export function createTodo(title) {
  return { id: Date.now(), title };
}
