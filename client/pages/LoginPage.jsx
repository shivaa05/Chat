import React, { useContext, useRef } from "react";
import assets from "../src/assets/assets";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
const LoginPage = () => {
  const {login} = useContext(AuthContext)
  const [loginSignUp, setLoginSignUp] = useState("Login");
  const [fullname,setFullname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const submitHandler = (e) => {
    e.preventDefault()
    const payload = {fullname,email,password}
    
    login(loginSignUp === "Sign up" ? "signUp" : "login", payload)
    
  }
  return (
    <div className="login-page">
      <div className="left">
        <img src={assets.logo_big} alt="logo" className="logo-icon" />
      </div>
      <div className="right">
        <form className="right-form" onSubmit={submitHandler}>
          <h2>{loginSignUp}</h2>
          {loginSignUp === "Sign up" && (
            <input
              type="text"
              className="input-box"
              required
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              />
            )}
          <input
            type="email"
            className="input-box"
            required
            placeholder="Email Address"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            className="input-box"
            required
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-button">{loginSignUp}</button>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <input type="checkbox" id="terms-condition" />
            <label htmlFor="terms-condition" className="bottom">
              Agree to the terms of use & privacy policy.
            </label>
          </div>
          {loginSignUp === "Sign up" && (
            <p className="bottom">
              Already have an account?{" "}
              <span className="login" onClick={() => setLoginSignUp("Login")}>
                Login here
              </span>
            </p>
          )}
          {loginSignUp === "Login" && (
            <p className="bottom">
              Don't have an account?{" "}
              <span className="login" onClick={() => setLoginSignUp("Sign up")}>
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
