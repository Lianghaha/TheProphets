import React, { useEffect } from "react"
import "./ProphetDetail.css"
import ProphetCard from "../../lib/components/ProphetCard/ProphetCard"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"




const prophetData = [
   {
      prophetId: 1,
      image:
         "https://img.ltn.com.tw/Upload/partner/page/2019/08/23/190823-4626-01-geReG.jpg",
      name: "Corgi",
      score: 9.9,
      numPredictions: 99,
      description:
         "one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one hundred fifty characters one h",
      moreInfo:""
   }
]

function ProphetDetail(props) {
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   return (
      <div className="ProphetDetail">
         <div className="Content">
            {props.match.match.params.id}
            <div className="Prophet">
               <div className="TitleAndButtons">
                  <h2>Top Predictions</h2>
                  <div className="TitleButtons">
                     <Link to="/predictions">
                        <Button variant="outlined">More Info</Button>
                     </Link>
                  </div>
               </div>
               <ProphetCard data={prophetData[0]} />
            </div>
            <div className="Predictions"></div>
            <div className="Comments"></div>
         </div>
      </div>
   )
}

export default ProphetDetail
