import React from "react"
import { Link } from "react-router-dom"
import "./Burger.css"
import { slide as Menu } from "react-burger-menu"
import defaultImg from "../../../../media/image/default-profile.png"

export const Burger = ({ loggedIn, handleLogout }) => {
   const { username, profile_img } = localStorage
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
                  <img
                     src={
                        profile_img === "undefined" ? defaultImg : profile_img
                     }
                     alt="Default"
                  />
               </div>
               <p className="Username">{username}</p>
            </div>
         )
      }
   }

   const handleBurgerLogout = () => {
      handleBurgerClick()
      handleLogout()
   }

   const loginOrOut = () => {
      if (loggedIn) {
         return <li onClick={handleBurgerLogout}>Logout</li>
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
               <Link to="/about" onClick={handleBurgerClick}>
                  <li>About</li>
               </Link>
               {loginOrOut()}
            </ul>
         </Menu>
      </div>
   )
}
