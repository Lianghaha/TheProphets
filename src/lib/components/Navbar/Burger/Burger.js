import React from "react"
import { Link } from "react-router-dom"
import "./Burger.css"
import { slide as Menu } from "react-burger-menu"
import defaultImg from "../../../../media/image/default-profile.png"


export const Burger = ({ loggedIn, handleLogout }) => {

   //Close Nav Burger
   const handleBurgerClick = () => {
      let crossButton = document.getElementsByClassName("bm-cross-button")[0]
      if (crossButton) crossButton.lastChild.click()
      else console.log("Cannot find CrossButton")
   }

   const userInfo = () => {
      if (loggedIn) {
         return (
            <div className="UserInfo">
               <div className="ProfileImgContainer">
                  <img src={defaultImg} alt="Default" />
               </div>
               <p id="userGreeting">{localStorage.getItem("username")}</p>
            </div>
         )
      }
   }

   const loginOrOut = () => {
      if (loggedIn) {
         return <li onClick={handleLogout}>Logout</li>
      }
      return (
         <div>
            <Link to="/signup" onClick={handleBurgerClick}>
               <li>Sign In</li>
            </Link>
            <Link to="/login" onClick={handleBurgerClick}>
               <li>Login</li>
            </Link>
         </div>
      )
   }
   return (
      <div className="Burger">
         <Menu>
            {userInfo()}
            <ul>
               <Link to="/" onClick={handleBurgerClick}>
                  <li>Home</li>
               </Link>
               <Link to="/prophets" onClick={handleBurgerClick}>
                  <li>Prophets</li>
               </Link>
               <Link to="/predictions" onClick={handleBurgerClick}>
                  <li>Predictions</li>
               </Link>
               {loginOrOut()}
            </ul>
         </Menu>
      </div>
   )
}
