import React from 'react';
import axios from 'axios';
class  Carousel extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
      img:"",
    }

    axios.get('/api/item/'+this.props.uid).then(res=>{
     
         this.setState({img:res.data.image})
   
    })
    
  }
  
  
  render()
  {
    return (

        <div  className="carousel slide" data-ride="carousel">
        <div className="carousel-inner img-thumbnail">
          <div className="carousel-item active ">
              <img src={this.state.img} className="d-block w-100" alt="..." />
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
}

  export default Carousel;
  