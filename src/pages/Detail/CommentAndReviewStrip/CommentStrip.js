import React from "react"
import "./CommentAndReviewStrip.css"
import defaultImg from "../../../media/image/default-profile.png"

export const CommentStrip = ({ data }) => {
   const author = data.author[0]
   if (author) {
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
   return "Error, Author Not Found, Debug Database"
}
