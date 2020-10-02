import React from "react"
import "./PredictionCard.css"
// import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function PredictionCard({ data }) {
   return (
      <Link
         className="PredictionCard"
         to={`/predictionDetail/${data.prediction_id}`}
      >
         <img src={data.image} alt="PredictionImg" />
         <div className="NotImg">
            <div className="Text">
               <p className="Status">Status: {data.status}</p>
               <p className="Title">{data.title}</p>
               <p className="Description">{data.description}</p>
            </div>
            <div className="Ratings">
               <div className="NumberSection">
                  <p className="LargeNumber">
                     <p>{data.score}</p>
                     <p>/10</p>
                  </p>
                  {/* <Rating
                        name="half-rating-read"
                        defaultValue={data.score / 2}
                        precision={0.1}
                        size="small"
                        readOnly
                     /> */}
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

export default PredictionCard
