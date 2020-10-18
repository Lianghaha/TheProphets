import React, { useEffect, useState, useCallback } from "react"
import "./Detail.css"
import Button from "@material-ui/core/Button"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { ReviewStrip } from "./CommentAndReviewStrip/ReviewStrip"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Modal, Input } from "antd"
import { checkLogin } from "../../lib/utils"
import Rating from "@material-ui/lab/Rating"

const { TextArea } = Input
const reviewMaxLength = 200

export const PredictionDetail = ({ predictionID }) => {
   const history = useHistory()

   const [prediction, setPrediction] = useState()
   const [showModal, setShowModal] = useState(true)
   const [newReviewText, setNewReviewText] = useState("")
   const [newReviewAccuracy, setNewReviewAccuracy] = useState(0)
   const [newReviewDifficulty, setNewReviewDifficulty] = useState(0)

   const getPrediction = useCallback(async () => {
      await axios
         .get(`/api/search/predictions?predictionID=${predictionID}`)
         .then((response) => {
            // console.log("Prediction Detail: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               setPrediction(response.data.result[0])
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [predictionID])

   const PredictionCardSection = () => {
      return (
         <div className="Section">
            <div className="SectionTitleAndButton">
               <h2>Prediction Information</h2>
            </div>
            <PredictionCard data={prediction} />
            <div className="Buttons">
               <a href={`/prophetDetail/${prediction.prophet_id}`}>
                  <Button variant="outlined">Show Prophet</Button>
               </a>
               <a href={prediction.article}>
                  <Button variant="outlined">View Article</Button>
               </a>
            </div>
         </div>
      )
   }

   const calculateOverallScore = () => {
      const a = newReviewAccuracy,
         b = newReviewDifficulty
      const multiple = (a * b) / 10
      console.log("multiple: " + multiple)
      const average = (a + b) / 2
      console.log("average: " + average)
      const result = 0.2 * multiple + 0.8 * average
      console.log("result: " + result)
      return Math.round(result * 10) / 10
   }

   useEffect(() => {
      window.scrollTo(0, 0)
      getPrediction()
   }, [getPrediction])

   // useEffect(() => {
   //    console.log(newReviewAccuracy)
   // }, [newReviewAccuracy, newReviewDifficulty])

   const handleReviewSubmit = () => {
      console.log(newReviewText)
   }

   const handleModal = async () => {
      if (await checkLogin()) {
         setShowModal(true)
      } else {
         history.push("/login")
      }
   }

   return (
      <div className="Detail">
         <div className="Content">
            {prediction ? PredictionCardSection() : ""}
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Reviews</h2>
                  <Button variant="outlined" onClick={handleModal}>
                     Add Review
                  </Button>
                  <Modal
                     title="Review"
                     visible={showModal}
                     onOk={() => {
                        setShowModal(false)
                     }}
                     onCancel={() => {
                        setShowModal(false)
                     }}
                     footer={[
                        <Button
                           key="back"
                           variant="outlined"
                           onClick={() => setShowModal(false)}
                        >
                           Cancel
                        </Button>,
                        <Button
                           key="submit"
                           variant="outlined"
                           onClick={handleReviewSubmit}
                           disabled={
                              newReviewAccuracy === 0 ||
                              newReviewDifficulty === 0 ||
                              newReviewText.length === 0
                           }
                        >
                           Submit
                        </Button>,
                     ]}
                  >
                     <div className="ScoreContainer">
                        <div className="Score">
                           <p>Accuracy:</p>
                           <Rating
                              name="accuracy"
                              defaultValue={4.5}
                              value={newReviewAccuracy / 2}
                              precision={0.5}
                              onChange={(event, newValue1) => {
                                 setNewReviewAccuracy(newValue1 * 2)
                              }}
                           />
                        </div>
                        <div className="Score">
                           <p>Difficulty:</p>
                           <Rating
                              name="dfficulty"
                              defaultValue={4.5}
                              value={newReviewDifficulty / 2}
                              precision={0.5}
                              onChange={(event, newValue2) => {
                                 setNewReviewDifficulty(newValue2 * 2)
                              }}
                           />
                        </div>
                        {/* <div className="Score">
                           <p className="OverallScore">
                              Overall Score:{" "}
                              <span>{calculateOverallScore()}</span>
                           </p>
                        </div> */}
                     </div>
                     <TextArea
                        maxLength={reviewMaxLength}
                        rows={6}
                        onChange={(e) => setNewReviewText(e.target.value)}
                     />
                     <p className="wordCount">
                        {newReviewText.length} / {reviewMaxLength}
                     </p>
                  </Modal>
               </div>
               <div className="List">
                  <ReviewStrip />
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
         </div>
      </div>
   )
}
