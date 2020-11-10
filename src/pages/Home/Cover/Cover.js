import React from "react"
import "./Cover.css"
//icon
import { VscFoldDown } from "react-icons/vsc"

function Cover() {
   return (
      <div className="Cover animation_fade">
         <div className="CoverText animation_fade_slide_up">
            <h1>
               FindTheProphets.com
               <br />
               Rate and Find the most reliable prophets
            </h1>
            <p>
               {/* Finding, Rating and Sorting the most reliable prophets have never
               been easier
               <br /> */}
               This website can help you evaluate the reliability of the
               predictors by letting everyone tracks and rates predictors' past
               predictions
            </p>
         </div>
         <div className="animation_fade_slide_up">
            <div
               className="Icon animation_bounce"
               onClick={() => {
                  window.scroll({
                     top: window.innerHeight - 100,
                     left: 0,
                     behavior: "smooth",
                  })
               }}
            >
               <VscFoldDown color="white" size="2.8em" />
            </div>
         </div>
      </div>
   )
}

export default Cover
