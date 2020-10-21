import React, { useState, useEffect } from "react"
import Cover from "./Cover/Cover"
import { TopProphets } from "./TopProphet/TopProphet"
import { TopPredictions } from "./TopPrediction/TopPrediction"
import "./Home.css"
// import Loadable from "react-loadable"

// const AsyncCover = Loadable({
//    loader: () => import("./Cover/Cover"),
//    loading: 111,
// })

export const Home = ({ setShowPageLoading }) => {
   const [topProphetsReady, setTopProphetsReady] = useState(false)
   const [topPredictionsReady, setTopPredictionsReady] = useState(false)

   useEffect(() => {
      setShowPageLoading(true)
      if (topProphetsReady && topPredictionsReady) {
         setShowPageLoading(false)
      }
   }, [setShowPageLoading, topProphetsReady, topPredictionsReady])

   return (
      <div className="Home">
         <Cover />
         <TopProphets setTopProphetsReady={setTopProphetsReady} />
         <TopPredictions setTopPredictionsReady={setTopPredictionsReady} />
      </div>
   )
}
