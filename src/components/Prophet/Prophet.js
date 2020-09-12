import React from "react"
import "./Prophet.css"
import Rating from "@material-ui/lab/Rating"
import WB from "../../lib/image/WarrenBuffett.jpg"

function Prophet(props) {
   return (
      <div className="Card">
         <img src={WB} alt="profile" />
         <h4 id="name">{props.data.name}</h4>
         <p id="description">{props.data.description}</p>
         <div className="NumberSection">
            <div className="Score">
               <p className="number">
                  <span>{props.data.score}</span>/10
               </p>
               <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.1}
                  size="small"
                  readOnly
               />
               <p>Prophet Score</p>
            </div>
            <hr />
            <div className="Predictions">
               <p>
                  <span>{props.data.num_predictions}</span>
               </p>
               <p>Predictions</p>
            </div>
         </div>
      </div>
   )
}

export default Prophet
