import React from "react";

interface props {
  type: "success" | "danger"
  message: string
}

export const Alert: React.FC<props> = ({ type, message }) => {
  return <><div className={`alert ${type === "success" ? "alert-primary" : "alert-danger"}`} role="alert">
    {message}
  </div></>;
};

export default Alert;
