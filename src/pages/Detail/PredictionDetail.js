import React, { useEffect, useState, useCallback } from "react"
import "./DetailCommon.css"
import "./PredictionDetail.css"
import Button from "@material-ui/core/Button"
import { PredictionCard } from "../../lib/components/ProphetPredictionCard/PredictionCard"
import { ReviewStrip } from "./CommentAndReviewStrip/ReviewStrip"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Modal, Input } from "antd"
import { checkLogin } from "../../lib/utils"
import Rating from "@material-ui/lab/Rating"

const { TextArea } = Input
const reviewMaxLength = 200

export const PredictionDetail = ({ predictionID, setShowPageLoading }) => {
   const history = useHistory()

   const [prediction, setPrediction] = useState()
   const [reviews, setReviews] = useState([])
   const [showModal, setShowModal] = useState(false)
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

   const getReviews = useCallback(async () => {
      await axios
         .get(`/api/review?predictionID=${predictionID}`)
         .then((response) => {
            // console.log(
            //    "=============== Prediction Detail Reviews ==============="
            // )
            // console.log(response.data.result)

            if (response.data.status === 0) {
               setReviews(response.data.result)
            } else {
               // console.log(response.data.message)
            }
         })
         .catch((err) => console.log(err))
   }, [predictionID])

   useEffect(() => {
      window.scrollTo(0, 0)
      setShowPageLoading(true)
      Promise.all([getPrediction(), getReviews()]).then(() => {
         setShowPageLoading(false)
      })
   }, [getPrediction, getReviews, setShowPageLoading])

   const calculateOverallScore = () => {
      const a = newReviewAccuracy,
         b = newReviewDifficulty
      const multiple = (a * b) / 10
      const average = (a + b) / 2
      const result = 0.2 * multiple + 0.8 * average
      return Math.round(result * 10) / 10
   }

   const handleReviewSubmit = async () => {
      await axios
         .post("/api/review", {
            accuracy: newReviewAccuracy,
            difficulty: newReviewDifficulty,
            content: newReviewText,
            overall_score: await calculateOverallScore(),
            prediction_id: predictionID,
         })
         .then((response) => {
            // console.log(response.data)
         })
         .catch((err) => console.log(err))
      setShowModal(false)
      setNewReviewText("")
      setNewReviewAccuracy(0)
      setNewReviewDifficulty(0)
      getReviews()
      getPrediction()
   }

   const handleModal = async () => {
      if (await checkLogin()) {
         setShowModal(true)
      } else {
         history.push("/login")
      }
   }

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
                     // onOk={() => {
                     //    setShowModal(false)
                     // }}
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
                     </div>
                     <TextArea
                        maxLength={reviewMaxLength}
                        rows={6}
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                     />
                     <p className="wordCount">
                        {newReviewText.length} / {reviewMaxLength}
                     </p>
                  </Modal>
               </div>
               <div className="List">
                  {reviews.length === 0 ? (
                     <div className="NoCommentOrReview">No Review Found</div>
                  ) : (
                     reviews.map((review, index) => {
                        return <ReviewStrip data={review} key={index} />
                     })
                  )}
               </div>
               {/* <Button variant="outlined">LOAD MORE</Button> */}
            </div>
         </div>
      </div>
   )
}
