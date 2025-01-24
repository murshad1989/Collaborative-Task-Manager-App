import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/HomePage.css'; // Ensure `.css` extension is present
import './styles/Register.css'; // Adjust path if styles folder is at src level
import RegisterPage from './pages/RegisterPage'; // Create/Register
import LoginPage from './pages/LoginPage'; // Login
import HomePage from './pages/HomePage'; // HomePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
