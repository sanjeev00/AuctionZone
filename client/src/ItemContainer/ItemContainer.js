import React, { Component } from 'react';
import Item from '../Item/Item'
import axios from 'axios'
import { render } from '@testing-library/react';
import ItemView from './ItemView';

class ItemContainer extends Component {
    constructor(props)
    {
        super(props);
    this.state ={
        items:[]
    }
    axios.get('/api/item/').then(res=>{
        this.setState({items:res.data})
    })
}
    render() 
    {   
    return (

        <div className="row">
            <div className="col col-8 basecard">
             {this.state.items.map((item,i) => <Item key={i} uid={item._id}
             name={item.name} cond={item.condition}  cost={item.cost} img={item.image}  />)}
            </div>
        </div>
    );
  }
}
  
  export default ItemContainer;
  