import React from "react"
import "./ProphetCard.css"
import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function ProphetCard({data}) {
   if (data) {
      return (
         <Link
            className="ProphetCard"
            to={`/prophetDetail/${data.prophetId}`}
         >
            <img src={data.image} alt="profile" />
            <div className="NotImg">
               <div className="TextSection">
                  <h4 id="name">{data.name}</h4>
                  <p id="description">{data.description}</p>
               </div>
               <div className="NumberSection">
                  <div className="Score">
                     <p className="ScoreNumber">
                        <span>{data.score}</span>/10
                     </p>
                     <Rating
                        name="half-rating-read"
                        defaultValue={
                           data.score ? data.score / 2 : 0
                        }
                        precision={0.1}
                        size="small"
                        readOnly
                     />
                     <p>Prophet Score</p>
                  </div>
                  <hr />
                  <div className="NumPredictions">
                     <span>{data.numPrediction}</span>
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
