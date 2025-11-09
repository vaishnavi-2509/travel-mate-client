import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import AdminHome from "./admin/AdminHome";
import { useAuth } from "./Auth/AuthContext";

const App = () => {
  const { isAdmin } = useAuth();
  console.log("isAdmin", isAdmin);
  return (
    <Router>
      <Routes>
        {isAdmin ? <Route path="/" element={<AdminHome/>}/> :<Route path="/" element={<Home />} />}
        <Route
          path="/signup"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
              <SignupPage />
            </div>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
