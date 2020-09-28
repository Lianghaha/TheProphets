import React, { useState, useLayoutEffect } from "react"
import "./Navbar.css"
import { Link, useHistory } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { Input } from "antd"
import { slide as Menu } from "react-burger-menu"

export const Navbar = ({ loadingTrue, loadingFalse }) => {
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

   //Close Nav Burger
   const handleBurgerClick = () => {
      let crossButton = document.getElementsByClassName("bm-cross-button")[0]
      if (crossButton) crossButton.lastChild.click()
      else console.log("Cannot find CrossButton")
   }

   //Search Input
   const [inputText, setInputText] = useState("")

   const handleSearch = () => {
      history.push(`/search/${inputText}`)
      document.getElementById("SearchInput").value = ""
   }

   const SearchBar = () => {
      return (
         <div className="SearchBarContainer">
            <div className="SearchBar">
               <Input
                  id="SearchInput"
                  placeholder="Search..."
                  onChange={(e) => setInputText(e.target.value)}
                  onPressEnter={() => handleSearch()}
               />
               <div className="Icon" onClick={() => handleSearch()}>
                  <GoSearch size="1.2rem" />
               </div>
            </div>
         </div>
      )
   }

   const Burger = () => {
      return (
         <div className="Burger">
            <Menu>
               <ul>
                  <Link to="/" onClick={handleBurgerClick}>
                     <li>The Prohets</li>
                  </Link>
                  <Link to="/prophets" onClick={handleBurgerClick}>
                     <li>Prohets</li>
                  </Link>
                  <Link to="/predictions" onClick={handleBurgerClick}>
                     <li>Predictions</li>
                  </Link>
                  <Link to="" onClick={handleBurgerClick}>
                     <li>Sign In</li>
                  </Link>
                  <Link to="" onClick={handleBurgerClick}>
                     <li>Login</li>
                  </Link>
               </ul>
            </Menu>
         </div>
      )
   }

   const mockLoading = () => {
      loadingTrue()
      loadingFalse()
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
      return (
         <ul className="NavRight">
            <Link to="">
               <li>Sign In</li>
            </Link>
            <Link to="">
               <li>Login</li>
            </Link>
         </ul>
      )
   }

   if (showBurger) {
      return (
         <div className={scroll ? "Navbar NavbarActive" : "Navbar"}>
            {Burger()}
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
