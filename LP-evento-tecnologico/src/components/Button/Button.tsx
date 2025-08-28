import React from "react";
import style from "./Button.module.css";

interface ButtonProps {
  content: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // onClick opcional
}

const Button: React.FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <button onClick={onClick} className={style.button}>
      {content}
    </button>
  );
};

export default Button;