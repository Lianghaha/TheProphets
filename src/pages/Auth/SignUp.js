import React, { useState } from "react"
import "./Auth.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { BsEyeFill } from "react-icons/bs"
import { BsEyeSlashFill } from "react-icons/bs"
// import GoogleLogin from "react-google-login"

export const SignUp = () => {
   //Display Password
   const [showPassword, setShowPassword] = useState(false)
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

   //Store Input and Check
   const [email, setEmail] = useState("")
   const [emailCorrectness, setEmailCorrectness] = useState(false)
   const [username, setUsername] = useState("")
   const [usernameCorrectness, setUsernameCorrectness] = useState(false)
   const [password, setPassword] = useState("")
   const [passwordConfirmation, setPasswordConfirmation] = useState("")

   const checkEmail = (input) => {
      console.log(input)
      setEmail(input)
      let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (regex.test(input)) {
         console.log("OK")
         setEmailCorrectness(true)
      } else {
         setEmailCorrectness(false)
         console.log("You have entered an invalid email address!")
      }
   }

   const checkUsername = (input) => {
      console.log(input)
      setUsername(input)
      let regex = /^[a-zA-Z0-9]+$/
      if (regex.test(input) && input.length >= 6) {
         console.log("OK")
         setUsernameCorrectness(true)
      } else {
         setUsernameCorrectness(false)
         console.log("At least 6 characters and only contain letters and numbers")
      }
   }

   return (
      <div className="SignUp">
         <div className="AuthForm">
            <form autoComplete="off">
               <h1>Sign Up</h1>
               <div className="TextFieldContainer">
                  <TextField
                     id="signUpEmail"
                     label="Email"
                     onChange={(e) => checkEmail(e.target.value)}
                     helperText={
                        email !== "" && !emailCorrectness
                           ? "Invalid Email"
                           : false
                     }
                  />
               </div>
               <div className="TextFieldContainer">
                  <TextField
                     id="signUpUsername"
                     label="Username"
                     onChange={(e) => checkUsername(e.target.value)}
                     helperText={
                        username !== "" && !usernameCorrectness
                           ? "At least 6 characters and only contains letters and numbers"
                           : false
                     }
                  />
               </div>
               <div className="TextFieldContainer">
                  <TextField
                     id="signUpPassword"
                     label="Password"
                     inputProps={inputProps()}
                     onChange={(e) => setPassword(e.target.value)}
                     helperText={
                        password !== "" && password.length < 6
                           ? "At least 6 characters"
                           : false
                     }
                  />
                  {showPasswordButton()}
               </div>

               <div className="TextFieldContainer">
                  <TextField
                     id="signUpPasswordConfirmation"
                     label="Password Confirmation"
                     inputProps={inputProps()}
                     onChange={(e) => setPasswordConfirmation(e.target.value)}
                     helperText={
                        passwordConfirmation !== "" &&
                        password !== passwordConfirmation
                           ? "Password confirmation doesn't match password"
                           : false
                     }
                  />
                  {showPasswordButton()}
               </div>
               <div className="ButtonContainer">
                  <Button
                     variant="outlined"
                     disabled={
                        emailCorrectness &&
                        usernameCorrectness &&
                        password.length >= 6 &&
                        password === passwordConfirmation ? false : true
                     }
                  >
                     CREAT ACCOUNT
                  </Button>
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
