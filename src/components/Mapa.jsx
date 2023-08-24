const Mapa = () => {
    const iframeStyle = {
      border: "0",
      width: "100%",
      height: "500px", 
    };
  
    return (
      <>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.408879082126!2d-65.2072018!3d-26.8367009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1690427938021!5m2!1ses!2sar"
          style={iframeStyle}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </>
    );
  };
  
  export default Mapa;
  