import React from "react"
import "./Cover.css"
//icon
import { VscFoldDown } from "react-icons/vsc"

function Cover() {
   return (
      <div className="Cover animation_fade">
         <div className="CoverText animation_fade_slide_top">
            <h1 className="TextHover">Find The Prophets</h1>
            <p className="TextHover">
               Finding, Rating and Sorting the most reliable prophets have never
               been easier.
            </p>
         </div>
         <div className="animation_fade_slide_top">
            <div className="Icon animation_bounce">
               <VscFoldDown
                  color="white"
                  size="2.2em"
                  onClick={() => {
                     window.scroll({
                        top: window.innerHeight - 50,
                        left: 0,
                        behavior: "smooth",
                     })
                  }}
               />
            </div>
         </div>
      </div>
   )
}

export default Cover
