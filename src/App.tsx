import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/ChatgptDashboard"; 
import NotFound from "./pages/NotFound";

const App = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();

useEffect(() => {
  const restoreSession = async () => {
    try {
      await getAccessTokenSilently();
    } catch (error) {
      console.error("Error",error)
      loginWithRedirect();
    }
  };

  if (!isAuthenticated && !isLoading) {
    restoreSession();
  }
}, [isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
