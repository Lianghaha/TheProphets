import React, { useState, useEffect } from "react"
import Cover from "./Cover/Cover"
import { TopProphets } from "./TopProphet/TopProphet"
import { TopPredictions } from "./TopPrediction/TopPrediction"
import { Spin } from "antd"
import "./Home.css"
// import Loadable from "react-loadable"

// const AsyncCover = Loadable({
//    loader: () => import("./Cover/Cover"),
//    loading: 111,
// })

export const Home = () => {
   const [topProphetsReady, setTopProphetsReady] = useState(false)
   const [topPredictionsReady, setTopPredictionsReady] = useState(false)
   const [showHomeLoading, setShowHomeLoading] = useState(false)

   useEffect(() => {
      setShowHomeLoading(true)
      if (topProphetsReady && topPredictionsReady) {
         setShowHomeLoading(false)
      }
   }, [setShowHomeLoading, topProphetsReady, topPredictionsReady])

   return (
      <div className="Home">
         <Cover />
         <Spin size="large" spinning={showHomeLoading}>
            {showHomeLoading ? <div></div> : ""}
            <TopProphets setTopProphetsReady={setTopProphetsReady} />
         <TopPredictions setTopPredictionsReady={setTopPredictionsReady} />
         </Spin>
      </div>
   )
}
