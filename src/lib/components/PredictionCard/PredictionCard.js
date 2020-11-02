import React, { useEffect } from "react"
import "./PredictionCard.css"
// import Rating from "@material-ui/lab/Rating"
import { Link } from "react-router-dom"

export const PredictionCard = ({ data }) => {
   useEffect(() => {
      //Movement Animation to happen
      // const cards = document.querySelectorAll(".PredictionCard")
      // const containers = document.querySelectorAll(".CardContainer")
      // console.log(containers)
      //Moving Animation Event
      // for (let i = 0; i < containers.length; i++) {
      //    var rect = containers[i].getBoundingClientRect()
      //    console.log(rect.top, rect.right, rect.bottom, rect.left)
      //    containers[i].addEventListener("mouseover", (e) => {
      //       console.log("InnerWidth: " + window.innerWidth)
      //       console.log("e.pageX: " + e.pageX)
      //       let xAxis = (window.innerWidth / 2 - e.pageX) / 50
      //       let yAxis = (window.innerHeight / 2 - e.pageY) / 50
      //       cards[i].style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
      //    })
      // }

      // const card = document.querySelector(".PredictionCard")
      // const container = document.querySelector(".CardContainer")
      // var dimensions = container.getBoundingClientRect()
      // console.log(
      //    dimensions.top,
      //    dimensions.right,
      //    dimensions.bottom,
      //    dimensions.left
      // )
      // const width = dimensions.right - dimensions.left
      // const height = dimensions.bottom - dimensions.top
      // // console.log("width: " + width)
      // // console.log("height: " + height)
      // console.log(
      //    "InnerWidth: " +
      //       window.innerWidth +
      //       " InnerHeight: " +
      //       window.innerHeight
      // )

      // container.addEventListener("mouseover", (e) => {
      //    // console.log("e.pageX: " + e.pageX)
      //    let xAxis = dimensions.top - window.scrollY
      //    let yAxis = width / 2 + dimensions.left
      //    // console.log("xAxis: " + xAxis + " yAxis: " + yAxis)
      //    //y轴基本找对了
      //    let xAxisOffset = xAxis - (e.pageY - window.scrollY)
      //    let yAxisOffset = yAxis - e.pageX + 30
      //    // console.log(e.pageY)
      //    // console.log("xAxis: " + xAxis)
      //    // console.log("yAxis: " + yAxis)
      //    console.log(
      //       "yAxisOffset: " + yAxisOffset + " xAxisOffset: " + xAxisOffset
      //    )
      //    card.style.transform = `rotateY(${yAxisOffset}deg) rotateX(${xAxisOffset}deg)`
      // })

      
   }, [])
   return (
      <Link
         className="PredictionCard"
         to={`/predictionDetail/${data.prediction_id}`}
      >
         <img src={data.image} alt="PredictionImg" />
         <div className="NotImg">
            <div className="Text">
               <p className="Status">Status: {data.status}</p>
               <p className="Title">{data.title}</p>
               <p className="Description">{data.description}</p>
            </div>
            <div className="Ratings">
               <div className="NumberSection">
                  <div className="LargeNumber">
                     <p>{data.score}</p>
                     <span>/10</span>
                  </div>
                  {/* <Rating
                        name="half-rating-read"
                        defaultValue={data.score / 2}
                        precision={0.1}
                        size="small"
                        readOnly
                     /> */}
                  <p className="RatingText">Prediction Score</p>
               </div>
               <hr />
               <div className="NumberSection">
                  <p className="LargeNumber">{data.num_review}</p>
                  <p className="RatingText">Reviews</p>
               </div>
            </div>
         </div>
      </Link>
   )
}

