import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UsersSearch } from './pages/UsersSearch';
import { useEffect, useState } from 'react';
import { ReposSearch } from './pages/ReposSearch';
import { Container, Form } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { Navigator } from './components/Navigator';

function App() {
  const [route, setRoute] = useState('');

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/users" />} />
          <Route
            path="/users"
            element={<UsersSearch />} />
          <Route
            path="/repositories"
            element={<ReposSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
