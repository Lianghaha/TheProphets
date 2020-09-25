import React, { useEffect, useState } from "react"
import "./TopPrediction.css"
import PredictionCard from "../../../lib/components/PredictionCard/PredictionCard"
//Button
import Button from "@material-ui/core/Button"
import { Spin } from "antd"
import { mockPredictionsData } from "../../../lib/mockData"
import { Link } from "react-router-dom"

function TopPredictions(props) {
   const [mockPredictionList, setMockPredictionList] = useState([])

   const [showLoading, setshowLoading] = useState(false)

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
      setshowLoading(true)
      let temp = mockPredictionList.concat(mockPredictionsData)
      setTimeout(() => {
         setMockPredictionList(temp)
         setshowLoading(false)
      }, 1000)
   }

   const showLoadingOrButton = () => {
      if (showLoading) {
         return <Spin size="large" />
      } else {
         return (
            <Button onClick={showMore} variant="outlined">
               SHOW MORE
            </Button>
         )
      }
   }

   return (
      <div className="TopPredictions">
         <div className="TitleAndButtons">
            <h2>Top Predictions</h2>
            <div className="TitleButtons">
               <Link to="/predictions">
                  <Button variant="outlined">SHOW ALL</Button>
               </Link>
            </div>
         </div>
         <div className="PredictionsList">
            {mockPredictionList.map((data, index) => {
               return <PredictionCard key={index} data={data} />
            })}
         </div>
         <div className="TitleButtons">{showLoadingOrButton()}</div>
      </div>
   )
}

export default TopPredictions
