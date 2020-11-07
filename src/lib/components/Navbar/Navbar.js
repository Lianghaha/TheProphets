import React, { useState, useLayoutEffect, useEffect } from "react"
import "./Navbar.css"
import { Link, useHistory } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { Input } from "antd"
import { Burger } from "./Burger/Burger"
import defaultImg from "../../../media/image/default-profile.png"
import { clearCookieLocalStorage } from "../../utils"

export const Navbar = ({ loggedIn, setLoggedIn }) => {
   const history = useHistory()
   const { username, profile_img } = localStorage

   const [navBarLoggedIn, setNavBarLoggedIn] = useState(false)
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
         if (window.innerWidth <= 1070) setShowBurger(true)
         else setShowBurger(false)
      }
      window.addEventListener("resize", updateSize)
      updateSize()
      return () => window.removeEventListener("resize", updateSize)
   }, [])

   //Search Input
   const [inputText, setInputText] = useState("")

   const handleSearch = () => {
      history.push(`/search/${inputText}`)
      setInputText("")
   }

   const handleLogout = () => {
      clearCookieLocalStorage()
      setLoggedIn(false)
      history.push("/")
   }

   // Animation
   const animationDelay = (delay) => {
      if (loggedIn) return {
         animationDelay: "0ms",
         transitionDelay: "0ms",
      }
      return {
         animationDelay: delay * 15 + "0ms",
         transitionDelay: delay * 15 + "0ms",
      }
   }

   useEffect(() => {
      setNavBarLoggedIn(loggedIn)
   }, [loggedIn])

   useEffect(() => {
      const NavItems = document.getElementsByClassName("NavItem")
      for (const NavItem of NavItems) {
         NavItem.classList.add("animation_fade_slide_down")
      }
   }, [navBarLoggedIn, showBurger])

   const SearchBar = () => {
      return (
         <div
            className={
               showBurger ? "SearchBarContainer" : "SearchBarContainer NavItem"
            }
            style={animationDelay(3)}
         >
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
            <Link to="/">
               <li className="NavItem">
                  <div className="Block">Home </div>
               </li>
            </Link>
            <Link to="/prophets">
               <li
                  className="NavItem"
                  style={animationDelay(1)}
               >
                  Prophets
               </li>
            </Link>
            <Link to="/predictions">
               <li
                  className="NavItem"
                  style={animationDelay(2)}
               >
                  Predictions
               </li>
            </Link>
         </ul>
      )
   }

   const NavRight = () => {
      return (
         <ul className="NavRight">
            <Link to="/about">
               <li
                  className="NavItem"
                  style={animationDelay(4)}
               >
                  About
               </li>
            </Link>
            <Link to="/signup">
               <li
                  className={navBarLoggedIn ? "NotDisplay" : "NavItem"}
                  style={animationDelay(5)}
               >
                  Sign Up
               </li>
            </Link>
            <Link to="/login">
               <li
                  className={navBarLoggedIn ? "NotDisplay" : "NavItem"}
                  style={animationDelay(6)}
               >
                  Login
               </li>
            </Link>
            <li
               className={
                  navBarLoggedIn ? "UserInfo HoverEffect NavItem" : "NotDisplay"
               }
            >
               <div className="ProfileImgContainer">
                  <img
                     src={
                        profile_img === "undefined" || profile_img === "null"
                           ? defaultImg
                           : profile_img
                     }
                     alt="Default"
                  />
               </div>
               <div className="Username">{username}</div>
            </li>
            <li
               className={navBarLoggedIn ? "HoverEffect NavItem" : "NotDisplay"}
               onClick={handleLogout}
            >
               Logout
            </li>
         </ul>
      )
   }

   if (showBurger) {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            <Burger loggedIn={loggedIn} handleLogout={handleLogout} />
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
