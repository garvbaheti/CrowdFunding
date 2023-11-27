import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun, logout } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";


const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#6a2272"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(localStorage.theme || "light"); // Set initial theme


  // function to dissconnect from metamask
  const disconnect = useDisconnect();


  function handleClick() {
    // Toggle theme
    setTheme(theme => (theme === "light" ? "dark" : "light"));
    
    // Set theme in localStorage
    localStorage.theme = theme === "light" ? "dark" : "light";
  
    // Toggle dark class on document element
    document.documentElement.classList.toggle("dark", theme === "dark"); 
  }

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
          <Icon onClick={disconnect} styles="bg-[#1c1c24] shadow-secondary" imgUrl={logout}/>
        </div>

        <Icon onClick={handleClick} styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun}/>
      </div>
    </div>
  );
};

export default Sidebar;
