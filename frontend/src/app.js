import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateMovie from './pages/CreateMovie';
import MovieList from './pages/MovieList';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MovieList />} />
      <Route path='/create' element={<CreateMovie />} />
      <Route path='/edit/:id' element={<CreateMovie />} />

      {/* NOT FOUND PAGE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <div className="App p-10">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;