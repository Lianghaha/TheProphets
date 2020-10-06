import React, { useState } from "react"
import "./Auth.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { BsEyeFill } from "react-icons/bs"
import { BsEyeSlashFill } from "react-icons/bs"
import axios from "axios"
import CryptoJS from "crypto-js"
import { useHistory } from "react-router-dom"

import GoogleLogin from "react-google-login"

export const SignUp = () => {
   //Cancel Button
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
   const [emailCorrectness, setEmailCorrectness] = useState(false)
   const [username, setUsername] = useState("")
   const [usernameCorrectness, setUsernameCorrectness] = useState(false)
   const [password, setPassword] = useState("")
   const [passwordConfirmation, setPasswordConfirmation] = useState("")

   const checkEmail = (input) => {
      setEmail(input)
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if (regex.test(input)) {
         setEmailCorrectness(true)
      } else {
         setEmailCorrectness(false)
      }
   }

   const checkUsername = (input) => {
      setUsername(input)
      let regex = /^[a-zA-Z0-9]+$/
      if (regex.test(input) && input.length >= 6) {
         setUsernameCorrectness(true)
      } else {
         setUsernameCorrectness(false)
      }
   }

   //Can encrypt both String and Object
   const encrypt = (data) => {
      // let JSONData = JSON.stringify(data)
      let encryptedData = CryptoJS.AES.encrypt(
         data,
         process.env.REACT_APP_SECRET
      ).toString()
      //Base64 processing is required to clear "malformed utf-8 data" error
      let Base64Data = CryptoJS.enc.Base64.stringify(
         CryptoJS.enc.Utf8.parse(encryptedData)
      )
      return Base64Data
   }

   const handleSubmit = async () => {
      const AESpassword = encrypt(password)
      await axios
         .post(
            `/api/register?email=${email}&&username=${username}&&AESpassword=${AESpassword}`
         )
         .then((response) => {
            console.log("Register Post Response: ")
            console.log(response)
            const data = response.data
            if (data.status === "success") {
            } else {
               console.log(data)
               if (data.err.code === "ER_DUP_ENTRY") {
                  if (data.err.sqlMessage.includes("email")) {
                     alert("Email already exist")
                  } else if (data.err.sqlMessage.includes("username")) {
                     alert("Username already exist")
                  }
               }
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
                        password === passwordConfirmation
                           ? false
                           : true
                     }
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
