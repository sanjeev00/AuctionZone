import React from 'react';
import UserContext from '../Context/UserContext'
import axios from 'axios'
function Sell(props) {
    return (
        <div className="container">
        <div className="row justify-content-around align-items-center">
            <div className="col-md-6 ">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Get a good price for your items</h1>
                        <p class="lead">Fill the Details to sell your item</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <SellerForm></SellerForm>
            </div>
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
            uploaded:0,


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
        axios.post("/api/item/new",data,{headers:{'x-auth-token':this.context.userData.token},
        onUploadProgress:progressEvent=>{
            this.setState({uploaded:parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total))})
            setTimeout(() => {
                this.setState({uploaded:0})
            }, 10000);
        }
    
        
    })
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
                        <input className="r-input" name='name' placeholder="Name" value={this.state.name} onChange={this.onNameChange} /> 
                    </div>
                    <div className="input-group mt-4">
                    <input className="r-input" name='cost' placeholder="Cost" value={this.state.cost} onChange={this.onCostChange}/> 
                    </div>
                    <div className="input-group mt-4">
                    <input className="r-input" name='condition' placeholder="condition" value={this.state.condition} onChange={this.onConditionChange}/> 
                    </div>
                    <div className="input-group mt-4">
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    
                    </div>
                    <Progress uploaded={this.state.uploaded} />
                    <button className="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
        );
    }
} 
  export default Sell;


  class Progress extends React.Component{

    constructor(props)
    {
        super(props)

    }
    render()
    {
        return(
            <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-valuenow={this.props.uploaded} 
            aria-valuemin="0" aria-valuemax="100" 
            style={{width: `${this.props.uploaded}%` }}></div>
            </div>
        );
    }
  }