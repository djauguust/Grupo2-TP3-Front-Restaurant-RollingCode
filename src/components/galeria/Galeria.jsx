import React from "react";
import "./Galeria.css";

const Galeria = () => {
  return (
    <>
      <body className="body-galeria">
      <h2 className="text-center text-light">Galeria</h2>
      <div className="grid-container">
        <div className="grid-item img-1" ><img src="public\galeria\restaurant-terrazza-danieli-at-dusk.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-2"><img src="public\galeria\pizza.jpg" alt="" className="img-1"/></div>
        <div className="grid-item tall img-3"><img src="public\galeria\huge.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-4"><img src="public\galeria\cena.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-5 wide"><img src="public\galeria\Dabble_Entrance.jpg" alt="" className="img-2"/></div>
        <div className="grid-item img-6"><img src="public\galeria\FQunKDyKt_720x0__1.jpg" alt="" className="img-1"/></div>
      </div>
      </body>
    </>
  );
};

export default Galeria;
