import React from "react"
import "./PredictionCard.css"
import Rating from "@material-ui/lab/Rating"
import WB from "../../../../media/image/WarrenBuffett.jpg"

function PredictionCard(props) {
   return (
      <div className="PredictionCard">
         <img src={WB} alt="PredictionImg" />
         <div className="TitleAndRatings">
            <p className="Title">
               three hundred characters three hundred characters three hundred
               characters three hundred characters three hundred characters
               three hundred characters three hundred characters three hundred
               characters three hundred characters three hundred characters
               three hundred characters three hundred characters
            </p>
            <div className="PredictionInfoContainer">
               <div className="PredictionInfo">
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
                  <hr />
                  <div className="NumReviews">
                     <div className="Number">
                        <span>3</span>
                     </div>
                     <p>Reviews</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PredictionCard
