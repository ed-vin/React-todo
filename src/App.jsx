import { useState, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile';
import TodoList from './components/TodoList';

function App() {
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  const pointsPerLevel = 100;

  const levelBadges = [
    { level: 5, text: 'Nybörjare!' },
    { level: 10, text: 'Uppgiftsexpert' },
    { level: 20, text: 'Mästare av nivåer!' },
    { level: 30, text: 'Poängkung' },
    { level: 50, text: 'Legend' }
  ];

  const pointsToNextLevel = pointsPerLevel - (points % pointsPerLevel);

  useEffect(() => {
    const savedUsername = localStorage.getItem('loggedInUser');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      const savedData = JSON.parse(localStorage.getItem(`userData_${username}`));
      if (savedData) {
        setTodos(savedData.todos || []);
        setLevel(savedData.level || 1);
        setPoints(savedData.points || 0);
        setBadges(savedData.badges || []);
      }
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      const userData = {
        todos,
        level,
        points,
        badges
      };
      localStorage.setItem(`userData_${username}`, JSON.stringify(userData));
    }
  }, [todos, level, points, badges, username]);

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id && !todo.completed ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);

    setPoints((prevPoints) => {
      const newPoints = prevPoints + 20;
      if (newPoints >= pointsPerLevel) {
        setLevel((prevLevel) => {
          const newLevel = prevLevel + 1;
          const newBadges = levelBadges.filter(badge => badge.level === newLevel);
          if (newBadges.length > 0) {
            setBadges((prevBadges) => [...prevBadges, ...newBadges]);
          }
          return newLevel;
        });
        return newPoints % pointsPerLevel;
      }
      return newPoints;
    });
  };

  const handleAddTodo = (selectedDate) => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        date: selectedDate
      }]);
      setNewTodo('');
    }
  };

  const handleClearTodos = (selectedDate) => {
    setTodos(todos.filter(todo => todo.date !== selectedDate));
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      localStorage.setItem('loggedInUser', inputUsername.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUsername('');
    setInputUsername('');
    setTodos([]);
    setLevel(1);
    setPoints(0);
    setBadges([]);
    setNewTodo('');
  };

  return (
    <div className="app-wrapper">
      {!username ? (
        <div className="set-username">
          <h2>Välj ett användarnamn</h2>
          <form onSubmit={handleSetUsername}>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              placeholder="Användarnamn"
            />
            <button type="submit">Starta</button>
          </form>
        </div>
      ) : (
        <>
          <div className="profile-fixed">
            <Profile
              username={username}
              level={level}
              points={points}
              badges={badges}
              pointsToNextLevel={pointsToNextLevel}
              handleLogout={handleLogout}
            />
          </div>
          <div className="todo-scroll">
            <TodoList
              todos={todos}
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              handleAddTodo={handleAddTodo}
              completeTodo={completeTodo}
              handleClearTodos={handleClearTodos}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
