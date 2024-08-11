import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <h1>Flashcard Learning Tool</h1>
      <p>Please select your role:</p>
      <div className="role-buttons">
        <button onClick={() => navigate("/user")}>User</button>
        <button onClick={() => navigate("/admin")}>Admin</button>
      </div>
    </div>
  );
};

export default RoleSelection;
