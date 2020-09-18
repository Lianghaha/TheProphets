import React, {useEffect, useState} from "react"
import "./TopPredictions.css"
import PredictionCard from "./PredictionCard/PredictionCard"
//Button
import Button from "@material-ui/core/Button"
import { mockPredictionsData } from "../../../lib/mockData"

function TopPredictions(props) {

   
   const [mockPredictionList, setMockPredictionList] = useState([])

   useEffect(() => {
      createData()
   }, [])

   const createData = () => {
      let predictionData = []
      for (let i = 0; i < 1; i++) {
         predictionData.push(mockPredictionsData[0])
         predictionData.push(mockPredictionsData[1])
         console.log("In for loop")
      }
      console.log("predictionData")
      console.log(predictionData)
      setMockPredictionList(predictionData)
   }
   
   const showMore = () => {
      let temp = mockPredictionList.concat([
         mockPredictionsData[0],
         mockPredictionsData[1],
      ])
      setMockPredictionList(temp)
   }


   return (
      <div className="TopPredictions">
         <div className="TitleAndButtons">
            <h2>Top Predictions</h2>
            <div className="TitleButtons">
               <Button variant="outlined">SHOW ALL</Button>
            </div>
         </div>
         <div className="PredictionCards">
            {mockPredictionList.map((data) => {
               return <PredictionCard key={data.predictionId} data={data} />
            })}
         </div>
         <div className="TitleButtons">
            <Button onClick={showMore} variant="outlined">SHOW MORE</Button>
         </div>
      </div>
   )
}

export default TopPredictions
