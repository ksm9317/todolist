// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Todo from './page/Todo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
