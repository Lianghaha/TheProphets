import React from "react"
import "./PredictionStrip.css"
import { Link } from "react-router-dom"

export const PredictionStrip = ({data}) => {
   return (
      <Link
         className="PredictionStrip"
         to={`/predictionDetail/${data.prediction_id}`}
      >
         <div className="Text">
            <p className="Status">Status:{data.status}</p>
            <p className="Title">{data.title}</p>
            <p className="Description">{data.description}</p>
         </div>
         <div className="Rating">
            <p className="Number">
               <span>{data.score}</span>/10
            </p>
            <p>Prediction Score</p>
         </div>
      </Link>
   )
}
