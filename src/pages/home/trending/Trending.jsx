import { useState } from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from "../../../hooks/useFetch"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Carousel from '../../../components/carousel/Carousel'


const Trending = () => {
  const [endpoint,setEndPoint] = useState("day");
  const {data,loading} = useFetch(`/trending/all/${endpoint}`)
  const {results} = data ? data : ""
 
  const onTabChange = (tab)=>{
      setEndPoint(tab === "Day" ? "day" : "week")
    }


  return (
    <div className='carouselSection'>    
         <ContentWrapper>
             <span className='carouselTitle' >Trending</span>
              <SwitchTabs  data={["Day","Week"]} onTabChange={onTabChange} />
         </ContentWrapper>  
          <Carousel  data={results} loading ={loading } />
  </div>
  )
}

export default Trending