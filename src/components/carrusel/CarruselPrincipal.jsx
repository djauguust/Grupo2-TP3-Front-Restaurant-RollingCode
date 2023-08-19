import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import "./CarruselPrincipal.css";

const CarruselPrincipal = () => {
  return (
    <>
 <Carousel fade className='carrusel-custom'>
      <Carousel.Item>
        <img
          src="https://live.staticflickr.com/65535/53071095588_b67e43d795_k.jpg"
          alt=""
          height="500px"
          width="100%"
          className="object-fit-cover"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          src="https://live.staticflickr.com/65535/53070775234_99fbd16fd2_k.jpg"
          alt=""
          height="500px"
          width="100%"
          className="object-fit-cover"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          src="https://live.staticflickr.com/65535/53070826561_c8f03d0a77_c.jpg"
          alt=""
          height="500px"
          width="100%"
          className="object-fit-cover"
        />
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default CarruselPrincipal