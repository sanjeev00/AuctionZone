import React,{Component, useState ,useEffect }  from 'react';
import Header from './Header/Header'
import axios from 'axios'
import ItemContainer from './ItemContainer/ItemContainer'
import ItemView from './ItemContainer/ItemView'
import SignUp from './SignIn/SignUp.js'
import SignIn from './SignIn/Signin.js'
import Sell from './SellItem/Sell.js'
import UserContext from  './Context/UserContext.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
function App() {
 

    const [userData ,setUserData] = useState({
      token:undefined,
      user:undefined  
    })

    useEffect(()=>{
      console.log("refreshed")
      const checkLoggedIn = async()=>{
        let token = localStorage.getItem("auth-token");
        setUserData({
          token
        })
        if(token===null){
          localStorage.setItem('auth-token',"");
          token = "";
        }
        const tokenRes =await axios.post("/api/user/isTokenValid",
        null,{headers:{'x-auth-token':token}})
        if(tokenRes.data){
          const userRes = await axios.get("/api/user/userData",{headers:{'x-auth-token':token}})
          console.log(new Date().getTime())
          setUserData({
            token,
            user: userRes.data
          })
        }
        else
        {
          setUserData({
            token:undefined,
            user:undefined,
          })
        }
      }
      checkLoggedIn()
    },[])
 


  return (
    <Router>
      <UserContext.Provider value={{userData,setUserData}}>
        <Header></Header>

        <Switch>
          <Route path="/sell"><Sell/> </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup"><SignUp/></Route>
          <Route path="/item/" component={ItemView}  >
          </Route>
          <Route path="/">
            <ItemContainer/>
          </Route>
        </Switch>
        </UserContext.Provider>
        </Router>
  );
  
}

export default App;
