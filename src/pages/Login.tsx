import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <button
          onClick={() => loginWithRedirect()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
