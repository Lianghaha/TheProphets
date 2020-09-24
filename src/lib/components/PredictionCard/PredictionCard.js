import React from "react"
import "./PredictionCard.css"
import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function PredictionCard(props) {
   return (
      <Link
         className="PredictionCard"
         to={`/predictionDetail/${props.data.predictionId}`}
      >
         <img src={props.data.image} alt="PredictionImg" />
         <div className="NotImg">
            <div className="Text">
               <p className="Status">Status: {props.data.status}</p>
               <p className="Title">{props.data.title}</p>
               <p className="Description">{props.data.description}</p>
            </div>
            <div className="Ratings">
               <div className="PredictionInfo">
                  <div className="PredictionScore">
                     <p className="PredictionScoreNumber">
                        <span>{props.data.score}</span>/10
                     </p>
                     <Rating
                        name="half-rating-read"
                        defaultValue={props.data.score / 2}
                        precision={0.1}
                        size="small"
                        readOnly
                     />
                     <p className="TextPredictionScore">Prediction Score</p>
                  </div>
                  <hr />
                  <div className="NumReviews">
                     <div className="Number">
                        <span>{props.data.num_reviews}</span>
                     </div>
                     <p className="TextReviews">Reviews</p>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default PredictionCard
