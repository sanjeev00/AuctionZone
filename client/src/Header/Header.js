import React from 'react';
import UserContext from  '../Context/UserContext.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 




function Signedout()
{
  return(
  <div className="navbar-nav ">
  <Link to='/' style={{ textDecoration: 'none' ,color:'unset'}}><a className="nav-link nav-item" href="#" >Sell</a></Link>
  <a className="nav-link nav-item" href="signin">Sign in</a>
  <a className="nav-link nav-item" href="signup">Sign Up</a> 
  </div>
  );

}
class SignedIn extends React.Component
{
  static contextType =UserContext;
  constructor(props)
  {
    super(props);
    this.LogOut = this.LogOut.bind(this)

  }
  
  LogOut()
  {
      localStorage.removeItem('auth-token')
      this.context.setUserData({
        token:undefined,
        user:undefined
      })
      
  }

  render()
  {
  return(
  <div className="navbar-nav ">
   <a className="nav-link nav-item" href="sell"  >Sell</a>
  <a className="nav-link nav-item" href="#" onClick={this.LogOut}>logout</a>
 
  </div>
  );
  }
}

class Header extends React.Component {
  static contextType = UserContext;
  constructor(props)
  {
    super(props)
    this.setState({
      login:false
    })
    
  }
  
  
  
  render()
  {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
        <a className="navbar-brand" href="\">AuctionZone</a>
        
        
        
      
        {this.context.userData.token==undefined? <Signedout/>: <SignedIn/> }
        
    </nav>
  );
  }
}


export default Header;
