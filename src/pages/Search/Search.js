import React, { useState } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import { mockProphetsData } from "../../lib/mockData"
import { mockPredictionsData } from "../../lib/mockData"


export const Search = (props) => {
   const [showProphets, setShowProphets] = useState(props.showProphets)

   const [showPredictions, setShowPredictions] = useState(props.showPredictions)

   function whatToShow() {
      if(showProphets) {
         return("showProphets")
      }
      if(showPredictions) {
         return("showPredictions")
      }
   }

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
               <div className="SearchButtonContainer">
                  <div
                     className={
                        showProphets
                           ? "SearchButton SearchButtonActive"
                           : "SearchButton"
                     }
                     onClick={() => {
                        setShowProphets(true)
                        setShowPredictions(false)
                     }}
                  >
                     <Button>Prophets</Button>
                  </div>
                  <div
                     className={
                        showPredictions
                           ? "SearchButton SearchButtonActive"
                           : "SearchButton"
                     }
                     onClick={() => {
                        setShowProphets(false)
                        setShowPredictions(true)
                     }}
                  >
                     <Button>Predictions</Button>
                  </div>
               </div>
               {whatToShow()}
            </div>

            <div className="Tools">Tools</div>
         </div>
      </div>
   )
}
