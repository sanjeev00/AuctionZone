import React,{Component} from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext'

export default class SignIn extends Component {
  static contextType = UserContext;
  constructor(props)
  {
    super(props);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username:"",
      password:""
    }


  }

  onUsernameChange(e)
  {
    this.setState({
      username:e.target.value
    })
  }
  onPassChange(e)
  {
    this.setState({
      password:e.target.value
    })
  }
  onSubmit(e)
  {
    axios.post("http://localhost:5000/user/login",{username:this.state.username,password:this.state.password})
    .then(res=>{
      if(res.status==200)
      {
        console.log(res.data)
        localStorage.setItem('auth-token',res.data.token)
        this.context.setUserData({
          token:res.data.token
        })
        this.props.history.push("/")        
        
      }
    })
    console.log(this.state.username)
    this.setState({
      username:"",
      password:""
    })
  }

  render(){
    return (
      <div className="row  d-flex justify-content-center">
          <div className="col col-4  mt-5">
                <h1 className="display-4">Sell your stuff</h1>
                <h2>Sign In</h2>
                <div className="input-group">
                   
                <input name="uname" id="uname" onChange={this.onUsernameChange} value={this.state.username} placeholder="Username"/>
                </div>
                <div className='input-group mt-2'>
                <input name="pass" type="password" placeholder="password" onChange={this.onPassChange}/></div>
                <button className="btn btn-md btn-danger mt-4" onClick={this.onSubmit}>Sign in</button>
          </div>
      </div>
    );
    }
  }
  
  