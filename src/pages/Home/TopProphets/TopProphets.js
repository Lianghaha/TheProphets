import React, { useRef, useEffect, useState } from "react"
import "./TopProphets.css"
import ProphetCard from "../../../lib/components/ProphetCard/ProphetCard"
//Antd
import { Carousel } from "antd"
//Icons
import { GoChevronRight, GoChevronLeft } from "react-icons/go"
//Button
import Button from "@material-ui/core/Button"
import { mockProphetsData } from "../../../lib/mockData"
import { Link } from "react-router-dom"


//Antd Carousel Settings
const settings = {
   arrows: false,
   dots: {className: "ProphetsDots"},
   infinite: true,
   speed: 600,
   slidesToShow: 6,
   slidesToScroll: 6,
   initialSlide: 0,
   draggable: true,
   responsive: [
      {
         breakpoint: 2160,
         settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
         },
      },
      {
         breakpoint: 1800,
         settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
         },
      },
      {
         breakpoint: 1430,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
         },
      },
      {
         breakpoint: 1100,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
         },
      },
      {
         breakpoint: 715,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
}

function TopProphets(props) {
   const carouselRef = useRef()

   function CarouselNext() {
      carouselRef.current.next()
   }
   function CarouselPrev() {
      carouselRef.current.prev()
   }

   const [mockProphetList, setMockProphetList] = useState([])

   useEffect(() => {
      createData()
   }, [])

   const createData = () => {
      let prophetData = []
      for (let i = 0; i < 3; i++) {
         prophetData = prophetData.concat(mockProphetsData)
      }
      setMockProphetList(prophetData)
   }

   return (
      <div className="TopProphets">
         <div className="TitleAndButtons">
            <h2>Top Prophets</h2>
            <div className="TitleButtons">
               <Button onClick={CarouselPrev} variant="outlined">
                  <GoChevronLeft color="white" size="1.8em" />
               </Button>
               <Button onClick={CarouselNext} variant="outlined">
                  <GoChevronRight color="white" size="1.8em" />
               </Button>
               <Link to="/Prophets">
                  <Button variant="outlined">SHOW ALL</Button>
               </Link>
            </div>
         </div>

         <div className="ProphetsList">
            <Carousel ref={carouselRef} {...settings}>
               {mockProphetList.map((data, index) => {
                  return (
                     <div key={index} className="ProphetCardContainer">
                        <ProphetCard data={data} />
                     </div>
                  )
               })}
            </Carousel>
         </div>
      </div>
   )
}

export default TopProphets
