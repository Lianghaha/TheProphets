import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "./lib/common.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar } from "./lib/components/Navbar/Navbar"
import { Home } from "./pages/Home/Home"
import { Search } from "./pages/Search/Search"
import { ProphetDetail } from "./pages/ProphetDetail/ProphetDetail"
import { PredictionDetail } from "./pages/PredictionDetail/PredictionDetail"
import { Spin } from "antd"
import axios from "axios"

function App() {
   const [showLoading, setShowLoading] = useState(false)
   const [testImg, setTestImg] = useState("")

   const loadingTrue = () => {
      setShowLoading(true)
   }

   const loadingFalse = () => {
      setTimeout(() => {
         setShowLoading(false)
      }, 1000)
   }

   useEffect(() => {
      axios
         .get("/test")
         .then((response) => {
            console.log("Test Image:")
            console.log(response.data[0].img)
            setTestImg(response.data[0].img)
         })
         .catch(err => console.log(err))
   }, [])

   return (
      <Router>
         <div className="App">
            <Navbar loadingTrue={loadingTrue} loadingFalse={loadingFalse} />
            <Spin size="large" spinning={showLoading}>
               <Switch>
                  <Route
                     path="/prophetDetail/:id"
                     render={(match) => <ProphetDetail match={match} />}
                  />
                  <Route
                     path="/predictionDetail/:id"
                     render={(match) => <PredictionDetail match={match} />}
                  />
                  <Route
                     path="/prophets"
                     exact
                     render={() => (
                        <Search showProphets={true} showPredictions={false} />
                     )}
                  />
                  <Route
                     path="/predictions"
                     exact
                     render={() => (
                        <Search showProphets={false} showPredictions={true} />
                     )}
                  />
                  <Route
                     path="/search/:input"
                     render={(match) => (
                        <Search
                           showProphets={true}
                           showPredictions={false}
                           match={match}
                        />
                     )}
                  />
                  <Route
                     path="/testImg"
                     render={() => (
                        <div>
                           <img src={testImg} alt="testImg" />
                        </div>
                     )}
                  />
                  <Route path="/" component={Home} />
               </Switch>
            </Spin>
         </div>
      </Router>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
