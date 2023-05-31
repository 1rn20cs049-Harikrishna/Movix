import { useState } from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from "../../../hooks/useFetch"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Carousel from '../../../components/carousel/Carousel'


const Popular = () => {
  const [endpoint,setEndPoint] = useState("movie");
  const {data,loading} = useFetch(`/${endpoint}/popular`)
  const {results} = data ? data : ""
 
  const onTabChange = (tab)=>{
      setEndPoint(tab === "Movies" ? "movie" : "tv")
    }


  return (
    <div className='carouselSection'>    
         <ContentWrapper>
             <span className='carouselTitle' >What's Popular</span>
              <SwitchTabs  data={["Movies","TV Shows"]} onTabChange={onTabChange} />
         </ContentWrapper>  
          <Carousel 
                data={results} 
                loading ={loading } 
                endpoint={endpoint}
           />
  </div>
  )
}

export default Popular
