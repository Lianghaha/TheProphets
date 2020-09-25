import React, { useEffect } from "react"
import "./ProphetDetail.css"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { PredictionStrip } from "./PredictionStrip/PredictionStrip"

const prophetData = [
   {
      prophetId: 1,
      image:
         "https://img.ltn.com.tw/Upload/partner/page/2019/08/23/190823-4626-01-geReG.jpg",
      name: "Corgi",
      score: 9.9,
      numPrediction: 99,
      description:
         "one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one h",
      moreInfo: "",
   },
]

const predictionData = {
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
}

export const ProphetDetail = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   return (
      <div className="ProphetDetail">
         <div className="Content">
            <div className="Section">
               <h2 className="SectionTitle">Prophet Information</h2>
               <ProphetCard data={prophetData[0]} />
               <a href={`https://en.wikipedia.org/wiki/${prophetData[0].name}`}>
                  <Button variant="outlined">More Info</Button>
               </a>
            </div>
            <div className="Section">
               <h2 className="SectionTitle">Predictions</h2>
               <div className="PredictionList">
                  <PredictionStrip data={predictionData} />
                  <PredictionStrip data={predictionData} />
                  <PredictionStrip data={predictionData} />
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
            <div className="Section">
               <h2 className="SectionTitle">User Comments</h2>
            </div>
         </div>
         {props.match.match.params.id}
      </div>
   )
}
