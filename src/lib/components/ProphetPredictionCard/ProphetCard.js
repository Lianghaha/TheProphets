import React from "react"
import "./ProphetCard.css"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"

function ProphetCard({ data }) {
   if (data) {
      return (
         <Link
            className="Card ProphetCard"
            to={`/prophetDetail/${data.prophet_id}`}
         >
            <img src={data.image} alt="profile" />
            <div className="NotImg">
               <div className="TextSection">
                  <h4 className="ProphetName">{data.name}</h4>
                  <p className="ProphetDescription">{data.description}</p>
               </div>
               <div className="NumberSectionContainer">
                  <div className="NumberSection">
                     <p className="LargeNumber">
                        {data.score} <span>/10</span>
                     </p>
                     <p className="RatingText">Prophet Score</p>
                  </div>
                  <hr />
                  <div className="NumberSection">
                     <div className="LargeNumber">{data.num_prediction}</div>
                     <p className="RatingText">Predictions</p>
                  </div>
               </div>
               <Button variant="outlined">View Prophet Detail</Button>
            </div>
         </Link>
      )
   } else {
      return ""
   }
}

export default ProphetCard
