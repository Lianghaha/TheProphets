import React from "react"
import "./SignUp.css"
import GoogleLogin from "react-google-login"

export const SignUp = () => {

    const responseGoogle = (response) => {
        console.log(response)
    }

   return (
      <div className="SignUp">
         <form autoComplete="off">
            <div className="FormGroup">
               <input
                  type="text"
                  name="firstname"
                  className="line-animation"
                  placeholder="firstname"
               />
               <div className="line"></div>
            </div>
            <div className="FormGroup">
               <input
                  type="text"
                  name="lastname"
                  className="line-animation"
                  placeholder="lastname"
               />
               <div className="line"></div>
            </div>
         </form>
         <div>
            <GoogleLogin
               clientId="120159497383-33l93k1jfajaoa1t1sm39qtnhmeoq9u5.apps.googleusercontent.com"
               buttonText="Login"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={"single_host_origin"}
            />
         </div>
      </div>
   )
}
