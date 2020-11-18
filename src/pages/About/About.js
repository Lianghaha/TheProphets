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
               <p className="MyName">Hi! I'm Liang</p>
               <p>
                  I am a web developer graduated from University of Toronto with
                  a double major in Computer Science and Statistics, and a minor
                  in Economics. 
                  <br />I am passionate about bringing beautiful ideas to life,
                  and I love what I do.{" "}
                  <span role="img" aria-label="wink">
                     😉
                  </span>
                  {/* <br />
                  Other than being a web developer, I am also a... #DogPerson
                  #CatPerson #HistoryNerd, #EconomicsBuff, #Foodie  */}
               </p>
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
               During the pandemic, I saw too many daunting predictions intended
               to get attention.
               <br />
               To counter irresponsible predictors, I decided to make a website
               that tracks the predictor’s past predictions.
               <br />
               This website enables everyone to quickly find out whether the
               predictors are reliable and whether we should take their
               predictions seriously.  
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
               predictions affects the predictor’s score which indicates the
               predictor’s reliability rating. 
            </p>
         </div>
      </div>
   )
}
