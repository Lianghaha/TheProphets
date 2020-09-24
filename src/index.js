import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./lib/components/Navbar/Navbar"
import { Home } from "./pages/Home/Home"
import { Search } from "./pages/Search/Search"
import ProphetDetail from "./pages/ProphetDetail/ProphetDetail"

function App() {
   return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch>
               <Route
                  path="/prophetDetail/:id"
                  render={(match) => <ProphetDetail match={match} />}
               />
               <Route
                  path="/predictionDetail/:id"
                  render={(match) => <Search match={match} />}
               />
               <Route
                  path="/Prophets"
                  exact
                  render={() => (
                     <Search showProphets={true} showPredictions={false} />
                  )}
               />
               <Route
                  path="/Predictions"
                  exact
                  render={() => (
                     <Search showProphets={false} showPredictions={true} />
                  )}
               />
               <Route
                  path="/Search/:input"
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
         </div>
      </Router>
   )
}

ReactDOM.render(<App />, document.getElementById("root"))
