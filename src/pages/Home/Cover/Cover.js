import React from "react"
import "./Cover.css"
//icon
import { VscFoldDown } from "react-icons/vsc"

function Cover() {
   return (
      <div className="Cover">
         <div className="CoverText">
            <h1 className="TextHover">Find The Prophets</h1>
            <p className="TextHover">
               Finding, Rating and Sorting the most reliable prophets have never been easier.
            </p>
         </div>
         <div className="Icon">
            <VscFoldDown
               color="white"
               size="1.8em"
               onClick={() => {window.scroll({
                  top: window.innerHeight - 50,
                  left: 0,
                  behavior: "smooth",
               })}}
            />
         </div>
      </div>
   )
}

export default Cover
