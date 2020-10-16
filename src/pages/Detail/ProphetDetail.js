import React, { useEffect, useState, useCallback } from "react"
import "./Detail.css"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import Button from "@material-ui/core/Button"
import { PredictionStrip } from "./PredictionStrip/PredictionStrip"
import { CommentStrip } from "./CommentAndReviewStrip/CommentStrip"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Modal, Input } from "antd"
import { checkLogin } from "../../lib/utils"

const { TextArea } = Input

export const ProphetDetail = ({ prophetID }) => {
   const history = useHistory()

   const [prophet, setProphet] = useState()
   const [predictions, setPredictions] = useState([])
   const [showModal, setShowModal] = useState(false)
   const [comment, setComment] = useState("")
   const commentMaxLength = 200

   const getProphet = useCallback(async () => {
      await axios
         .get(`/api/search/prophets?prophetID=${prophetID}`)
         .then((response) => {
            // console.log("Prophet Detail: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               setProphet(response.data.result[0])
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [prophetID])

   const getPredictions = useCallback(async () => {
      await axios
         .get(`/api/search/predictions?prophetID=${prophetID}`)
         .then((response) => {
            // console.log("Prophet Detail Predictions: ")
            // console.log(response.data)
            if (response.data.status === 0) {
               setPredictions(response.data.result)
            } else {
               console.log(response.data.err)
            }
         })
         .catch((err) => console.log(err))
   }, [prophetID])

   useEffect(() => {
      window.scrollTo(0, 0)
      getProphet()
      getPredictions()
   }, [getProphet, getPredictions])

   const handleCommentSubmit = () => {
      console.log(comment)
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
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Prophet Information</h2>
               </div>
               <ProphetCard data={prophet} />
               <a
                  href={`https://en.wikipedia.org/wiki/${
                     prophet ? prophet.name : ""
                  }`}
               >
                  <Button variant="outlined">More Info</Button>
               </a>
            </div>
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Predictions</h2>
               </div>
               <div className="List">
                  {predictions.map((prediction, index) => {
                     return <PredictionStrip data={prediction} key={index} />
                  })}
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Comments</h2>
                  <Button variant="outlined" onClick={handleModal}>
                     Add Comment
                  </Button>
                  <Modal
                     title="Comment"
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
                           onClick={handleCommentSubmit}
                        >
                           Submit
                        </Button>,
                     ]}
                  >
                     <TextArea
                        maxLength={commentMaxLength}
                        rows={6}
                        onChange={(e) => setComment(e.target.value)}
                     />
                     <p id="wordCount">
                        {comment.length} / {commentMaxLength}
                     </p>
                  </Modal>
               </div>
               <div className="List">
                  <CommentStrip />
               </div>
               <Button variant="outlined">SHOW MORE</Button>
            </div>
         </div>
      </div>
   )
}
