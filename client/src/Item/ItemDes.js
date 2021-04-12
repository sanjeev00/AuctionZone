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
            spinner:true
        }
        axios.get('/api/item/'+this.props.uid).then(res=>{
        this.setState({data:res.data,spinner:false})

    })
        this.closeModal = this.closeModal.bind(this)
        this.placeBid = this.placeBid.bind(this)
        
    }
    closeModal()
    {
        this.setState({bidmodal:false})
    }

    closeItem = (e)=>
    {
        
        axios.post('/api/bid/close',{id:this.props.uid},{headers:{'x-auth-token':this.context.userData.token}})
            .then(res=>{                    
                
            }).catch(err => {
                if (err.response.status==400) {
                this.setState({msg:"Cannot close bid"})
            }})   
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
        console.log(this.context.userData,new Date().getTime())
        if(this.state.spinner)
        return(
            <div className="card mt-5">
            <div className='card-body'>
        <div className="spinner-border" role="status">
        </div>
        </div>
        </div>
      )
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
                {this.state.data.bidOpen?                
                this.context.userData.user!=null && this.context.userData.user._id
                ===this.state.data.sellerId ?
                <button className='btn btn-danger' onClick={this.closeItem} >Close Bid</button>
                :<button className='btn  btn-primary' onClick={this.placeBid}>Place Bid</button>
                :<p className="alert alert-danger">Bidding closed</p>} 

                { this.state.bidmodal? <BidModal closeModal={this.closeModal} data={this.state.data}/>:null}
                {!this.state.logged ?<Redirect to='/signin'></Redirect>:null}
                </div>
            </div>
        </div>
    );
    }
}


class BidModal extends Component{
    static contextType = UserContext
    constructor(props)
    {
        super(props)
        this.state={show:true,
                    amount: Math.max(this.props.data.latestBid,this.props.data.cost)+1,
                    latestBid:Math.max(this.props.data.latestBid,this.props.data.cost),
                    showError:false,
                    error:""
                                
            }
        this.handleClose = this.handleClose.bind(this)
        this.changeAmount =this.changeAmount.bind(this)
    }

    handleClose()
    {
        if(this.state.amount<=this.state.latestBid)
        {
            this.setState({error:"Bid must be greater than latest bid "+this.state.latestBid,showError:true})
        }
        else
        {
            const data = {productId:this.props.data._id,
                    user:this.context.userData.user.username,cost:this.state.amount}

            axios.post('/api/bid/add',data,{headers:{'x-auth-token':this.context.userData.token}})
            .then(res=>{
                this.props.closeModal();
                    
                    
                
            }).catch(err => {
                if (err.response.status==400) {
                    this.setState({latestBid:err.response.data.lastBid})
                    this.setState({error:"Bid must be greater than latest bid "+this.state.latestBid,showError:true})

        }})
        //this.setState({show:false})
    }
    }
    changeAmount(e)
    {
        this.setState({amount:e.target.value})
        this.setState({showError:false})
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
                {this.state.showError?
                <div className="alert alert-danger my-3" role="alert" >
                    {this.state.error}
                </div>:null }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.closeModal}>
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