import React, { useRef, useEffect, useState } from "react"
import "./TopProphet.css"
import ProphetCard from "../../../lib/components/ProphetCard/ProphetCard"
//Antd
import { Carousel } from "antd"
//Icons
import { GoChevronRight, GoChevronLeft } from "react-icons/go"
//Button
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import axios from "axios"

//Antd Carousel Settings
const settings = {
   arrows: false,
   dots: { className: "ProphetsDots" },
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

export const TopProphets = () => {
   const carouselRef = useRef()

   function CarouselNext() {
      carouselRef.current.next()
   }
   function CarouselPrev() {
      carouselRef.current.prev()
   }

   const [prophetList, setProphetList] = useState([])

   useEffect(() => {
      getData()
   }, [])

   const getData = async () => {
      let prophetData = []
      await axios
         .get("api/search/prophets")
         .then((response) => {
            // console.log("Prophets: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               prophetData = response.data.result
               for (let i = 0; i < 2; i++) {
                  prophetData = prophetData.concat(prophetData)
               }
               // console.log(prophetData)
               setProphetList(prophetData)
            } else {
               // console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
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
               <Link to="/prophets">
                  <Button variant="outlined">SHOW ALL</Button>
               </Link>
            </div>
         </div>

         <div className="ProphetsList">
            <Carousel ref={carouselRef} {...settings}>
               {prophetList.map((data, index) => {
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
