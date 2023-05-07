import React from "react";

interface props {
  text: string
  clase: string
  event: () => void
  type: "submit" | "button" | "reset"
}

const Button: React.FC<props> = ({ text, clase, event, type }) => {
  return <button type={type} onClick={() => { event(); }} className={clase}>{text}</button>;
};

export default Button;
