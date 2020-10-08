import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "./lib/common.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar } from "./lib/components/Navbar/Navbar"
import { Home } from "./pages/Home/Home"
import { NotFound } from "./pages/NotFound/NotFound"
import { Search } from "./pages/Search/Search"
import { ProphetDetail } from "./pages/Detail/ProphetDetail"
import { PredictionDetail } from "./pages/Detail/PredictionDetail"
import { SignUp } from "./pages/Auth/SignUp"
import { Login } from "./pages/Auth/Login"
import { Spin } from "antd"
import axios from "axios"
require("dotenv").config()

function App() {
   const [showLoading, setShowLoading] = useState(false)

   useEffect(() => {
      axios
         .get("/api/test")
         .then((response) => {
            console.log("Test Api:")
            console.log(response)
         })
         .catch((err) => console.log(err))
   }, [])

   return (
      <Router>
         <div className="App">
            <Navbar setShowLoading={setShowLoading} />
            <Spin size="large" spinning={showLoading}>
               {showLoading ? (
                  <div className="LoadingBG"></div>
               ) : (
                  <Switch>
                     <Route
                        path="/prophetDetail/:id"
                        render={(match) => (
                           <ProphetDetail prophetID={match.match.params.id} />
                        )}
                     />
                     <Route
                        path="/predictionDetail/:id"
                        render={(match) => (
                           <PredictionDetail
                              predictionID={match.match.params.id}
                           />
                        )}
                     />
                     <Route
                        path="/prophets"
                        exact
                        render={() => <Search showProphets={true} />}
                     />
                     <Route
                        path="/predictions"
                        exact
                        render={() => <Search showProphets={false} />}
                     />
                     <Route
                        path="/search/:input"
                        render={(match) => (
                           <Search input={match.match.params.input} />
                        )}
                     />
                     <Route
                        path="/search/"
                        render={() => <Search showProphets={true} />}
                     />
                     <Route path="/signup" render={() => <SignUp />} />
                     <Route path="/login" render={() => <Login />} />
                     {/* <Route
                        path="/test"
                        render={() => (
                           <div>
                              <img src={testImg} alt="testImg" />
                           </div>
                        )}
                     /> */}
                     <Route path="/" exact component={Home} />
                     <Route path="/" component={NotFound} />
                  </Switch>
               )}
            </Spin>
         </div>
      </Router>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
