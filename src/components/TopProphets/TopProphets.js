import React from "react"
import "./TopProphets.css"
import Prophet from "./Prophet/Prophet"
//Card Slider react-elastic-carousel
import Carousel, { consts } from "react-elastic-carousel"
import Button from "react-elastic-carousel"
//Card Slider react slick
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
// import Slider from "react-slick"

window.addEventListener("load", addID())

function addID() {
   let element = document.getElementsByClassName("TopProphets")
   let element2 = document.getElementById("123")
   console.log(element)
   console.log(element2)
   console.log(element[0])
}

//react-elastic-carousel settings
function myArrow({ type, onClick, isEdge }) {
   const pointer = type === consts.PREV ? "👈" : "👉"
   return (
      <Button onClick={onClick} disabled={isEdge}>
         {pointer}
      </Button>
   )
}

const breakPoints = [
   { width: 1, itemsToShow: 1 },
   { width: 600, itemsToShow: 2 },
   { width: 850, itemsToShow: 3 },
   { width: 1150, itemsToShow: 4 },
   { width: 1450, itemsToShow: 5 },
   { width: 1700, itemsToShow: 6 },
]

const style = {}

//react-slick
// const settings = {
//    dots: true,
//    infinite: true,
//    speed: 500,
//    slidesToShow: 1,
//    slidesToScroll: 1,
// }

function TopProphets(props) {
   return (
      <div id="123" className="TopProphets">
         <h2>Top Prophets</h2>
         <div className="ProphetsList">
            <Carousel breakPoints={breakPoints} pagination={false} disableArrowsOnEnd={false}
            style={style}>
               {props.data.map((data) => {
                  return (
                     <div className="Card">
                        <Prophet data={data} />
                     </div>
                  )
               })}
            </Carousel>

            {/* react slick */}
            {/* <div>
               <h2> Single Item</h2>
               <Slider {...settings}>
                  <div>
                     <h3>1</h3>
                  </div>
                  <div>
                     <h3>2</h3>
                  </div>
                  <div>
                     <h3>3</h3>
                  </div>
                  <div>
                     <h3>4</h3>
                  </div>
                  <div>
                     <h3>5</h3>
                  </div>
                  <div>
                     <h3>6</h3>
                  </div>
               </Slider>
            </div> */}


         </div>
      </div>
   )
}

export default TopProphets
