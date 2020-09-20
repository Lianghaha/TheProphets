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
      for (let i = 0; i < 1; i++) {
         prophetData = prophetData.concat(mockProphetsData)
         console.log("in for loop")
         console.log(prophetData)
      }
      setMockProphetList(prophetData)
      console.log(mockProphetList)
   }

   //Fetch Predictions
   const createPredictionData = () => {
      let predictionData = []
      for (let i = 0; i < 1; i++) {
         predictionData = predictionData.concat(mockPredictionsData)
      }
      setMockPredictionList(predictionData)
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (showProphets) {
         console.log("showProphets")
         console.log(mockProphetsData)
         console.log(mockProphetList)
         createProphetData()
         console.log(mockProphetList)
      }
      if (showPredictions) {
         console.log("showPredictions")
         createPredictionData()
      }
   }, [showProphets, showPredictions])

   function whatToShow() {
      if (showProphets) {
         const data = {
            prophetId: 1,
            image:
               "https://img.ltn.com.tw/Upload/partner/page/2019/08/23/190823-4626-01-geReG.jpg",
            name: "Corgi",
            score: 9.9,
            num_predictions: 99,
            description:
               "one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one h",
         }

         const data2 = mockProphetList[0]

         console.log("in whatToShow")
         console.log(mockProphetList[0])
         console.log(data)
         console.log(data2)
         return (
            <div className="SearchProphetCards">
               <ProphetCard data={data} />
               <ProphetCard data={data} />
               <ProphetCard data={data} />
               <ProphetCard data={data} />
               <ProphetCard data={data} />
               {/* <ProphetCard data={data2} /> */}
            </div>
         )
         // mockProphetList.map((data) => {
         //    return (
         //       <div key={data.prophetId} className="ProphetCardContainer">
         //          <ProphetCard data={data} />
         //       </div>
         //    )
         // })
      }
      if (showPredictions) {
         console.log(mockPredictionList)
         // mockPredictionList.map((data, index) => {
         //    return <PredictionCard key={index} data={data} />
         // })
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
               {/* {createProphetData()} */}
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
