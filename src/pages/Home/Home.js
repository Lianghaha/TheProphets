import React, {useEffect, useState} from "react"
import Cover from "./Cover/Cover"
import TopProphets from "./TopProphets/TopProphets"
import TopPredictions from "./TopPredictions/TopPredictions"
import mockProphetsData from "../../lib/mockData"


export const Home = () => {   

   const [mockDataList, setMockDataList] = useState([])

   useEffect(() => {
      createData()
   },[])
   
   const createData = () => {
      let data = []
      for (let i = 0; i < 3; i++) {
         data.push(mockProphetsData[0])
         data.push(mockProphetsData[1])
         data.push(mockProphetsData[2])
         data.push(mockProphetsData[3])
         console.log("In for loop")
      }
      console.log("data");
      console.log(data);
      setMockDataList(data)
   }
   
   return (
      <div className="Home">
         <Cover />
         {console.log("return")}
         {console.log(mockDataList)}
         <TopProphets data={mockDataList} />
         <TopPredictions />
      </div>
   )
}
