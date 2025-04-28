import { useState } from 'react';
//import './TodoList.css';

function TodoList({
  todos,
  newTodo,
  setNewTodo,
  handleAddTodo,
  completeTodo,
  handleClearTodos
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filtrera todos baserat på selectedDate
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  return (
    <div className="todo-container">
      <h2>Dagens uppgifter</h2>
      <div className="todo-inputs">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Ny uppgift..."
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} // Uppdatera datum
        />
        <button type="button" onClick={() => handleAddTodo(selectedDate)}>
          Lägg till
        </button>
        <button type="button" onClick={() => handleClearTodos(selectedDate)} className="clear-btn">
          Rensa alla
        </button>
      </div>
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>Inga uppgifter för det här datumet.</p>
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
