import React from 'react';

function Carousel(props) {
    return (

        <div  className="carousel slide" data-ride="carousel">
        <div className="carousel-inner img-thumbnail">
          <div className="carousel-item active ">
              <img src="car.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="tv.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="flat.jpg" className="d-block w-100" alt="..."/>
          </div>
        </div>
      </div>
    );
  }
  
  export default Carousel;
  