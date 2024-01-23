import React from "react";

const Button = ({ title, icon, handleClick }) => {
  const iconProp = icon ? icon : null
  const btnTitle = title ? title : "Button";
  return (
    <button className="text-black bg-lime-400 max-w-[170px] w-full h-[50px] rounded-[30px] flex flex-row items-center justify-center" onClick={handleClick}>
      {iconProp}
      <span>{btnTitle}</span>
    </button>
  );
};

export default Button;
