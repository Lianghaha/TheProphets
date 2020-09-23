import React, { useState, useEffect } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { Input } from "antd"

function Navbar() {
   const [scroll, setScroll] = useState(false)
   const changeBackground = () => {
      if (window.scrollY >= 100) {
         setScroll(true)
      } else {
         setScroll(false)
      }
   }
   window.addEventListener("scroll", changeBackground)

   const [inputText, setInputText] = useState("")
   const [searchText, setSearchText] = useState("")


   // useEffect(() => {
   //    console.log(inputText);
   // }, [inputText])

   useEffect(() => {
      console.log("111111111111111111111111")
      console.log(searchText)
   }, [searchText])

   function handleSearchClick() {
      setSearchText(inputText)
   }

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
            <Input id="SearchInput" placeholder="Search..." onChange={e => setInputText(e.target.value)}/>
            <div className="Icon" onClick={handleSearchClick}>
               <GoSearch size="1.2rem" />
            </div>
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

export default Navbar
