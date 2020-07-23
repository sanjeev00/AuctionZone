import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel'
import ItemDes from '../Item/ItemDes'
import axios from 'axios'

import ItemBid from '../Item/ItemBid'
import { Redirect } from 'react-router-dom';
class  ItemView extends Component {
    
    constructor(props)
    {
        super(props)
        if(!this.props.location.state)
        {
            this.state={
                redirect:true,
            }
        }
        else{
        this.state = {
            uid : this.props.location.state.id,
            
        }

        axios.get('/api/bid/'+this.state.uid).then(res=>{
            this.setState({bids:res.data})
        })


        }
    }
    
  
    componentDidMount() {
        
    }
    
    render()
    {
        if(this.state.redirect)
        return(<Redirect to="/"></Redirect>)
    return (
        <div className="container-fluid">
        <div className="row item-row mx-lg-5">
            
            <div className="col col-lg-6 col-12 csl-cont">
                <Carousel uid={this.state.uid} />
           </div>
           <div className="col col-sm-12 col-lg-6">
                
                <ItemDes uid={this.state.uid}></ItemDes>
           </div>

        </div>

        <div className="row justify-content-center">
                
                {
                this.state.bids?
                
                this.state.bids.map((bid,i)=>
                 <ItemBid  cost={bid.cost} user={bid.user} key={bid._id}/>
                ):<div class="display-4 text-muted mt-4">No Bids have been placed</div>
            }                
        </div>
        </div>
        
    );
    }
  }
  
  export default ItemView;
  