import React from "react"
import "./PredictionCard.css"
import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function PredictionCard({data}) {
   return (
      <Link
         className="PredictionCard"
         to={`/predictionDetail/${data.predictionId}`}
      >
         <img src={data.image} alt="PredictionImg" />
         <div className="NotImg">
            <div className="Text">
               <p className="Status">Status: {data.status}</p>
               <p className="Title">{data.title}</p>
               <p className="Description">{data.description}</p>
            </div>
            <div className="Ratings">
               <div className="PredictionInfo">
                  <div className="PredictionScore">
                     <p className="PredictionScoreNumber">
                        <span>{data.score}</span>/10
                     </p>
                     <Rating
                        name="half-rating-read"
                        defaultValue={data.score / 2}
                        precision={0.1}
                        size="small"
                        readOnly
                     />
                     <p className="TextPredictionScore">Prediction Score</p>
                  </div>
                  <hr />
                  <div className="NumReviews">
                     <div className="Number">
                        <span>{data.numReviews}</span>
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
