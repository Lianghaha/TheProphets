import React, { useEffect, useState, useCallback } from "react"
import "./ProphetDetail.css"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import Button from "@material-ui/core/Button"
import { PredictionStrip } from "./PredictionStrip/PredictionStrip"
import axios from "axios"

export const ProphetDetail = ({ prophetID }) => {
   const [prophet, setProphet] = useState()
   const [predictions, setPredictions] = useState([])

   const getProphet = useCallback(async () => {
      await axios
         .get(`/api/search/prophets?prophetID=${prophetID}`)
         .then((response) => {
            // console.log("Prophet Detail: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               setProphet(response.data.result[0])
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [prophetID])

   const getPredictions = useCallback(async () => {
      await axios
         .get(`/api/search/predictions111?prophetID=${prophetID}`)
         .then((response) => {
            console.log("Prophet Detail Predictions: ")
            console.log(response.data)
            if (response.data.status === "success") {
               setPredictions(response.data.result)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [prophetID])

   useEffect(() => {
      window.scrollTo(0, 0)
      getProphet()
      getPredictions()
   }, [getProphet,
      getPredictions])

   

   return (
      <div className="Detail">
         <div className="Content">
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Prophet Information</h2>
               </div>
               <ProphetCard data={prophet} />
               <a
                  href={`https://en.wikipedia.org/wiki/${
                     prophet ? prophet.name : ""
                  }`}
               >
                  <Button variant="outlined">More Info</Button>
               </a>
            </div>
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Predictions</h2>
               </div>
               <div className="PredictionList">
                  {predictions.map((prediction, index) => {
                     return <PredictionStrip data={prediction} key={index} />
                  })}
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Comments</h2>
                  <a href={`/`}>
                     <Button variant="outlined">Comment</Button>
                  </a>
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
         </div>
      </div>
   )
}
