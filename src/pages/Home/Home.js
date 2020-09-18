import React, {useEffect, useState} from "react"
import Cover from "./Cover/Cover"
import TopProphets from "./TopProphets/TopProphets"
import TopPredictions from "./TopPredictions/TopPredictions"
import { mockProphetsData } from "../../lib/mockData"


export const Home = () => {   

   const [mockProphetList, setMockProphetList] = useState([])

   useEffect(() => {
      createData()
   },[])
   
   const createData = () => {
      let prophetData = []
      for (let i = 0; i < 3; i++) {
         prophetData.push(mockProphetsData[0])
         prophetData.push(mockProphetsData[1])
         prophetData.push(mockProphetsData[2])
         prophetData.push(mockProphetsData[3])
         console.log("In for loop")
      }
      console.log("prophetData");
      console.log(prophetData);
      setMockProphetList(prophetData)
   }
   
   return (
      <div className="Home">
         <Cover />
         {console.log("return")}
         {console.log(mockProphetList)}
         <TopProphets data={mockProphetList} />
         <TopPredictions />
      </div>
   )
}
