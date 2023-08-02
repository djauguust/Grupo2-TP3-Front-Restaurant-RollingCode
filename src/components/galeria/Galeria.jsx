import React from "react";
import "./Galeria.css";

const Galeria = () => {
  return (
    <>
      <body className="body-galeria">
      <h2 className="text-center text-light">Galeria</h2>
      <div className="grid-container">
        <div className="grid-item wide img-1" ></div>
        <div className="grid-item img-2"></div>
        <div className="grid-item tall img-3">3</div>
        <div className="grid-item img-4">4</div>
        <div className="grid-item img-5">5</div>
        <div className="grid-item wide img-6">6</div>
        <div className="grid-item tall img-7">7</div>
        <div className="grid-item img-8">8</div>
      </div>
      </body>
    </>
  );
};

export default Galeria;
