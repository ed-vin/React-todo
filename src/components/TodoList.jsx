import { useState } from 'react';

function TodoList({
  todos,
  newTodo,
  setNewTodo,
  handleAddTodo,
  completeTodo,
  handleClearTodos
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filtrer todos based on selectedDate
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  return (
    <div className="todo-container">
      <h2>Add task</h2>
      <div className="todo-inputs">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New task..."
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Uppdatera datum
        />
        <button type="button" onClick={() => handleAddTodo(selectedDate)}>
          Add new
        </button>
        <button type="button" onClick={() => handleClearTodos(selectedDate)} className="clear-btn">
          Remove all
        </button>
        <h2>Today's Tasks</h2>
      </div>
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No task's this date.</p>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span>{todo.text}</span>
              {!todo.completed && (
                <button type="button" className="done-btn" onClick={() => completeTodo(todo.id)}>
                  ✔
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
