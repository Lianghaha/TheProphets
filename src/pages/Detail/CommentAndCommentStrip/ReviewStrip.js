import React from "react"
import "./CommentAndReviewStrip.css"
import defaultImg from "../../../media/image/default-profile.png"
import Rating from "@material-ui/lab/Rating"

export const ReviewStrip = () => {
   const data = {
      profile_img: defaultImg,
      username: "Haha Wowwowwow",
      posted_date: "2020/10/8 @ 1:19:30",
      relative_date: "3 weeks ago",
      accuracy: 9,
      difficulty: 8,
      overall_score: 7.9,
      content:
         "1000 characters The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence. What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect sense, but is something I never noticed before. What have you noticed today? The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence. What",
   }

   return (
      <div className="Strip ReviewStrip">
         <div className="ImgContainer">
            <img src={data.profile_img} alt="Default" />
         </div>
         <div className="ContentContainer">
            <div className="UserInfo">
               <div className="Name">
                  <p>{data.username}</p>
               </div>
               <div className="Time">
                  <p>
                     {data.relative_date}{" "}
                     <span className="ToolTip">{data.posted_date}</span>
                  </p>
               </div>
            </div>
            <div className="ScoreContainer">
               <div className="Score">
                  <p>Accuracy:</p>
                  <Rating
                     name="half-rating-read"
                     defaultValue={4.5}
                     value={data.accuracy / 2}
                     precision={0.5}
                     readOnly
                     size="small"
                  />
               </div>
               <div className="Score">
                  <p>Difficulty:</p>
                  <Rating
                     name="half-rating-read"
                     defaultValue={4.5}
                     value={data.difficulty / 2}
                     precision={0.5}
                     readOnly
                     size="small"
                  />
               </div>
               <div className="Score">
                  <p className="OverallScore">
                     Overall Score: <span>{data.overall_score}</span>
                  </p>
               </div>
            </div>
            <div>
               <p className="Text">{data.content}</p>
            </div>
         </div>
      </div>
   )
}
