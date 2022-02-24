import { useState } from "react";
import { useSavedState } from "./hooks/useSavedTodo";
import {
  default as TodoItem,
  default as TodoItemProps,
} from "./Types/TodoItems";

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useSavedState([], "todos");
  const [newTodo, setNewTodo] = useState<TodoItemProps>({
    id: todos.length > 0 ? todos.length : -1,
    text: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setNewTodo({ id: newTodo.id, text: event.target.value });
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo({
      id: todos.length,
      text: "",
    });
  };

  const handleRemoveClick = (_event: React.MouseEvent, id: number) => {
    setTodos(todos.filter((todos: TodoItem) => todos.id !== id));
  };

  return (
    <main>
      <div className="new-todo">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter a new task</label>
          <div className="new-todo_Form">
            <input
              type="text"
              onChange={handleChange}
              value={newTodo.text}
              required
            />
            <button type="submit">ADD</button>
          </div>
        </form>
      </div>
      {/* TODOS List */}
      <ul className="todos">
        {todos.map((todo: TodoItem) => {
          return (
            <li style={{ listStyle: "number" }} key={todo.id}>
              <button
                style={{ marginLeft: "10px", marginRight: "10px" }}
                onClick={(e) => handleRemoveClick(e, todo.id)}
              >
                Remove
              </button>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default App;
