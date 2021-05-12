import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel'
import ItemDes from '../Item/ItemDes'
import axios from 'axios'
import { io } from "socket.io-client";

import ItemBid from '../Item/ItemBid'
import { Redirect } from 'react-router-dom';
class  ItemView extends Component {
    
    constructor(props)
    {
        super(props)
        let socket = {}
        if(!this.props.location.state)
        {
            this.state={
                redirect:true,
               
            }
        }
        else{
        this.state = {
            uid : this.props.location.state.id,
            bids:[]
        }

       

        }
    }
    
  
    componentDidMount() {
        
        axios.get('/api/bid/'+this.state.uid).then(res=>{
            this.setState({bids:res.data},bidSocket)
        })

        const bidSocket =()=>{
        this.socket = io(":4200",{query:{room:this.state.uid}});
        this.socket.on('bid',(bid)=>{
            let src = '/notify.mp3'
            let audio = new Audio(src);
            audio.play();
            let bids = this.state.bids
            console.log(bids)
            bids.push({ _id: bid.id, user: bid.user, cost: bid.cost })
            this.setState({bids})
            console.log('new bid for '+bid)
        })
        }
    }
    

    componentWillUnmount()
    {
        this.socket.close()
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
                this.state.bids.length>0?
                
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
  