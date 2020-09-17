import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Navbar from "./components/Navbar/Navbar"
import Cover from "./components/Cover/Cover"
import TopProphets from "./components/TopProphets/TopProphets"
import TopPredictions from "./components/TopPredictions/TopPredictions"
import mockProphetsData from "./lib/mockData"

function App() {

   let mockDataList = []
   for (let i = 0; i < 3; i++) {
      mockDataList.push(mockProphetsData[0])
      mockDataList.push(mockProphetsData[1])
      mockDataList.push(mockProphetsData[2])
      mockDataList.push(mockProphetsData[3])
   }

   return (
      <div className="App">
         <Navbar />
         <Cover />
         <TopProphets data={mockDataList} />
         <TopPredictions />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
