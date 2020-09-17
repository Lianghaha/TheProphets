import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

import Cover from "./components/Cover/Cover"
import TopProphets from "./components/TopProphets/TopProphets"
import TopPredictions from "./components/TopPredictions/TopPredictions"
import mockProphetsData from "./lib/mockData"

function App() {
   return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/Prophets" exact component={Prophets} />
            </Switch>
         </div>
      </Router>
   )
}

const Prophets = () => {
   return (
      <div style={{color: "white"}}>Prophets Page</div>
   )
}

const Home = () => {
   let mockDataList = []
   for (let i = 0; i < 3; i++) {
      mockDataList.push(mockProphetsData[0])
      mockDataList.push(mockProphetsData[1])
      mockDataList.push(mockProphetsData[2])
      mockDataList.push(mockProphetsData[3])
   }
   return (
      <div className="Home">
         <Cover />
         <TopProphets data={mockDataList} />
         <TopPredictions />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
