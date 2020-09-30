import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
// import { mockProphetsData } from "../../lib/mockData"
// import { mockPredictionsData } from "../../lib/mockData"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Spin } from "antd"

export const Search = (props) => {
   //Display Prophets or Predictions
   const [showProphets, setShowProphets] = useState(props.showProphets)
   const [showPredictions, setShowPredictions] = useState(props.showPredictions)

   //All Prophet/Prediction Data From Server
   const [prophetData, setProphetData] = useState([])
   const [predictionData, setPredictionData] = useState([])

   // //Displayed Prophet/Prediction
   // const [prophetData, setprophetData] = useState([])
   // const [predictionData, setpredictionData] = useState([])

   const [inputText, setInputText] = useState("")

   const [showLoading, setShowLoading] = useState(false)

   //Get Prophet Data From Server
   const getProphetData = async (keyWord) => {
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
   const getPredictionData = async (keyWord) => {
      let predictionData = []
      await axios
         .get(`/api/search/predictions?keyWord=${keyWord}`)
         .then((response) => {
            // console.log("Search Predictions: ")
            // console.log(response.data)
            if (response.data.status === "success") {
               predictionData = response.data.result
               for (let i = 0; i < 0; i++) {
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

   // //Locally Search Prophets/Predictions By Input keyword
   // const searchProphetData = useCallback(
   //    (input) => {
   //       let prophetData = []
   //       prophetData.forEach((data) => {
   //          if (
   //             data.name &&
   //             data.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
   //          ) {
   //             prophetData.push(data)
   //          }
   //       })
   //       setprophetData(prophetData)
   //    },
   //    [prophetData, setprophetData]
   // )

   // const searchPredictionData = useCallback(
   //    (input) => {
   //       let predictionData = []
   //       predictionData.forEach((data) => {
   //          if (
   //             data.title &&
   //             data.title
   //                .toLocaleLowerCase()
   //                .includes(input.toLocaleLowerCase())
   //          ) {
   //             predictionData.push(data)
   //          }
   //       })
   //       setpredictionData(predictionData)
   //    },
   //    [predictionData, setpredictionData]
   // )

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      setShowProphets(props.showProphets)
      setShowPredictions(props.showPredictions)

      if (props.match.match.params.input) {
         // console.log("222222222222222222222222222222")
         const keyWord = props.match.match.params.input
         setInputText(keyWord)
         getProphetData(keyWord)
         getPredictionData(keyWord)
         // const keyWord = props.match.match.params.input
         // getProphetData(keyWord)
         // getPredictionData(keyWord)
         // searchProphetData(input)
         // searchPredictionData(input)
      } else {
         // console.log("111111111111111111111111111111111")
         // setprophetData(prophetData)
         // setpredictionData(predictionData)
         getProphetData("")
         getPredictionData("")
      }
   }, [
      props.showProphets,
      props.showPredictions,
      props.match.match.params.input,
      // prophetData,
      // predictionData,
      // searchProphetData,
      // searchPredictionData,
   ])

   // useEffect(() => {
   //    getProphetData(inputText)
   //    getPredictionData(inputText)
   // }, [inputText])

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
      }
      if (showPredictions) {
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
                        setShowPredictions(false)
                        mockLoading()
                     }}
                  >
                     <Button>Prophets</Button>
                  </div>
                  <div
                     className={
                        showPredictions
                           ? "SwitchButton SwitchButtonActive"
                           : "SwitchButton"
                     }
                     onClick={() => {
                        setShowProphets(false)
                        setShowPredictions(true)
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
   match: { match: { params: { input: "" } } },
}
