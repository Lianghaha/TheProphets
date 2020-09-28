import React, { useState } from "react"
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

function App() {
   const [showLoading, setShowLoading] = useState(false)

   const loadingToogle = () => {
      setShowLoading(!showLoading)
   }

   return (
      <Router>
         <div className="App">
            <Navbar test={loadingToogle}/>
            <Spin size="large" spinning={showLoading}>
               <Switch>
                  <Route
                     path="/prophetDetail/:id"
                     render={(match) => <ProphetDetail match={match} 
                     />}
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
                  <Route path="/" component={Home} />
               </Switch>
            </Spin>
         </div>
      </Router>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
