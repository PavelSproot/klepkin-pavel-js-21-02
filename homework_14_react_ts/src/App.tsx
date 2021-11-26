import React from 'react';
import './App.css';
import TodoList from './components/ToDoList/TodoList';

const App = function () {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
};

export default App;
