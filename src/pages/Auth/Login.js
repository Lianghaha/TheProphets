import React, { useState } from "react"
import "./Auth.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { BsEyeFill } from "react-icons/bs"
import { BsEyeSlashFill } from "react-icons/bs"
// import GoogleLogin from "react-google-login"

export const Login = () => {
   const [showPassword, setShowPassword] = useState(false)



   // const responseGoogle = (response) => {
   //    console.log(response)
   // }

   const inputProps = () => {
      let result = {}
      if (showPassword) {
         result = { type: "text" }
      } else {
         result = { type: "password" }
      }
      return result
   }

   const showPasswordButton = () => {
      return (
         <div className="ShowPasswordButton">
            {showPassword ? (
               <BsEyeFill
                  color="white"
                  size="1.2rem"
                  onClick={() => {
                     setShowPassword(!showPassword)
                  }}
               />
            ) : (
               <BsEyeSlashFill
                  color="white"
                  size="1.2rem"
                  onClick={() => {
                     setShowPassword(!showPassword)
                  }}
               />
            )}
         </div>
      )
   }

   

   return (
      <div className="Login">
         <div className="AuthForm">
            <form autoComplete="off">
               <h1>Login</h1>
               <div className="TextFieldContainer">
                  <TextField id="loginEmail" label="Email" />
               </div>
               <div className="TextFieldContainer">
                  <TextField id="loginUsername" label="Username" />
               </div>
               <div className="TextFieldContainer">
                  <TextField
                     id="loginPassword"
                     label="Password"
                     inputProps={inputProps()}
                  />
                  {showPasswordButton()}
               </div>

               <div className="TextFieldContainer">
                  <TextField
                     id="loginPasswordConfirmation"
                     label="Password Confirmation"
                     inputProps={inputProps()}
                  />
                  {showPasswordButton()}
               </div>
               <div className="ButtonContainer">
                  <Button variant="outlined">CREAT ACCOUNT</Button>
                  <Button variant="outlined">CANCEL</Button>
               </div>
            </form>
            <div className="NotThisPage">
               <h3>Already a member?</h3>
               <div className="ButtonContainer">
                  <Button variant="outlined">LOGIN</Button>
               </div>
            </div>
         </div>
         <div>
            {/* <GoogleLogin
               clientId="120159497383-33l93k1jfajaoa1t1sm39qtnhmeoq9u5.apps.googleusercontent.com"
               buttonText="Login"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={"single_host_origin"}
            /> */}
         </div>
      </div>
   )
}
