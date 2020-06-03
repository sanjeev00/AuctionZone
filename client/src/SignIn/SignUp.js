import React,{Component} from 'react';
import axios from 'axios';


export default class SignUp extends Component {
  constructor(props)
  {
    super(props);
    this.matching = this.matching.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.cpasswordChange = this.cpasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.mobileChange = this.mobileChange.bind(this);
    this.mailChange = this.mailChange.bind(this);    
    this.state = {
      username:"",
      password:"",
      cpassword:"",
      match:true,
      mobile:"",
      mail:"",
      valid:""
    }


  }
  mailChange(e)
  {
     this.setState({mail:e.target.value},()=>{
     },()=>{
      
     }) 
     
  }
  
  mobileChange(e)
  {
     this.setState({mobile:e.target.value}) 
  }
   matching(){
    if(this.state.password!=this.state.cpassword)
    {
      this.setState({match:false})
    }
    else
    {
        this.setState({match:true})
    }
  }

  passwordChange(e)
  {
      this.setState({
        password:e.target.value
      },this.matching)
    
  }
  cpasswordChange(e)
  {
      this.setState({
        cpassword:e.target.value
      },this.matching)
      
    
  }
  onUsernameChange(e)
  {
    this.setState({
      username:e.target.value
    })
  }
  onSubmit(e)
  {
    var valid =true;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.state.mail).toLowerCase()))
    {console.log("f");valid = false;}
    if(this.state.username.length==0)
    {console.log("a");valid = false;}
    if( !this.state.match || this.state.password.length==0)
    {console.log("g");valid = false;}
    if(this.state.mobile.length!=10)
    {console.log("n");valid = false;}

    if(valid)
    {
    console.log(this.state.username + this.state.password)
    
    axios.post('/user/register',{'username':this.state.username,
    'password':this.state.password,'mobile':this.state.mobile,'mail':this.state.mail}).then(res=>{
        if(res.status == 200)
        console.log('registration success');
        this.setState({
          username:"",
          password:"",
          cpassword:"",
          mobile:"",
          mail:"",
          valid:""
          
        })
    }).catch((err)=>{
      this.setState({valid:err.response.data.error})
    })
 
    }
    else
    {
        alert("fill out the fields")
    }   
  }

  render(){
    return (
      <div className="row  d-flex justify-content-center">
          <div className="col col-4  mt-5">
                <h1 className="display-4">Sell your stuff</h1>
                <h2>Register Here</h2>
                <div className="input-group">
                   
                <input name="uname" id="uname" onChange={this.onUsernameChange} value={this.state.username} placeholder="Username"/><p>{this.state.valid}</p>
                </div>
                <div className='input-group mt-2'>

                <input name="Mobile" value={this.state.mobile} type="text" placeholder="Mobile" onChange={this.mobileChange} />
                </div>
                <div className='input-group mt-2'>
                <input name="Email" value={this.state.mail} type="email" placeholder="Email" onChange={this.mailChange} />
                </div><div className='input-group mt-2'>
                <input name="pass" value={this.state.password} type="password" placeholder="password" onChange={this.passwordChange}/></div>
                <div className='input-group mt-2'>
                <input name="cpass" value={this.state.cpassword} type="password" placeholder="Confirm password" onChange={this.cpasswordChange}/></div>
                
                <button className="btn btn-md btn-danger mt-4" onClick={this.onSubmit}>Sign Up</button>
                
                
          </div>
      </div>
    );
    }
  }
  
  