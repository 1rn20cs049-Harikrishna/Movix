

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'
import './style.scss'
import noResults from "../../assets/no-results.png"

import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { fetchDataFromApi } from '../../utils/api'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'



const SearchResult = () => {
  const [data,setData] = useState(null)
  const [pageNum,setpageNum] = useState(1)
  const [loading,setLoading] = useState(false)
  const {query} = useParams()


  const fetchIntialData = ()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then( (res) =>{
      setData(res);
      setpageNum((prev) => prev + 1);
      setLoading(false);
    })
  }

  useEffect( () =>{
    setpageNum(1)
    fetchIntialData();
  },[query])

  const fetchNextPageData =() =>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then( (res) =>{
        if(data?.results) {
          setData({...data,
            results:[...data?.results,...res?.results]});
        }else{
          setData(res);
        }
        setpageNum( (prev) => prev +1);
    })
  }
  
  return (
    <div className='searchResultsPage'>
     {loading && <Spinner initial={true} />}

     {!loading && (
      <ContentWrapper >
        {data?.results.length >0 ? (
         <>

         <div className='pageTitle'>
          {`Search ${data?.total_results > 1 ? "results" : "result" } of "${query}"`}
         </div>

        <InfiniteScroll 
            className='content'
            dataLength={data?.results.length || []}
            next={fetchNextPageData}
            hasMore= {pageNum <= data?.total_pages}
            loader={<Spinner />}
         > 
         {data?.results.map( (item,index) =>{
          if(item.media_type  === "person") return ;
          return (
           <MovieCard  key={index} data={item} fromSearch={true}/>
          )

         })}
        </InfiniteScroll>
         </>

        ): (
          
          <span className='resultNotFound' > 
          Sorry , Results not Found
        </span> )}
      </ContentWrapper>
     )}
    </div>
  )
}

export default SearchResult
