import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import { mockProphetsData } from "../../lib/mockData"
import { mockPredictionsData } from "../../lib/mockData"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { useHistory } from "react-router-dom"

export const Search = (props) => {
   const [showProphets, setShowProphets] = useState(props.showProphets)

   const [showPredictions, setShowPredictions] = useState(props.showPredictions)

   const [mockProphetList, setMockProphetList] = useState([])

   const [mockPredictionList, setMockPredictionList] = useState([])

   const [inputText, setInputText] = useState(false)

   //Fetch Prophets
   const createProphetData = () => {
      let prophetData = []
      for (let i = 0; i < 1; i++) {
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

   const createSearchProphetData = (input) => {
      let prophetData = []
      mockProphetsData.forEach((data) => {
         if (data.name && data.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
            prophetData.push(data)
         }
      })
      setMockProphetList(prophetData)
   }

   const createSearchPredictionData = (input) => {
      let predictionData = []
      mockPredictionsData.forEach((data) => {
         if (data.title && data.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
            predictionData.push(data)
         }
      })
      setMockPredictionList(predictionData)
   }

   //Scroll to top when jump
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      setShowProphets(props.showProphets)
      setShowPredictions(props.showPredictions)
      if (props.match.match.params.input) {
         const input = props.match.match.params.input
         createSearchProphetData(input)
         createSearchPredictionData(input)
      } else {
         createProphetData()
         createPredictionData()
      }
      setInputText(props.match.match.params.input)
   }, [
      props.showProphets,
      props.showPredictions,
      props.match.match.params.input,
   ])

   //BackButton
   const history = useHistory()


   //Prophets or Predictions
   const whatToShow = () => {
      if (showProphets) {
         if (Object.keys(mockProphetList).length === 0) {
            return (
               <div className="Empty">No Result Found</div>
            )
         }
            return (
               <div className="SearchProphetCards">
                  {mockProphetList.map((data, index) => {
                     return <ProphetCard key={index} data={data} />
                  })}
               </div>
            )
      }
      if (showPredictions) {
         if (Object.keys(mockPredictionList).length === 0) {
            return <div className="Empty">No Result Found</div>
         }
         return (
            <div className="SearchPredictionCards">
               {mockPredictionList.map((data, index) => {
                  return <PredictionCard key={index} data={data} />
               })}
            </div>
         )
      }
   }

   const searchTextDisplay = () => {
      if (inputText) {
         return inputText
      }
      if (showProphets) {
         return "All Prophets"
      } else {
         return "All Predictions"
      }
   }

   return (
      <div className="Search">
         <div className="ResultsAndTools">
            <div className="Results">
               <div className="SearchText">
                  <div
                     className="Icon"
                     onClick={() => {
                        history.goBack()
                     }}
                  >
                     <IoMdArrowRoundBack size="3em" />
                  </div>
                  <p>Search: {searchTextDisplay()}</p>
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
               <div className="Empty"></div>
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

Search.defaultProps = {
   match: { match: { params: { input: false } } },
}
