import React, { useEffect, useState, useCallback } from "react"
import "./Detail.css"
import Button from "@material-ui/core/Button"
import PredictionCard from "../../lib/components/PredictionCard/PredictionCard"
import { ReviewStrip } from "./CommentAndReviewStrip/ReviewStrip"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Modal, Input } from "antd"
import { checkLogin } from "../../lib/utils"

const { TextArea } = Input

export const PredictionDetail = ({ predictionID }) => {
   const history = useHistory()

   const [prediction, setPrediction] = useState()
   const [showModal, setShowModal] = useState(false)
   const [review, setReview] = useState("")
   const reviewMaxLength = 200

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

   useEffect(() => {
      window.scrollTo(0, 0)
      getPrediction()
   }, [getPrediction])

   const handleReviewSubmit = () => {
      console.log(review)
   }

   const handleModal = () => {
      if (checkLogin()) {
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
                     title="review"
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
                        >
                           Submit
                        </Button>,
                     ]}
                  >
                     <TextArea
                        maxLength={reviewMaxLength}
                        rows={6}
                        onChange={(e) => setReview(e.target.value)}
                     />
                     <p id="wordCount">
                        {review.length} / {reviewMaxLength}
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
