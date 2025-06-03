import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import AdminHome from "./admin/AdminHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600"><SignupPage /></div>} />
        <Route path="/login" element={<LoginPage />} />
        {/* //add admin here */}
        <Route path="/" element={<AdminHome />} />
      </Routes>
      
    </Router>

  );
};

export default App;
