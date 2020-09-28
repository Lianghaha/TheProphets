import React from "react"
import Cover from "./Cover/Cover"
import TopProphets from "./TopProphet/TopProphet"
import { TopPredictions } from "./TopPrediction/TopPrediction"
import "./Home.css"

export const Home = () => {
   return (
      <div className="Home">
         <Cover />
         <TopProphets />
         <TopPredictions />
      </div>
   )
}
