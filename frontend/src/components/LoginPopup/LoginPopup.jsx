import React, { useContext, useEffect, useState } from 'react';
import './Loginpopup.css';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios'

const RegisterPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const changePassword = async () => {
    const response = await axios.post(url + "/api/user/forgot-password", data);
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      console.log("SUCCESS")
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else {
      console.log(response.data)
    }
  }

  return (
    <div>
      {(
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={() => setShowLogin(false)}>
              &times;
            </button>
            <h2>
              {currState}
            </h2>
            <form onSubmit={onLogin} className="register-form">
              <div className="form-group">
                {currState === "Login" && "Reset password" ? <></> : <><label htmlFor="name">Name</label><input name="name" onChange={onChangeHandler} value={data.name} type='text' id="name" placeholder='your name' /></>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
              <label htmlFor="email">Login</label>
                {currState === "Reset password" ? <> </> : <><input name="password" onChange={onChangeHandler} value={data.password} type="password" id="password" placeholder="Enter your password" /></>}
              </div>
              <button type="submit" className="submit-button">{currState === "Sign Up" ? "Create account" : "Login"}</button>
              {currState === "Login"
                ? <><p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                  <p>Forgot your password? <span onClick={() => setCurrState("Reset password")}>Click here</span> </p></>
                : <p>Alreade have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
              }
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPopup;