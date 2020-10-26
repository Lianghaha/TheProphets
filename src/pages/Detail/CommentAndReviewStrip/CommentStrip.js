import React from "react"
import "./CommentAndReviewStrip.css"
import defaultImg from "../../../media/image/default-profile.png"

export const CommentStrip = ({ data }) => {
   console.log(data)
   // const data = {
   //    profile_img: defaultImg,
   //    username: "Haha Wowwowwow",
   //    posted_date: "2020/10/8 @ 1:19:30",
   //    relative_date: "3 weeks ago",
   //    content:
   //       "1000 characters The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence. What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect sense, but is something I never noticed before. What have you noticed today? The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence. What",
   // }

   const author = data.author[0]

   return (
      <div className="Strip CommentStrip">
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
            <p className="Text">{data.content}</p>
         </div>
      </div>
   )
}
