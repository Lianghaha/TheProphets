import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Spin } from "antd"

export const Search = (props) => {
   //Display Prophets or Predictions
   const [showProphets, setShowProphets] = useState(true)

   //All Prophet/Prediction Data From Server
   const [prophetData, setProphetData] = useState([])
   const [predictionData, setPredictionData] = useState([])

   const [inputText, setInputText] = useState("")

   const [showLoading, setShowLoading] = useState(false)

   //Get Prophet Data From Server
   const getProphetData = async (keyWord = "") => {
      let prophetData = []
      // console.log(keyWord)
      await axios
         .get(`/api/search/prophets?keyWord=${keyWord}`)
         .then((response) => {
            // console.log("Search Prophets: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               prophetData = response.data.result
               for (let i = 0; i < 0; i++) {
                  prophetData = prophetData.concat(prophetData)
               }
               // console.log(prophetData)
               setProphetData(prophetData)
            } else {
               // console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   //Get Prediction Data From Server
   const getPredictionData = async (keyWord = "") => {
      let predictionData = []
      await axios
         .get(`/api/search/predictions?keyWord=${keyWord}`)
         .then((response) => {
            // console.log("Search Predictions: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               predictionData = response.data.result
               for (let i = 0; i < 5; i++) {
                  predictionData = predictionData.concat(predictionData)
               }
               // console.log(predictionData)
               setPredictionData(predictionData)
            } else {
               // console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   useEffect(() => {
      window.scrollTo(0, 0)
      if (typeof props.showProphets !== "undefined")
         setShowProphets(props.showProphets)
      setInputText("")

      if (props.input) {
         const keyWord = props.input
         setInputText(keyWord)
         getProphetData(keyWord)
         getPredictionData(keyWord)
      } else {
         getProphetData()
         getPredictionData()
      }
   }, [
      props.showProphets,
      props.showPredictions,
      props.input,
   ])

   //BackButton
   const history = useHistory()

   //Prophets or Predictions
   const whatToShow = () => {
      if (showProphets) {
         if (Object.keys(prophetData).length === 0) {
            return <div className="Empty">No Result Found</div>
         }
         return (
            <div className="SearchProphetCards">
               {prophetData.map((data, index) => {
                  return <ProphetCard key={index} data={data} />
               })}
            </div>
         )
      } else {
         if (Object.keys(predictionData).length === 0) {
            return <div className="Empty">No Result Found</div>
         }
         return (
            <div className="SearchPredictionCards">
               {predictionData.map((data, index) => {
                  return <PredictionCard key={index} data={data} />
               })}
            </div>
         )
      }
   }

   const searchTextDisplay = () => {
      if (inputText) {
         return inputText
      }
      if (showProphets) {
         return "All Prophets"
      } else {
         return "All Predictions"
      }
   }

   const mockLoading = () => {
      setShowLoading(true)
      setTimeout(() => {
         setShowLoading(false)
      }, 1000)
   }

   return (
      <div className="Search">
         <div className="ResultsAndTools">
            <div className="Results HoverEffect">
               <div className="SearchText">
                  <div
                     className="Icon"
                     onClick={() => {
                        history.goBack()
                     }}
                  >
                     <IoMdArrowRoundBack size="3em" />
                  </div>
                  <p>Search: {searchTextDisplay()}</p>
               </div>
               <div className="SwitchButtonContainer">
                  <div
                     className={
                        showProphets
                           ? "SwitchButton SwitchButtonActive"
                           : "SwitchButton"
                     }
                     onClick={() => {
                        setShowProphets(true)
                        mockLoading()
                     }}
                  >
                     <Button>Prophets</Button>
                  </div>
                  <div
                     className={
                        showProphets
                           ? "SwitchButton"
                           : "SwitchButton SwitchButtonActive"
                     }
                     onClick={() => {
                        setShowProphets(false)
                        mockLoading()
                     }}
                  >
                     <Button>Predictions</Button>
                  </div>
               </div>
               <Spin size="large" spinning={showLoading}>
                  {showLoading ? <div></div> : whatToShow()}
               </Spin>
            </div>

            <div className="Tools">
               <div className="Sort HoverEffect">
                  <p className="Title">Sort</p>
               </div>
               <div className="Filter HoverEffect">
                  <p className="Title">Filter</p>
               </div>
            </div>
         </div>
      </div>
   )
}

Search.defaultProps = {
   input: "" ,
}
