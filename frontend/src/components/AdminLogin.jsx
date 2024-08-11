import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin_password") {
      navigate("/dashboard");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <br />
      <div className="password">for now password is : admin_password</div>
      
    </div>
  );
};

export default AdminLogin;
