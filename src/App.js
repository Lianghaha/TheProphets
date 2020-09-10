import React from 'react';
import './App.css';
import { VscFoldDown } from 'react-icons/vsc'

function App() {
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
              <VscFoldDown color="white" size="2em" />
           </div>
        </div>
        <div className="clear-float-div-common"></div>



        <div className="ProphetsList">
          <h2>Top Prophets</h2>
        </div>
     </div>
  )
}

export default App;
