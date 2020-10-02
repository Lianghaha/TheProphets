import React, { useEffect, useState } from "react"
import "./TopPrediction.css"
import PredictionCard from "../../../lib/components/PredictionCard/PredictionCard"
//Button
import Button from "@material-ui/core/Button"
import { Spin } from "antd"
import { Link } from "react-router-dom"
import axios from "axios"

export const TopPredictions = (props) => {
   const [predictionList, setPredictionList] = useState([])

   const [showLoading, setShowLoading] = useState(false)

   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      let predictionData = []
      await axios
         .get("api/search/predictions")
         .then((response) => {
            // console.log("Predictions: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               predictionData = response.data.result
               for (let i = 0; i < 0; i++) {
                  predictionData = predictionData.concat(predictionData)
               }
               // console.log(predictionData)
               setPredictionList(predictionData)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   const showMore = () => {
      setShowLoading(true)
      let temp = predictionList.concat(predictionList)
      setTimeout(() => {
         setPredictionList(temp)
         setShowLoading(false)
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
            {predictionList.map((data, index) => {
               return <PredictionCard key={index} data={data} />
            })}
         </div>
         <div className="TitleButtons">{showLoadingOrButton()}</div>
      </div>
   )
}
