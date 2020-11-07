import React from "react"
import "./CommentAndReviewStrip.css"
import defaultImg from "../../../media/image/default-profile.png"
import Rating from "@material-ui/lab/Rating"

export const ReviewStrip = ({ data }) => {
   const RatingComponent = (value) => {
      return (
         <Rating
            name="half-rating-read"
            defaultValue={4.5}
            value={value / 2}
            precision={0.5}
            readOnly
            size="small"
         />
      )
   }

   const author = data.author[0]

   if (author) {
      return (
         <div className="Strip ReviewStrip">
            <div className="ImgContainer">
               <img
                  src={author.profile_img ? author.profile_img : defaultImg}
                  alt="Default"
               />
            </div>
            <div className="ContentContainer">
               <div className="UserInfo">
                  <div className="Name">
                     <p>{author.username}</p>
                  </div>
                  <div className="Time">
                     <p>
                        {data.relative_date}
                        <span className="ToolTip">
                           {data.posted_date_readable}
                        </span>
                     </p>
                  </div>
               </div>
               <div className="ScoreContainer">
                  <div className="Score">
                     <p>Accuracy:</p>
                     {RatingComponent(data.accuracy)}
                  </div>
                  <div className="Score">
                     <p>Difficulty:</p>
                     {RatingComponent(data.difficulty)}
                  </div>
                  <div className="Score">
                     <p className="OverallScore">
                        Overall Score: <span>{data.overall_score}</span>
                     </p>
                  </div>
               </div>
               <p className="Text">{data.content}</p>
            </div>
         </div>
      )
   }
   return "Error, Author Not Found, Debug Database"
}
