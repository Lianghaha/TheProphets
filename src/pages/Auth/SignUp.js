import React, { useState, useEffect } from "react"
import "./Auth.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { BsEyeFill } from "react-icons/bs"
import { BsEyeSlashFill } from "react-icons/bs"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { utils } from "../../lib/utils"
import GoogleLogin from "react-google-login"

export const SignUp = () => {
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
   const [username, setUsername] = useState("")
   const [usernameCorrectness, setUsernameCorrectness] = useState(false)
   const [password, setPassword] = useState("")
   const [passwordConfirmation, setPasswordConfirmation] = useState("")

   const checkEmail = (input) => {
      setEmail(input)
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      setEmailValid(regex.test(input))
   }

   const checkUsername = (input) => {
      setUsername(input)
      let regex = /^[a-zA-Z0-9]+$/
      setUsernameCorrectness(regex.test(input) && input.length >= 6)
   }

   useEffect(() => {
   }, [])

   const parseCookie = () => {
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      // document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      // console.log(document.cookie)
      if (document.cookie) {
         const str = document.cookie.split(";")
         // console.log(str)
         var result = {}
         for (var i = 0; i < str.length; i++) {
            var cur = str[i].split("=")
            result[cur[0]] = cur[1]
         }
         return result
      }
      return false
   }

   const handleSubmit = async () => {
      const AESpassword = utils.encrypt(password)
      
      await axios
         .post("/api/signup", {
            email: email,
            username: username,
            AESpassword: AESpassword,
         })
         .then((response) => {
            console.log("Register Post Response: ")
            console.log(response.data)
            const data = response.data
            if (data.status === 0) {
               document.cookie = `email=${email}`
               document.cookie = `username=${username}` 
               document.cookie = `token=${data.tokenRequest.token}`
               localStorage.setItem("email", email)
               localStorage.setItem("username", username)
               localStorage.setItem("token", data.tokenRequest.token)
               console.log(document.cookie)
               console.log(parseCookie())
               history.push("/")
               window.location.reload()
            } else {
               alert(data.message)
            }
         })
         .catch((err) => console.log(err))
   }

   const responseGoogle = (response) => {
      console.log(response)
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
                        email !== "" && !emailValid
                           ? "Invalid Email Address"
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
                     // disabled={
                     //    emailValid &&
                     //    usernameCorrectness &&
                     //    password.length >= 6 &&
                     //    password === passwordConfirmation
                     //       ? false
                     //       : true
                     // }
                     onClick={handleSubmit}
                  >
                     CREAT ACCOUNT
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
               <h3>Already a member?</h3>
               <div className="ButtonContainer">
                  <Button
                     variant="outlined"
                     onClick={() => {
                        history.push("/login")
                     }}
                  >
                     LOGIN
                  </Button>
               </div>
            </div>
         </div>
         <div></div>
      </div>
   )
}
