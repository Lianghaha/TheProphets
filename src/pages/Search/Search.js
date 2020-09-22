import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import { mockProphetsData } from "../../lib/mockData"
import { mockPredictionsData } from "../../lib/mockData"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"

export const Search = (props) => {
   const [showProphets, setShowProphets] = useState(props.showProphets)

   const [showPredictions, setShowPredictions] = useState(props.showPredictions)

   const [mockProphetList, setMockProphetList] = useState([])

   const [mockPredictionList, setMockPredictionList] = useState([])

   //Fetch Prophets
   const createProphetData = () => {
      let prophetData = []
      for (let i = 0; i < 2; i++) {
         prophetData = prophetData.concat(mockProphetsData)
      }
      setMockProphetList(prophetData)
   }

   //Fetch Predictions
   const createPredictionData = () => {
      let predictionData = []
      for (let i = 0; i < 1; i++) {
         predictionData = predictionData.concat(mockPredictionsData)
      }
      setMockPredictionList(predictionData)
   }

   useEffect(() => {}, [mockProphetList])

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      setShowProphets(props.showProphets)
      setShowPredictions(props.showPredictions)
      createProphetData()
      createPredictionData()
   }, [props.showProphets, props.showPredictions])

   const whatToShow = () => {
      if (showProphets) {
         return (
            <div className="SearchProphetCards">
               {mockProphetList.map((data, index) => {
                  return <ProphetCard key={index} data={data} />
               })}
            </div>
         )
      }
      if (showPredictions) {
         return (
            <div className="SearchPredictionCards">
               {mockPredictionList.map((data, index) => {
                  return <PredictionCard key={index} data={data} />
               })}
            </div>
         )
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
                  <p>Search: {showProphets ? "Prophets" : "Predictions"}</p>
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

            <div className="Tools">
               <div className="Sort BoxShadow">
                  <p className="Title">Sort</p>
               </div>
               <div className="Filter BoxShadow">
                  <p className="Title">Filter</p>
               </div>
            </div>
         </div>
      </div>
   )
}
