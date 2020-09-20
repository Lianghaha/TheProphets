import React, {useEffect, useState} from "react"
import "./TopPredictions.css"
import PredictionCard from "../../../lib/components/PredictionCard/PredictionCard"
//Button
import Button from "@material-ui/core/Button"
import { mockPredictionsData } from "../../../lib/mockData"
import { Link } from "react-router-dom"


function TopPredictions(props) {

   
   const [mockPredictionList, setMockPredictionList] = useState([])

   useEffect(() => {
      createData()
   }, [])

   const createData = () => {
      let predictionData = []
      for (let i = 0; i < 1; i++) {
         predictionData = predictionData.concat(mockPredictionsData)
      }
      setMockPredictionList(predictionData)
   }
   
   const showMore = () => {
      let temp = mockPredictionList.concat(mockPredictionsData)
      setMockPredictionList(temp)
   }


   return (
      <div className="TopPredictions">
         <div className="TitleAndButtons">
            <h2>Top Predictions</h2>
            <div className="TitleButtons">
               <Link to="/Predictions">
                  <Button variant="outlined">SHOW ALL</Button>
               </Link>
            </div>
         </div>
         <div className="PredictionsList">
            {mockPredictionList.map((data, index) => {
               return <PredictionCard key={index} data={data} />
            })}
         </div>
         <div className="TitleButtons">
            <Button onClick={showMore} variant="outlined">
               SHOW MORE
            </Button>
         </div>
      </div>
   )
}

export default TopPredictions
