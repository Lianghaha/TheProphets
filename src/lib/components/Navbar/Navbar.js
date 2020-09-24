import React, { useState, useLayoutEffect } from "react"
import "./Navbar.css"
import { Link, useHistory } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { Input } from "antd"
import { slide as Menu } from "react-burger-menu"

function Navbar() {
   const history = useHistory()

   //Chaneg NavBar Background
   const [scroll, setScroll] = useState(false)
   const changeBackground = () => {
      if (window.scrollY >= 100) {
         setScroll(true)
      } else {
         setScroll(false)
      }
   }
   window.addEventListener("scroll", changeBackground)

   //Hamburger Responsive
   const [showBurger, setShowBurger] = useState(false)

   useLayoutEffect(() => {
      const updateSize = () => {
         // console.log([window.innerWidth, window.innerHeight])
         if (window.innerWidth <= 768) setShowBurger(true)
         else setShowBurger(false)
      }
      window.addEventListener("resize", updateSize)
      updateSize()
      return () => window.removeEventListener("resize", updateSize)
   }, [])

   //Search Input
   const [inputText, setInputText] = useState("")

   const handleKeydown = (e) => {
      if (e.key === "Enter") {
         console.log("enter press here! ")
         history.push(`/search/${inputText}`)
      }
   }

   if (showBurger) {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            <div className="Burger">
               <Menu>
                  <ul>
                     <Link to="/">
                        <li>The Prohets</li>
                     </Link>
                     <Link to="/Prophets">
                        <li>Prohets</li>
                     </Link>
                     <Link to="/Predictions">
                        <li>Predictions</li>
                     </Link>
                     <Link to="">
                        <li>Sign In</li>
                     </Link>
                     <Link to="">
                        <li>Login</li>
                     </Link>
                  </ul>
               </Menu>
            </div>
            <div className={scroll ? "SearchBar SearchBarActive" : "SearchBar"}>
               <Input
                  id="SearchInput"
                  placeholder="Search..."
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => handleKeydown(e)}
               />
               <Link className="Icon" to={`/search/${inputText}`}>
                  <GoSearch size="1.2rem" />
               </Link>
            </div>
         </div>
      )
   } else {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            <ul className="NavLeft">
               <Link to="/">
                  <li>The Prohets</li>
               </Link>
               <Link to="/Prophets">
                  <li>Prohets</li>
               </Link>
               <Link to="/Predictions">
                  <li>Predictions</li>
               </Link>
            </ul>
            <div className={scroll ? "SearchBar SearchBarActive" : "SearchBar"}>
               <Input
                  id="SearchInput"
                  placeholder="Search..."
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => handleKeydown(e)}
               />
               <Link className="Icon" to={`/search/${inputText}`}>
                  <GoSearch size="1.2rem" />
               </Link>
            </div>
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
}

export default Navbar
