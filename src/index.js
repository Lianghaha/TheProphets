import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Navbar from "./components/Navbar/Navbar"
import Cover from "./components/Cover/Cover"
import TopProphets from "./components/TopProphets/TopProphets"

function App() {
   let mockData = {
      image:
         "https://smallcaps.com.au/wp-content/uploads/2020/05/Warren-Buffett-teaching-valuable-lessons-COVID-19-airline-stocks-sell-business-investment.jpg",
      name: "Warren Buffett",
      score: 9.3,
      num_predictions: 3,
      description:
         "American investor, business tycoon, philanthropist, the world's seventh-wealthiest person.",
   }

   let mockDataList = []
   for (let i = 0; i < 10; i++) mockDataList.push(mockData)

   return (
      <div className="App">
         <div className="Navbar">
            <Navbar />
         </div>

         <div className="Cover">
            <Cover />
         </div>

         <div className="TopProphets">
            <TopProphets data={mockDataList} />
         </div>
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
