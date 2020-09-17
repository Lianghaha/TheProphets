import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
   const [scroll, setScroll] = useState(false)

   const changeBackground = () => {
      if (window.scrollY >= 100) {
         setScroll(true)
      }
      else {
         setScroll(false)
      }
   }

   window.addEventListener("scroll", changeBackground)

   return (
      <div className={scroll ? "Navbar active" : "Navbar"}>
         <ul className="NavLeft">
            <Link to="/">
               <li>The Prohets</li>
            </Link>
            <Link to="/Prophets">
               <li>Prohets</li>
            </Link>
            <Link to="">
            <li>Predictions</li>
            </Link>
         </ul>
         <ul className="NavRight">
            <Link to="">
            <li>Sign In</li>
            </Link>
            <Link to="">
            <li>Login</li>
            </Link>
         </ul>
      </div>
   )
}

export default Navbar
