import React, { useEffect, useState, useCallback } from "react"
import "./DetailCommon.css"
import "./ProphetDetail.css"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import Button from "@material-ui/core/Button"
import { PredictionStrip } from "./PredictionStrip/PredictionStrip"
import { CommentStrip } from "./CommentAndReviewStrip/CommentStrip"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Modal, Input } from "antd"
import { checkLogin } from "../../lib/utils"

const { TextArea } = Input
const commentMaxLength = 200

export const ProphetDetail = ({ prophetID, setShowPageLoading }) => {
   const history = useHistory()

   const [prophet, setProphet] = useState()
   const [predictions, setPredictions] = useState([])
   const [comments, setComments] = useState([])
   const [showModal, setShowModal] = useState(false)
   const [newComment, setNewComment] = useState("")
   // const [prophetReady, setProphetReady] = useState(false)
   // const [predictionReady, setPredictionReady] = useState(false)

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

   const getComments = useCallback(async () => {
      await axios
         .get(`/api/comment?prophetID=${prophetID}`)
         .then((response) => {
            console.log(
               "=============== Prophet Detail Comments ==============="
            )
            console.log(response.data.result)

            if (response.data.status === 0) {
               setComments(response.data.result)
            } else {
               console.log(response.data.message)
            }
         })
         .catch((err) => console.log(err))
   }, [prophetID])

   useEffect(() => {
      window.scrollTo(0, 0)
      setShowPageLoading(true)
      Promise.all([getProphet(), getPredictions(), getComments()]).then(() => {
         setShowPageLoading(false)
      })
   }, [getProphet, getPredictions, getComments, setShowPageLoading])

   const handleCommentSubmit = async () => {
      await axios
         .post("/api/comment", {
            content: newComment,
            prophet_id: prophetID,
         })
         .then((response) => {
            console.log(response.data)
         })
         .catch((err) => console.log(err))
      setShowModal(false)
      setNewComment("")
      getComments()
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
            <div className="Section">
               <div className="SectionTitleAndButton">
                  <h2>Prophet Information</h2>
                  <a
                     href={`https://en.wikipedia.org/wiki/${
                        prophet ? prophet.name : ""
                     }`}
                  >
                     <Button variant="outlined">More Info</Button>
                  </a>
               </div>
               <ProphetCard data={prophet} />
            </div>
            {predictions.length === 0 ? (
               ""
            ) : (
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
            )}

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
                           disabled={newComment.length === 0}
                        >
                           Submit
                        </Button>,
                     ]}
                  >
                     <TextArea
                        maxLength={commentMaxLength}
                        rows={6}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                     />
                     <p className="wordCount">
                        {newComment.length} / {commentMaxLength}
                     </p>
                  </Modal>
               </div>

               <div className="List">
                  {comments.length === 0 ? (
                     <div className="NoCommentOrReview">No Comments</div>
                  ) : (
                     comments.map((comment, index) => {
                        return <CommentStrip data={comment} key={index} />
                     })
                  )}
               </div>

               <Button variant="outlined">LOAD MORE</Button>
            </div>
         </div>
      </div>
   )
}
