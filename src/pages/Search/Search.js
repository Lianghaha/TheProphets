import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Spin } from "antd"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Rating from "@material-ui/lab/Rating"

export const Search = (props) => {
   //BackButton
   const history = useHistory()
   //Display Prophets or Predictions
   const [showProphets, setShowProphets] = useState(true)

   //All Prophet/Prediction Data From Server
   const [prophetData, setProphetData] = useState([])
   const [predictionData, setPredictionData] = useState([])

   const [inputText, setInputText] = useState("")

   const [showLoading, setShowLoading] = useState(false)

   const [scoreSort, setScoreSort] = useState("DESC")
   const [scoreAboveFilter, setScoreAboveFilter] = useState(0)

   //Get Prophet Data From Server
   const getProphetData = async (
      keyWord = "",
      sort = "DESC",
      scoreAbove = 0
   ) => {
      let prophetData = []
      console.log(keyWord, sort, scoreAbove)
      await axios
         .get(`/api/search/prophets?keyWord=${keyWord}&&sort=${sort}&&scoreAbove=${scoreAbove}`)
         .then((response) => {
            console.log("Search Prophets: ")
            console.log(response.data)
            if (response.data.status === "success") {
               prophetData = response.data.result
               for (let i = 0; i < 0; i++) {
                  prophetData = prophetData.concat(prophetData)
               }
               // console.log(prophetData)
               setProphetData(prophetData)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   //Get Prediction Data From Server
   const getPredictionData = async (
      keyWord = "",
      sort = "DESC",
      scoreAbove = 0
   ) => {
      let predictionData = []
      await axios
         .get(`/api/search/predictions?keyWord=${keyWord}&&sort=${sort}&&scoreAbove=${scoreAbove}`)
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
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   useEffect(() => {
      window.scrollTo(0, 0)
      mockLoading()
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
   }, [props.showProphets, props.showPredictions, props.input])

   useEffect(() => {
      mockLoading()
      getProphetData("", scoreSort, scoreAboveFilter)
      getPredictionData("", scoreSort, scoreAboveFilter)
   }, [scoreSort, scoreAboveFilter])

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
                  <div className="Icon" onClick={history.goBack}>
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
                  <p className="Title">Sort by:</p>
                  <RadioGroup
                     name="sort"
                     value={scoreSort}
                     onChange={(e) => {
                        setScoreSort(e.target.value)
                     }}
                  >
                     <FormControlLabel
                        value="DESC"
                        control={<Radio />}
                        label="Score: High to Low"
                     />
                     <FormControlLabel
                        value="ASC"
                        control={<Radio />}
                        label="Score: Low to High"
                     />
                  </RadioGroup>
               </div>
               <div className="Filter HoverEffect">
                  <p className="Title">Filter:</p>
                  <div className="ScoreAbove">
                     <p>Score:</p>
                     <div
                        className="RatingContainer"
                        onClick={() => {
                           setScoreAboveFilter(9)
                        }}
                     >
                        <Rating
                           name="half-rating-read"
                           defaultValue={4.5}
                           precision={0.5}
                           readOnly
                        />
                        <p style={scoreAboveFilter === 9 ? {fontWeight:"600"} : {fontWeight:"200"}}>& UP</p>
                     </div>
                     <div
                        className="RatingContainer"
                        onClick={() => {
                           setScoreAboveFilter(8)
                        }}
                     >
                        <Rating
                           name="half-rating-read"
                           defaultValue={4}
                           precision={0.5}
                           readOnly
                        />
                        <p style={scoreAboveFilter === 8 ? {fontWeight:"600"} : {fontWeight:"200"}}>& UP</p>
                     </div>
                     <div
                        className="RatingContainer"
                        onClick={() => {
                           setScoreAboveFilter(7)
                        }}
                     >
                        <Rating
                           name="half-rating-read"
                           defaultValue={3.5}
                           precision={0.5}
                           readOnly
                        />
                        <p style={scoreAboveFilter === 7 ? {fontWeight:"600"} : {fontWeight:"200"}}>& UP</p>
                     </div>
                     <div
                        className="RatingContainer"
                        onClick={() => {
                           setScoreAboveFilter(6)
                        }}
                     >
                        <Rating
                           name="half-rating-read"
                           defaultValue={3}
                           precision={0.5}
                           readOnly
                        />
                        <p style={scoreAboveFilter === 6 ? {fontWeight:"600"} : {fontWeight:"200"}}>& UP</p>
                     </div>
                     <div
                        className="RatingContainer"
                        onClick={() => {
                           setScoreAboveFilter(5)
                        }}
                     >
                        <Rating
                           name="half-rating-read"
                           defaultValue={2.5}
                           precision={0.5}
                           readOnly
                        />
                        <p style={scoreAboveFilter === 5 ? {fontWeight:"600"} : {fontWeight:"200"}}>& UP</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

Search.defaultProps = {
   input: "",
}
