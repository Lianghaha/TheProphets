import React, { useEffect, useState, useCallback } from "react"
import "./Detail.css"
import Button from "@material-ui/core/Button"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import axios from "axios"

export const PredictionDetail = ({ predictionID }) => {
   const [prediction, setPrediction] = useState()

   const getPrediction = useCallback(async () => {
      await axios
         .get(`/api/search/predictions?predictionID=${predictionID}`)
         .then((response) => {
            console.log("Prediction Detail: ")
            console.log(response.data)
            if (response.data.status === "success") {
               setPrediction(response.data.result[0])
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [predictionID])

   const PredictionCardSection = () => {
      return (
         <div className="Section">
            <div className="SectionTitleAndButton">
               <h2>Prediction Information</h2>
            </div>
            <PredictionCard data={prediction} />
            <div className="Buttons">
               <a href={`/prophetDetail/${prediction.prophet_id}`}>
                  <Button variant="outlined">Show Prophet</Button>
               </a>
               <a href={prediction.article}>
                  <Button variant="outlined">View Article</Button>
               </a>
            </div>
         </div>
      )
   }

   useEffect(() => {
      window.scrollTo(0, 0)
      getPrediction()
   }, [getPrediction])
   return (
      <div className="Detail">
         <div className="Content">
            {prediction ? PredictionCardSection() : ""}
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Ratings</h2>
                  <a href={`/`}>
                     <Button variant="outlined">Rate This Prediction</Button>
                  </a>
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
         </div>
      </div>
   )
}
