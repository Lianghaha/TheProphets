import React from "react"
import "./PredictionCard.css"
import "./CardsCommonCSS.css"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"

export const PredictionCard = ({ data }) => {
   return (
      <Link
         className="Card PredictionCard"
         to={`/predictionDetail/${data.prediction_id}`}
      >
         <img src={data.image} alt="PredictionImg" />
         <Button variant="outlined">View Prediction Detail</Button>
         <div className="NotImg">
            <div className="TextSection">
               <div className="InfoContainer">
                  <p className="PredictionStatus">Status: {data.status}</p>
                  <p className="PredictionDate">
                     Announced Date: <span>{data.announced_date}</span>
                  </p>
               </div>
               <p className="PredictionTitle">{data.title}</p>
               <p className="PredictionDescription">{data.description}</p>
            </div>
            <div className="NumberSectionContainer">
               <div className="NumberSection">
                  <p className="LargeNumber">
                     {data.score}
                     <span>/10</span>
                  </p>
                  <p className="RatingText">Prediction Score</p>
               </div>
               <hr />
               <div className="NumberSection">
                  <p className="LargeNumber">{data.num_review}</p>
                  <p className="RatingText">Reviews</p>
               </div>
            </div>
         </div>
      </Link>
   )
}
