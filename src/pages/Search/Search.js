import React from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"


export const Search = (props) => {
   return (
      <div className="Search">
         <div className="ResultsAndTools">
            <div className="Results">
               <div className="SearchText">
                  <div className="Icon">
                     <IoMdArrowRoundBack size="3em" />
                  </div>
                  <p>Search: 123</p>
               </div>
            </div>
            <div className="Tools">Tools</div>
         </div>
      </div>
   )
}

{
   /* <div>{console.log(props.showProphets)}</div>
         <div>{console.log(props.showPredictions)}</div> */
}
