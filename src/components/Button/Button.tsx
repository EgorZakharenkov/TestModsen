import React from "react";
import "./style.scss";

interface Props {
  className?: string;
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "full";
}

export const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  disabled,
  variant = "default",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${className} ${variant}`}
    >
      {children}
    </button>
  );
};
