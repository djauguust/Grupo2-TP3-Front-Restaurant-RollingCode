import React, { createContext, useContext, useState } from "react";


export const NavbarContext = createContext(null);

export const NavbarContexto = ({ children }) => {
  const [theme, settheme] = useState("claro");

  const handleSwitch = (e) => {
    if (e.target.checked) {
      settheme("oscuro");
    } else {
      settheme("claro");
    }
    console.log("asdasd")
};

const datos = { theme, handleSwitch };
  return (
    <>
      <NavbarContext.Provider value={datos}>{children}</NavbarContext.Provider>
    </>
  );
};

export default NavbarContexto