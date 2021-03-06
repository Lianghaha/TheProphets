import React, { useState, useEffect } from "react"
import Cover from "./Cover/Cover"
import { TopProphets } from "./TopProphet/TopProphet"
import { TopPredictions } from "./TopPrediction/TopPrediction"
import { Spin } from "antd"
import "./Home.css"

export const Home = () => {
   const faders = document.querySelectorAll(".Fade-In")
   const sliders = document.querySelectorAll(".Slide-Item")

   const appearOptions = {
      rootMargin: "0px 0px -260px 0px",
   }
   const appearOnScroll = new IntersectionObserver(
      (entries, appearOnScroll) => {
         entries.forEach((entry) => {
            if (!entry.isIntersecting) {
               return
            } else {
               entry.target.classList.add("appear")
               appearOnScroll.unobserve(entry.target)
            }
         })
      },
      appearOptions
   )

   faders.forEach((fader) => {
      appearOnScroll.observe(fader)
   })
   sliders.forEach((slider) => {
      appearOnScroll.observe(slider)
   })

   const [topProphetsReady, setTopProphetsReady] = useState(false)
   const [topPredictionsReady, setTopPredictionsReady] = useState(false)
   const [showHomeLoading, setShowHomeLoading] = useState(false)

   useEffect(() => {
      window.scrollTo(0, 0)
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
