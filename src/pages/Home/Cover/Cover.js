import React from "react"
import "./Cover.css"
//icon
import { VscFoldDown } from "react-icons/vsc"

function Cover() {
   return (
      <div className="Cover">
         <div className="CoverText">
            <h1 className="TextHover">Find The Prohets</h1>
            <p className="TextHover">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
               ultrices finibus urna, ac tempus nunc ornare sed. Donec bibendum
               ante a sollicitudin malesuada. Suspendisse aliquet tellus nisl,
               in facilisis metus ullamcorper eget. In non est ut orci faucibus
               rutrum eu nec odio. Cras finibus eleifend.
            </p>
         </div>
         <div className="Icon">
            <VscFoldDown color="white" size="1.8em" />
         </div>
      </div>
   )
}

export default Cover
