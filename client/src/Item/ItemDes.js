import React, { Component } from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext'
import { Modal,Button } from 'react-bootstrap';
import {Redirect } from 'react-router-dom';
class  ItemDes extends Component{
    static contextType = UserContext
    constructor(props)
    {
        super(props);
        this.state= {
            data: {},
            bidmodal:false,
            logged:true,
        }
        
        axios.get('/api/item/'+this.props.uid).then(res=>{
        this.setState({data:res.data})

    })
        this.closeModal = this.closeModal.bind(this)
        this.placeBid = this.placeBid.bind(this)
    }
    closeModal()
    {
        this.setState({bidmodal:false})
    }
    placeBid()
    {
        if(this.context.userData.user===undefined)
        {
            this.setState({logged:false})
        }
        this.setState({bidmodal:true})
        
    }


    render()
    {
        return(
        <div className="card mt-5">
            <div className='card-body'>
        
        <p className='card-title display-4'>{this.state.data.name}</p>
                <hr className='my-4'></hr>
        <div className="ml-3">
        <h2 className="card-text"> Sold by {this.state.data.seller}</h2>
        <h3 className="card-text ">{this.state.data.condition}</h3>
        <div className="py-3">
        <h4 className="card-text"> Starting Price <span style={{color:'darkblue'}}>${this.state.data.cost}</span> </h4>
        </div>
                <button className='btn  btn-primary' onClick={this.placeBid}>Place Bid</button>
                { this.state.bidmodal? <BidModal closeModal={this.closeModal} />:null}
                {!this.state.logged ?<Redirect to='/signin'></Redirect>:null}
                </div>
            </div>
        </div>
    );
    }
}


class BidModal extends Component{
    constructor(props)
    {
        super(props)
        this.state={show:true,
                    amount:500            
            }
        this.handleClose = this.handleClose.bind(this)
        this.changeAmount =this.changeAmount.bind(this)
    }

    handleClose()
    {
        this.setState({show:false})
    }
    changeAmount(e)
    {
        this.setState({amount:e.target.value})
    }
    render()
    {
        return(
            <Modal show={this.state.show} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Placing Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>Place bid for 
                <input type='number' value={this.state.amount} className="form-control" onChange={this.changeAmount} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Place Bid
              </Button>
            </Modal.Footer>
          </Modal>
      )
    }



}


export default ItemDes;

