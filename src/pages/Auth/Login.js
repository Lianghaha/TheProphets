import React, { useState, useEffect } from "react"
import "./Auth.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { BsEyeFill } from "react-icons/bs"
import { BsEyeSlashFill } from "react-icons/bs"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { clearCookieLocalStorage, encrypt, setCookieLocalStorage } from "../../lib/utils"

import GoogleLogin from "react-google-login"

export const Login = ({ setLoggedIn }) => {
   //Redirect
   const history = useHistory()

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
   const [emailValid, setEmailValid] = useState(false)
   const [password, setPassword] = useState("")

   const checkEmail = (input) => {
      setEmail(input)
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (regex.test(input)) {
         setEmailValid(true)
      } else {
         setEmailValid(false)
      }
   }

   const handleSubmit = async () => {
      const encPassword = encrypt(password)
      await axios
         .post(`/api/login`, {
            email: email,
            encPassword: encPassword,
         })
         .then((response) => {
            console.log("Login Post Response: ")
            console.log(response.data)
            const data = response.data
            if (data.status === 0) {
               setCookieLocalStorage(
                  data.userInfo.identity,
                  data.userInfo.username,
                  data.tokenRequest.token
               )
               setLoggedIn(true)
               history.push("/")
            } else {
               alert(data.message)
            }
         })
         .catch((err) => console.log(err))
   }

   const responseGoogle = (response) => {
      // console.log(response)
   }

   useEffect(() => {
      clearCookieLocalStorage()
      setLoggedIn(false)
   }, [setLoggedIn])

   return (
      <div className="Login">
         <div className="AuthForm">
            <form autoComplete="off">
               <h1>Login</h1>
               <div className="TextFieldContainer">
                  <TextField
                     id="loginEmail"
                     label="Email"
                     onChange={(e) => checkEmail(e.target.value)}
                     helperText={
                        email !== "" && !emailValid
                           ? "Invalid Email Address"
                           : false
                     }
                  />
               </div>

               <div className="TextFieldContainer">
                  <TextField
                     id="loginPassword"
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

               <div className="ButtonContainer">
                  <Button
                     variant="outlined"
                     // disabled={
                     //    emailValid &&
                     //    password.length >= 6
                     //       ? false
                     //       : true
                     // }
                     onClick={handleSubmit}
                  >
                     LOGIN
                  </Button>
                  <GoogleLogin
                     className="GoogleButton"
                     clientId="120159497383-33l93k1jfajaoa1t1sm39qtnhmeoq9u5.apps.googleusercontent.com"
                     buttonText="Login With Google"
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy={"single_host_origin"}
                  />
                  <Button variant="outlined" onClick={history.goBack}>
                     CANCEL
                  </Button>
               </div>
            </form>
            <div className="NotThisPage">
               <h3>Not yet a member?</h3>
               <div className="ButtonContainer">
                  <Button
                     variant="outlined"
                     onClick={() => {
                        history.push("/signup")
                     }}
                  >
                     SIGN UP
                  </Button>
               </div>
            </div>
         </div>
         <div></div>
      </div>
   )
}
