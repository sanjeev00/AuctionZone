import React from 'react';
import UserContext from '../Context/UserContext'
import axios from 'axios'
function Sell(props) {
    return (
        <div class="row">
            <div class="col-4 ">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Get a good price for your items</h1>
                        <p class="lead">Fill the Details to sell your item</p>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <SellerForm></SellerForm>
            </div>
        </div>
    );
  }
  
class SellerForm extends React.Component
{
    static contextType = UserContext
    constructor(props)
    {
        super(props)
        this.state={
            name:"",
            cost:"",
            condition:"",
            seller:"",

        }
        this.handleItem = this.handleItem.bind(this)
        this.onNameChange  =this.onNameChange.bind(this)
        this.onCostChange = this.onCostChange.bind(this)
        this.onConditionChange = this.onConditionChange.bind(this)

    }

    onNameChange(e)
    {
        this.setState({name:e.target.value,seller:this.context.userData.user.username})
    }
    onCostChange(e)
    {
        this.setState({cost:e.target.value})
    }
    onConditionChange(e)
    {
        this.setState({condition:e.target.value})
    }
    handleItem(ev)
    {
        ev.preventDefault();
        const data = new FormData();
        data.append('name',this.state.name)
        data.append('condition',this.state.condition)
        data.append('cost',this.state.cost)
        data.append('seller',this.state.seller)
        data.append('file', this.uploadInput.files[0]);
        data.append('filename',"prodimage1");
    
        /*fetch('http://localhost:8000/item/new', {
         method: 'POST',
         body: data,
        }).then(console.log("uccess"))*/
        axios.post("http://localhost:5000/item/new",data,{headers:{'x-auth-token':this.context.userData.token}})
        .then(
        (res)=>{
            console.log("success")
        }   
        )
    }
    render()
    {
        return(

            <div>
                <form onSubmit={this.handleItem}>
                    <div className="input-group mt-4">
                        <input name='name' placeholder="Name" value={this.state.name} onChange={this.onNameChange} /> 
                    </div>
                    <div className="input-group mt-4">
                    <input name='cost' placeholder="Cost" value={this.state.cost} onChange={this.onCostChange}/> 
                    </div>
                    <div className="input-group mt-4">
                    <input name='condition' placeholder="condition" value={this.state.condition} onChange={this.onConditionChange}/> 
                    </div>
                    <div className="input-group mt-4">
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                
                    </div>
                    <button className="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
        );
    }
} 
  export default Sell;