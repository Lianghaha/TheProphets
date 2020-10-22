import React, { useRef, useEffect, useState, useCallback } from "react"
import "./TopProphet.css"
import ProphetCard from "../../../lib/components/ProphetCard/ProphetCard"
//Antd
import { Carousel } from "antd"
//Icons
import { GoChevronRight, GoChevronLeft } from "react-icons/go"
//Button
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import { settings } from "./config"
import axios from "axios"

export const TopProphets = ({ setTopProphetsReady }) => {
   const carouselRef = useRef()
   const CarouselNext = () => {
      carouselRef.current.next()
   }
   const CarouselPrev = () => {
      carouselRef.current.prev()
   }
   const [prophetList, setProphetList] = useState([])
   
   const getData = useCallback(async () => {
      let prophetData = []
      await axios
         .get("/api/search/prophets")
         .then((response) => {
            // console.log("Prophets: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               prophetData = response.data.result
               for (let i = 0; i < 2; i++) {
                  prophetData = prophetData.concat(prophetData)
               }
               // console.log(prophetData)
               setProphetList(prophetData)
               setTopProphetsReady(true)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [setTopProphetsReady])

   useEffect(() => {
      getData()
   }, [getData])

   

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
                  <Button variant="outlined">SHOW MORE</Button>
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
