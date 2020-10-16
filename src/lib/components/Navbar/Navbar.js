import React, { useState, useLayoutEffect, useEffect } from "react"
import "./Navbar.css"
import { Link, useHistory } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { Input } from "antd"
import { Burger } from "./Burger/Burger"
import defaultImg from "../../../media/image/default-profile.png"
import {utils} from "../../utils"


export const Navbar = ({ setShowLoading }) => {
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
   const [loggedIn, setLoggedIn] = useState(false)

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

   useEffect(() => {
      if (localStorage.getItem("username")) {
         setLoggedIn(true)
      }
   }, [])



   //Search Input
   const [inputText, setInputText] = useState("")

   const handleSearch = () => {
      history.push(`/search/${inputText}`)
      setInputText("")
   }

   const mockLoading = () => {
      setShowLoading(true)
      setTimeout(() => {
         setShowLoading(false)
      }, 1000)
   }

   const SearchBar = () => {
      return (
         <div className="SearchBarContainer">
            <div className="SearchBar">
               <Input
                  id="SearchInput"
                  placeholder={"Search..."}
                  onChange={(e) => setInputText(e.target.value)}
                  onPressEnter={() => handleSearch()}
                  value={inputText}
                  autoComplete="off"
               />
               <div className="Icon" onClick={() => handleSearch()}>
                  <GoSearch size="1.2rem" />
               </div>
            </div>
         </div>
      )
   }

   

   const NavLeft = () => {
      return (
         <ul className="NavLeft">
            <Link to="/" onClick={mockLoading}>
               <li>Home</li>
            </Link>
            <Link to="/prophets" onClick={mockLoading}>
               <li>Prohets</li>
            </Link>
            <Link to="/predictions">
               <li>Predictions</li>
            </Link>
         </ul>
      )
   }

   const NavRight = () => {
      if (loggedIn) {
         return (
            <ul className="NavRight">
               <li className="UserInfo">
                  <div className="ProfileImgContainer">
                     <img src={defaultImg} alt="Default" />
                  </div>
                  <div className="Username">
                     {localStorage.getItem("username")}
                  </div>
               </li>
               <li onClick={utils.logout}>Logout</li>
            </ul>
         )
      }
      return (
         <ul className="NavRight">
            <Link to="/signup">
               <li>Sign Up</li>
            </Link>
            <Link to="/login">
               <li>Login</li>
            </Link>
         </ul>
      )
   }

   if (showBurger) {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            <Burger loggedIn={loggedIn}/>
            {SearchBar()}
         </div>
      )
   } else {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            {NavLeft()}
            {SearchBar()}
            {NavRight()}
         </div>
      )
   }
}
