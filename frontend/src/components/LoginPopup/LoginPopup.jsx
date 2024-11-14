import React, { useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from 'axios';
import { StoreContext } from "../../context/StoreContext";
import { EnvelopeSimple } from "@phosphor-icons/react";
const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken}=useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data,setData] =useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event)=>{
    const name=event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value})) // is code me previrous data mei jo name ho ga wo new name se replace hoga

  }
  const onLogin = async (event)=>{
    event.preventDefault()
    let newUrl= url // jo backend ka url hy usse ek new url mei save kr diya
    if(currState==="Login")     // ab condition check hogi age login hy tw login ki api otherwise register ki api
    {
      newUrl+="/api/user/login"
    }else{
      newUrl+= '/api/user/register'
    }
    const respone = await axios.post(newUrl,data);
    if(respone.data.success){
      setToken(respone.data.token)
      localStorage.setItem("token",respone.data.token)
      setShowLogin(false);
    }else{
      alert(respone.data.messsage);
    }
  }

  // useEffect (()=>{
  //   console.log(data);
  // },[data])
  return (
    <div className="login-popup">
      <form  onSubmit={onLogin}className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ?   <></> :   <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
          <input name="email" onChange={onChangeHandler} value={data.email}type="email" placeholder="Your Email " required />
          <input name="password" onChange={onChangeHandler} value={data.password}type="password" placeholder=" Password " required />
        </div>

        <button type="submit">{currState === "Sign-up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account ? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
        :<p>Already have an account ? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }

      </form>
    </div>
  );
};

export default LoginPopup;