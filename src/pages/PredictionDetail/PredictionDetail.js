import React, { useEffect } from "react"
import "./PredictionDetail.css"
import Button from "@material-ui/core/Button"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"

const predictionData = [{
   predictionId: 1,
   prophetId: 2,
   image:
      "https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/468321/fool-not-getty-warren-buffett.jpg&w=2000&op=resize",
   title: "Warren Buffett Just Won a $1 Million Bet",
   description:
      "In 2007, Warren Buffett bet a million dollars that an index fund would outperform a collection of hedge funds over the course of 10 years. This week he won that bet, but the big winner in the wager is a charity called Girls Inc.",
   score: 10,
   numReviews: 66,
   anncouncedDate: "2007",
   resultRevealDate: "2017-12-30",
   status: "Result Revealed",
}]

export const PredictionDetail = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   return (
      <div className="Detail">
         <div className="Content">
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Prediction Information</h2>
               </div>
               <PredictionCard data={predictionData[0]} />
               <div className="Buttons">
                  <a href={`/`}>
                     <Button variant="outlined">Show Prophet</Button>
                  </a>
                  <a href={`https://en.wikipedia.org/wiki/`}>
                     <Button variant="outlined">View Article</Button>
                  </a>
               </div>
            </div>
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Ratings</h2>
                  <a href={`/`}>
                     <Button variant="outlined">Rate This Prediction</Button>
                  </a>
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
         </div>
         {console.log(props.match.match.params.id)}
      </div>
   )
}
