import { FC, MouseEventHandler } from "react";
import "./index.scss";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text_button: string;
}

const Button: FC<ButtonProps> = ({ onClick, text_button }) => {
  return (
    <button onClick={onClick} className="button-18">
      {text_button} 
    </button>
  );
};

export default Button;
