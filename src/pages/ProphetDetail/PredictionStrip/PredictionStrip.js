import React from "react"
import "./PredictionStrip.css"
import { Link } from "react-router-dom"

export const PredictionStrip = (props) => {
   return (
      <Link
         className="PredictionStrip"
         to={`/predictionDetail/${props.data.predictionId}`}
      >
         <div className="Text">
            <p className="Status">Status:{props.data.status}</p>
            <p className="Title">{props.data.title}</p>
            <p className="Description">{props.data.description}</p>
         </div>
         <div className="Rating">
            <p className="Number">
               <span>{props.data.score}</span>/10
            </p>
            <p>Prediction Score</p>
         </div>
      </Link>
   )
}
