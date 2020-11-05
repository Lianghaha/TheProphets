import React, { useEffect } from "react"
import "./test.css"
// import { PredictionCard } from "../../lib/components/PredictionCard/PredictionCard"
export const Test = () => {
//    const data = {
//       announced_date: "2007",
//       article:
//          "https://www.forbes.com/sites/johnwasik/2018/01/08/how-buffett-won-his-1-million-bet/#bd42122a6cdd",
//       description:
//          "In 2007, Warren Buffett bet a million dollars that an index fund would outperform a collection of hedge funds over the course of 10 years and he finally won that bet",
//       image:
//          "https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/468321/fool-not-getty-warren-buffett.jpg&w=2000&op=resize",
//       num_review: 0,
//       prediction_id: 1,
//       prophet_id: 2,
//       result_date: "2017-12-30",
//       score: 0,
//       status: "Result Revealed",
//       title: "Warren Buffett Just Won a $1 Million Bet",
//    }

   useEffect(() => {
      const card = document.querySelector(".Card")
      const container = document.querySelector(".Container")
      //   const dimensions = container.getBoundingClientRect()
      //   console.log(
      //      dimensions.top,
      //      dimensions.right,
      //      dimensions.bottom,
      //      dimensions.left
      //   )
      //   const width = dimensions.right - dimensions.left
      //   const height = dimensions.bottom - dimensions.top
      // console.log("width: " + width)
      // console.log("height: " + height)
    //   console.log(
    //      "InnerWidth: " +
    //         window.innerWidth +
    //         " InnerHeight: " +
    //         window.innerHeight
    //   )
      container.addEventListener("mouseover", (e) => {
         // console.log("e.pageX: " + e.pageX)
        //  let xAxis = window.innerHeight / 2
        //  let yAxis = window.innerWidth / 2
         // console.log("xAxis: " + xAxis + " yAxis: " + yAxis)
         //y轴基本找对了
        //  let xAxisOffset = -((xAxis - e.pageY) / 20)
        //  let yAxisOffset = (yAxis - e.pageX) / 20
        let xAxisOffset = (e.pageY - window.innerHeight / 2) / 25
        let yAxisOffset = (window.innerWidth / 2 - e.pageX) / 25
         // console.log(e.pageY)
         // console.log("xAxis: " + xAxis)
         // console.log("yAxis: " + yAxis)
        //   console.log(
        //      "yAxisOffset: " + yAxisOffset + " xAxisOffset: " + xAxisOffset
        //   )
         card.style.transform = `rotateY(${yAxisOffset}deg) rotateX(${xAxisOffset}deg)`
         //Animate In
         container.addEventListener("mouseenter", e => {
             card.style.transition = "none"
         })
         //Animate Out
         container.addEventListener("mouseleave", e => {
             card.style.transition = "all 0.5s ease"
             card.style.transform = `rotateY(0deg) rotateX(0deg)`
         })
      })
   }, [])

   return (
      <div className="Test">
         <div className="Container">
            <div className="Card"></div>
         </div>
      </div>
   )
}
