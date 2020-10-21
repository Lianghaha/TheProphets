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
import { checkLogin } from "./lib/utils"
// import axios from "axios"
require("dotenv").config()

function App() {
   const [showPageLoading, setShowPageLoading] = useState(false)
   const [loggedIn, setLoggedIn] = useState(false)

   const checkUserLogin = async () => {
      setLoggedIn(await checkLogin())
   }

   useEffect(() => {
      checkUserLogin()
   }, [])

   useEffect(() => {
      // axios
      //    .get("/api/test")
      //    .then((response) => {
      //       console.log("Test Api:")
      //       console.log(response.data.test)
      //    })
      //    .catch((err) => console.log(err))
   }, [])

   return (
      <Router>
         <div className="App">
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Spin size="large" spinning={showPageLoading}>
               {showPageLoading ? <div className="LoadingBG"></div> : ""}
               <Switch>
                  <Route
                     path="/prophetDetail/:id"
                     render={(match) => (
                        <ProphetDetail
                           prophetID={match.match.params.id}
                           setShowPageLoading={setShowPageLoading}
                        />
                     )}
                  />
                  <Route
                     path="/predictionDetail/:id"
                     render={(match) => (
                        <PredictionDetail
                           predictionID={match.match.params.id}
                           setShowPageLoading={setShowPageLoading}
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
                        <Search
                           input={match.match.params.input}
                           showProphets={true}
                        />
                     )}
                  />
                  <Route
                     path="/search/"
                     render={() => <Search showProphets={true} />}
                  />
                  <Route
                     path="/signup"
                     render={() => <SignUp setLoggedIn={setLoggedIn} />}
                  />
                  <Route
                     path="/login"
                     render={() => <Login setLoggedIn={setLoggedIn} />}
                  />
                  <Route
                     path="/"
                     exact
                     render={() => (
                        <Home setShowPageLoading={setShowPageLoading} />
                     )}
                  />
                  <Route path="/" component={NotFound} />
               </Switch>

               {/* )} */}
            </Spin>
         </div>
      </Router>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
