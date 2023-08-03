import "./Galeria.css"; 

const Galeria = () => {

  return (
    <>
      <body className="body-galeria">
      <h2 className="text-center text-light">Galeria</h2>
      <div className="grid-container">
        <div className="grid-item img-1"><img src="https://live.staticflickr.com/65535/53089577110_19c7c24c81_c.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-2"><img src="https://live.staticflickr.com/65535/53089666073_aa85769e74_k.jpg" alt="" className="img-1"/></div>
        <div className="grid-item tall img-3"><img src="https://live.staticflickr.com/65535/53089359339_3d3a655272_b.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-4"><img src="https://live.staticflickr.com/65535/53088605317_65a2f14066_c.jpg" alt="" className="img-1"/></div>
        <div className="grid-item img-5 wide"><img src="https://live.staticflickr.com/65535/53089577120_d560464200_b.jpg" alt="" className="img-2"/></div>
        <div className="grid-item img-6"><img src="https://live.staticflickr.com/65535/53089359329_12510fa21f_c.jpg" alt="" className="img-1"/></div>
      </div>
      </body>
    </>
  );

};

export default Galeria;
