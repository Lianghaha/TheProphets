import React from "react"
import "./ProphetDetail.css"

function ProphetDetail(props) {
   return (
      <div className="ProphetDetail">
         <div className="Info">{props.match.match.params.id}</div>
      </div>
   )
}

export default ProphetDetail
