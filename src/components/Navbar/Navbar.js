import React, { useState } from "react"
import "./Navbar.css"

function Navbar() {
   const [scroll, setScroll] = useState(false)

   const changeBackground = () => {
      if (window.scrollY >= 200) {
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
            <li>
               <a href="google.com">The Prohets</a>
            </li>
            <li>
               <a href="google.com">Prohets</a>
            </li>
            <li>
               <a href="google.com">Predictions</a>
            </li>
         </ul>
         <ul className="NavRight">
            <li>
               <a href="google.com">Sign In</a>
            </li>
            <li>
               <a href="google.com">Login</a>
            </li>
         </ul>
      </div>
   )
}

export default Navbar
