import React from "react"
import "./ProphetCard.css"
import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function ProphetCard(props) {
   if (props.data) {
      return (
         <Link
            className="ProphetCard"
            to={`/prophetDetail/${props.data.prophetId}`}
         >
            <img src={props.data.image} alt="profile" />
            <div className="NotImg">
               <div className="TextSection">
                  <h4 id="name">{props.data.name}</h4>
                  <p id="description">{props.data.description}</p>
               </div>
               <div className="NumberSection">
                  <div className="Score">
                     <p className="ScoreNumber">
                        <span>{props.data.score}</span>/10
                     </p>
                     <Rating
                        name="half-rating-read"
                        defaultValue={props.data.score / 2}
                        precision={0.1}
                        size="small"
                        readOnly
                     />
                     <p>Prophet Score</p>
                  </div>
                  <hr />
                  <div className="NumPredictions">
                     <span>{props.data.numPrediction}</span>
                     <p>Predictions</p>
                  </div>
               </div>
            </div>
         </Link>
      )
   } else {
      return ""
   }
}

export default ProphetCard
