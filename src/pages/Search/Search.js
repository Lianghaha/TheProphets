import React, { useState, useEffect } from "react"
import "./Search.css"
import { IoMdArrowRoundBack } from "react-icons/io"
import Button from "@material-ui/core/Button"
import ProphetCard from "../../lib/components/ProphetPredictionCard/ProphetCard"
import { PredictionCard } from "../../lib/components/ProphetPredictionCard/PredictionCard"
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
   const [showProphets, setShowProphets] = useState("initial")

   //All Prophet/Prediction Data From Server
   const [prophetData, setProphetData] = useState([])
   const [predictionData, setPredictionData] = useState([])

   const [inputText, setInputText] = useState("")

   const [showSearchContentLoading, setShowSearchContentLoading] = useState(
      false
   )

   const [scoreSort, setScoreSort] = useState("DESC")
   const [scoreAboveFilter, setScoreAboveFilter] = useState(-1)

   //Get Prophet Data From Server
   const getProphetData = async (
      keyWord = "",
      sort = "DESC",
      scoreAbove = 0
   ) => {
      let prophetData = []
      await axios
         .get(
            `/api/search/prophets?keyWord=${keyWord}&&sort=${sort}&&scoreAbove=${scoreAbove}`
         )
         .then((response) => {
            // console.log("Search Prophets: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               prophetData = response.data.result
               for (let i = 0; i < 0; i++) {
                  prophetData = prophetData.concat(prophetData)
               }
               // console.log(prophetData)
               setProphetData(prophetData)
               setShowSearchContentLoading(false)
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
         .get(
            `/api/search/predictions?keyWord=${keyWord}&&sort=${sort}&&scoreAbove=${scoreAbove}`
         )
         .then((response) => {
            // console.log("Search Predictions: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               predictionData = response.data.result
               for (let i = 0; i < 0; i++) {
                  predictionData = predictionData.concat(predictionData)
               }
               // console.log(predictionData)
               setPredictionData(predictionData)
               setShowSearchContentLoading(false)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (typeof props.showProphets !== "undefined") {
         setShowProphets(props.showProphets)
      }
   }, [props.showProphets])

   useEffect(() => {
      setInputText(props.input)
   }, [props.input])

   useEffect(() => {
      setShowSearchContentLoading(true)
      if (showProphets !== "initial") {
         if (showProphets)
            getProphetData(inputText, scoreSort, scoreAboveFilter)
         else getPredictionData(inputText, scoreSort, scoreAboveFilter)
      }
   }, [scoreSort, scoreAboveFilter, inputText, showProphets])

   //Prophets or Predictions
   const whatToShow = () => {
      if (showProphets) {
         if (Object.keys(prophetData).length === 0) {
            return <div className="Empty">No Result Found</div>
         } else {
            return (
               <div className="SearchProphetCardsContainer">
                  <div className="SearchProphetCards">
                     {prophetData &&
                        prophetData.map((data, index) => {
                           return <ProphetCard key={index} data={data} />
                        })}
                  </div>
               </div>
            )
         }
      } else {
         if (Object.keys(predictionData).length === 0) {
            return <div className="Empty">No Result Found</div>
         } else {
            return (
               <div className="SearchPredictionCards">
                  {predictionData &&
                     predictionData.map((data, index) => {
                        return <PredictionCard key={index} data={data} />
                     })}
               </div>
            )
         }
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

   const scoreAboveRating = (score) => {
      return (
         <div
            className="RatingContainer"
            onClick={() => {
               setScoreAboveFilter(score)
            }}
         >
            <Rating
               name="half-rating-read"
               defaultValue={4.5}
               value={score / 2}
               precision={0.5}
               readOnly
            />
            <p
               style={
                  scoreAboveFilter === score
                     ? { fontWeight: "600" }
                     : { fontWeight: "200" }
               }
            >
               & UP
            </p>
         </div>
      )
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
                     }}
                  >
                     <Button>Predictions</Button>
                  </div>
               </div>
               <Spin size="large" spinning={showSearchContentLoading}>
                  {showSearchContentLoading ? (
                     <div className="SearchContentLoading"></div>
                  ) : (
                     whatToShow()
                  )}
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
                  <p className="Title">Filter: </p>
                  <div className="ScoreAbove">
                     <p>Score:</p>
                     {scoreAboveRating(9)}
                     {scoreAboveRating(8)}
                     {scoreAboveRating(7)}
                     {scoreAboveRating(6)}
                     {scoreAboveRating(5)}
                     <div
                        className="Clear"
                        onClick={() => {
                           setScoreAboveFilter(-1)
                        }}
                     >
                        Reset
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
