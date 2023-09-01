import React, { createContext, useContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarContexto = ({ children }) => {
  const [theme, settheme] = useState("claro");


  

  const handleSwitch = (e) => {
    if (e.target.checked) {
      settheme("oscuro");
    } else {
      settheme("claro");
    }
    
  };

  const datos = { 
    theme,
    handleSwitch,
  };
  return (
    <>
      <NavbarContext.Provider value={datos}>{children}</NavbarContext.Provider>
    </>
  );
};


