import React from "react"
import "./TopProphets.css"
import Prophet from "./Prophet/Prophet"
//Card Slider
import Carousel, { consts } from "react-elastic-carousel"
import Button from "react-elastic-carousel"

window.addEventListener("load", addID())

function addID() {
   let element = document.getElementsByClassName("TopProphets")
   let element2 = document.getElementById("123")
   console.log(element)
   console.log(element2)
   console.log(element[0])

}

function myArrow({ type, onClick, isEdge }) {
      const pointer = type === consts.PREV ? '👈' : '👉'
      return (
        <Button onClick={onClick} disabled={isEdge}>
          {pointer}
        </Button>
      )
    }

function TopProphets(props) {
   const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 },
   ]

   return (
      <div id="123" className="TopProphets">
         <h2>Top Prophets</h2>
         <div className="ProphetsList">
            <Carousel breakPoints={breakPoints} pagination={false} disableArrowsOnEnd={false}>
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
