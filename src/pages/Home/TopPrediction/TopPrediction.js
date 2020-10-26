import React, { useEffect, useState, useCallback } from "react"
import "./TopPrediction.css"
import PredictionCard from "../../../lib/components/PredictionCard/PredictionCard"
//Button
import Button from "@material-ui/core/Button"
import { Spin } from "antd"
import { Link } from "react-router-dom"
import axios from "axios"

export const TopPredictions = ({ setTopPredictionsReady }) => {
   const [predictionList, setPredictionList] = useState([])
   const [showLoading, setShowLoading] = useState(false)
   const [showLoadMoreButton, setShowLoadMoreButton] = useState(true)
   const [page, setPage] = useState(1)

   // Helper for getAndSetPredictionList
   const getData = useCallback(async (page) => {
      const numPerPage = 2
      let result = false
      let predictionData = []
      await axios
         .get(`/api/search/predictions?page=${page}&&numPerPage=${numPerPage}`)
         .then(async (response) => {
            // console.log("Predictions: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               predictionData = response.data.result
               result = predictionData
               setShowLoadMoreButton(response.data.showLoadMoreButton)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
      return result
   }, [])

   const getAndSetPredictionList = useCallback(
      async (currentList = [], page = 1) => {
         setPredictionList(currentList.concat(await getData(page)))
         setTopPredictionsReady(true)
      },
      [getData, setTopPredictionsReady]
   )

   useEffect(() => {
      getAndSetPredictionList()
   }, [getAndSetPredictionList])

   const handleLoadMore = async () => {
      setPage(page + 1)
      setShowLoading(true)
      await getAndSetPredictionList(predictionList, page + 1)
      setShowLoading(false)
   }

   return (
      <div className="TopPredictions">
         <div className="TitleAndButtons">
            <h2>Top Predictions</h2>
            <div className="TitleButtons">
               <Link to="/predictions">
                  <Button variant="outlined">SHOW MORE</Button>
               </Link>
            </div>
         </div>
         <div className="PredictionsList">
            {predictionList &&
               predictionList.map((data, index) => {
                  return <PredictionCard key={index} data={data} />
               })}
         </div>

         <div className="TitleButtons">
            {showLoading ? (
               <Spin size="large" />
            ) : showLoadMoreButton ? (
               <Button onClick={handleLoadMore} variant="outlined">
                  LOAD MORE
               </Button>
            ) : (
               ""
            )}
         </div>
      </div>
   )
}
