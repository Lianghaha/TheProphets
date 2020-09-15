import React from "react"
import "./TopProphets.css"
import Prophet from "./Prophet/Prophet"
//Antd
import { Carousel } from "antd"

window.addEventListener("load", addID())

function addID() {
   let element = document.getElementsByClassName("TopProphets")
   let element2 = document.getElementById("123")
   console.log(element)
   console.log(element2)
   console.log(element[0])
}

//Antd
const settings = {
   arrows: false,
   dots: false,
   infinite: false,
   speed: 500,
   slidesToShow: 6,
   slidesToScroll: 3,
   initialSlide: 0,
   draggable: true,
   responsive: [
      {
         breakpoint: 2200,
         settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
         },
      },
      {
         breakpoint: 1750,
         settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
         },
      },
      {
         breakpoint: 1350,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 1000,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 700,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
}


function TopProphets(props) {
   return (
      <div id="123" className="TopProphets">
         <h2>Top Prophets</h2>
         <div className="ProphetsList">
            <Carousel {...settings}>
               {props.data.map((data) => {
                  return (
                     <div className="Card">
                        <Prophet data={data} />
                     </div>
                  )
               })}
            </Carousel>
         </div>
      </div>
   )
}

export default TopProphets
