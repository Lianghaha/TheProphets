import React, {useEffect} from "react"
import "./About.css"
//icon
import { VscFoldDown } from "react-icons/vsc"

export const About = () => {

   const getIcon = (page) => {
      return (
         <div
            className="Icon animation_bounce"
            onClick={() => {
               window.scroll({
                  top: page * window.innerHeight,
                  left: 0,
                  behavior: "smooth",
               })
               // console.log(page * window.innerHeight)
            }}
         >
            <VscFoldDown color="white" size="2.5em" />
         </div>
      )
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="About">
         <div className="Container">
            <p className="Question">Who built this Website?</p>
            <div className="Bar">
               <hr />
            </div>
            <div className="Answer">
               <p className="MyName">Hi! This is Liang</p>
               <p>
                  I am a web developer graduated from University of Toronto, with
                  double major in Computer Science and Statistics and a minor in
                  Ecomonics.
               </p>
               {/* <p>
                  Besides Web Development, I am also intrested in #History
                  #Economics #Psychology #Investiment ...
               </p> */}
            </div>
            {/* <div className="Button">Click me!</div> */}
            {getIcon(1)}
         </div>
         <div className="Container">
            <p className="Question">What is the purpose of this website? </p>
            <div className="Bar">
               <hr />
            </div>
            <p className="Answer">
               During the pandemic, I saw too many daunting predictions only intended
               to get attention. I decided to make a website that tracks the
               predictor’s past predictions, so that everyone can quickly find
               out whether the predictors are reliable or not and whether we
               should take their predictions seriously.
            </p>
            {getIcon(2)}
         </div>
         <div className="Container">
            <p className="Question">How are prophets and predictions rated?</p>
            <div className="Bar">
               <hr />
            </div>
            <p className="Answer">
               Logged in users can rate predictions. The rating of the
               predictions affects the prophet score which indicates the
               prophet’s reliability rating.
            </p>
         </div>
      </div>
   )
}
