import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel'
import ItemDes from '../Item/ItemDes'
import { Redirect } from 'react-router-dom';
class  ItemView extends Component {
    
    constructor(props)
    {
        super(props)
        if(!this.props.location.state)
        {
            this.state={
                redirect:true
            }
        }
        else{
        this.state = {
            uid : this.props.location.state.id
        }
    }
    }
    
  
    componentDidMount() {
        
    }
    
    render()
    {
        if(this.state.redirect)
        return(<Redirect to="/"></Redirect>)
    return (
        <div className="row item-row">
            
            <div className="col col-md-6 col-sm-12 csl-cont">
                <Carousel></Carousel>
           </div>
           <div className="col">
                
                <ItemDes uid={this.state.uid}></ItemDes>
           </div>
        </div>
    );
    }
  }
  
  export default ItemView;
  