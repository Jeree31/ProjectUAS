import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/register");
    }
  }, [navigate]);

  return <div>{children}</div>;
}

export default Protected;
