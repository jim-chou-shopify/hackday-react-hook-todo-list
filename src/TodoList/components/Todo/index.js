import Todo from "./Todo";
export default Todo;

export function createTodo(value) {
  return { id: Date.now(), value };
}
