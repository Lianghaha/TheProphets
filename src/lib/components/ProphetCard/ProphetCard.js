import React from "react"
import "./ProphetCard.css"
// import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

function ProphetCard({ data }) {
   if (data) {
      return (
         <Link className="ProphetCard" to={`/prophetDetail/${data.prophet_id}`}>
            <img src={data.image} alt="profile" />
            <div className="NotImg">
               <div className="TextSection">
                  <h4 id="name">{data.name}</h4>
                  <p id="description">{data.description}</p>
               </div>
               <div className="NumberSectionContainer">
                  <div className="NumberSection">
                     <div className="LargeNumber">
                        <p>{data.score}</p>
                        <p>/10</p>
                     </div>

                     {/* <Rating
                        name="half-rating-read"
                        defaultValue={
                           data.score/2
                        }
                        precision={0.1}
                        size="small"
                        readOnly
                     /> */}
                     <p>Prophet Score</p>
                  </div>
                  <hr />
                  <div className="NumberSection">
                     <div className="LargeNumber">{data.num_prediction}</div>
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
