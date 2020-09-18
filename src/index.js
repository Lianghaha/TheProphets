import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./lib/components/Navbar/Navbar"
import { Home } from "./pages/Home/Home"



function App() {
   return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch>
               <Route path="/Prophets" exact component={Prophets} />
               <Route path="/" component={Home} />
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



ReactDOM.render(<App />, document.getElementById("root"))
