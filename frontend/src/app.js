import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateMovie from './pages/CreateMovie';
import MovieList from './pages/MovieList';

function App() {
  return (
    <Router>
      <div className="App p-10">
        <Routes>
          <Route path='/' element={<MovieList />} />
          <Route path='/create' element={<CreateMovie />} />
          <Route path='/edit/:id' element={<CreateMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;