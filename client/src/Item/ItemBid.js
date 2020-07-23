import React, { Component } from 'react';
import axios from 'axios';

class  ItemBid extends Component{

    constructor(props)
    {
        super(props);
        this.state= {
            data: {}
        }
        
        axios.get('/api/item/'+this.props.uid).then(res=>{
        
    })
    }




    render()
    {
        return(
            <div className="col-10">
        <div className="card mt-5" style={{backgroundColor:'#d1ecf1'}}>
            <div className="card-body px-2 py-3">
    
        <h5 className="card-text">{this.props.user} has placed Bid at ${this.props.cost}</h5>
        </div>
        
        </div>
        </div>
    );
    }
}




export default ItemBid;
