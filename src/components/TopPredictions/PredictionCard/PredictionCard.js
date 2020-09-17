import React from "react"
import "./PredictionCard.css"
import Rating from "@material-ui/lab/Rating"
import WB from "../../../lib/image/WarrenBuffett.jpg"

function PredictionCard(props) {
   return (
      <div className="PredictionCard">
         <img src={WB} alt="PredictionImg" />
         <div className="TitleAndRatings">
            <p className="Title">
               one hundred fifty characters one hundred fifty characters one
               hundred fifty characters one hundred fifty characters one hundred
               fifty characters one h
            </p>
            <div className="PredictionInfoContainer">
               <div className="PredictionInfo">
                  <div className="NumReviews">
                     <span>3</span>
                     <p>Reviews</p>
                  </div>
                  <hr />
                  <div className="PredictionScore">
                     <p className="PredictionScoreNumber">
                        <span>8.0</span>/10
                     </p>
                     <Rating
                        name="half-rating-read"
                        defaultValue={4.5}
                        precision={0.1}
                        size="small"
                        readOnly
                     />
                     <p>Prediction Score</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PredictionCard
