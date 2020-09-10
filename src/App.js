import React from "react"
import "./App.css"
import { VscFoldDown } from "react-icons/vsc"
import Prophet from "./component/Prophet/Prophet"


function App() {
   let mockdata = {
      image:
         "https://smallcaps.com.au/wp-content/uploads/2020/05/Warren-Buffett-teaching-valuable-lessons-COVID-19-airline-stocks-sell-business-investment.jpg",
      name: "Warren Buffett",
      score: 9.3,
      num_predictions: 3,
      description:
         "American investor, business tycoon, philanthropist, the world's seventh-wealthiest person.",
   }
   return (
      <div className="App">
         <div className="Navbar">
            <ul className="NavLeft">
               <li>
                  <a href="google.com">The Prohets</a>
               </li>
               <li>
                  <a href="google.com">Prohets</a>
               </li>
               <li>
                  <a href="google.com">Predictions</a>
               </li>
            </ul>
            <ul className="NavRight">
               <li>
                  <a href="google.com">Sign In</a>
               </li>
               <li>
                  <a href="google.com">Login</a>
               </li>
            </ul>
         </div>
         <div className="clear-float-div-common"></div>

         <div className="Cover">
            <div className="CoverText">
               <h1>Find The Prohets</h1>
               <p>
                  asdasdajsldkajskldjaskldjaklsjdlaksjdaklsjdlaksjdklajsdlkajsdklajsdklajsdklajskldajsldkjaskldjalskdjalksdjalksjdlaksjdlaksjdklajsdl
               </p>
            </div>
            <div className="Icon">
               <VscFoldDown color="white" size="1.8em" />
            </div>
         </div>
         <div className="clear-float-div-common"></div>
         <div className="TopProphets">
            <h2>Top Prophets</h2>
            <div className="Prophets">
               <Prophet data={mockdata} />
               <Prophet data={mockdata} />
               <Prophet data={mockdata} />
               <Prophet data={mockdata} />
               <Prophet data={mockdata} />
               <Prophet data={mockdata} />
            </div>
         </div>
      </div>
   )
}

export default App
