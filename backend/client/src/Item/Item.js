import React from 'react';
import ItemView from '../ItemContainer/ItemView'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 


function Item(props) {
    return (
      <Link to={{pathname:'item' ,state:{id:props.uid}}} >      <div className="card icard">
          <img src={"http://localhost:5000/"+props.img} className="card-img-top" alt="..."/>

            <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h5 className="card-title">Starting from ${props.cost}</h5>
            <div className="card-subtitle">{props.cond}</div>
        </div>

      </div>
      </Link>

    );
  }
  
  export default Item;
  