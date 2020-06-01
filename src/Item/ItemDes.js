import React, { Component } from 'react';
import axios from 'axios';

class  ItemDes extends Component{

    constructor(props)
    {
        super(props);
        this.state= {
            data: {}
        }
        
        axios.get('http://localhost:5000/item/'+this.props.uid).then(res=>{
        this.setState({data:res.data})
    })
    }




    render()
    {
        return(
        <div className="card mt-5">
            <div className='card-body'>
        <p className='card-title display-4'>{this.state.data.name}</p>
                <hr className='my-4'></hr>
        <h2 className="card-text"> Sold by {this.state.data.seller}</h2>
        <h3 className="card-text"> ${this.state.data.cost}</h3>
                <button className='btn btn-block btn-primary'>Buy Now</button>
            </div>
        </div>
    );
    }
}




export default ItemDes;
