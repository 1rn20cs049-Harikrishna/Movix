import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route,  Routes } from "react-router-dom";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from "./pages/home/Home";
import Details from './pages/details/Details';
import SearchResult  from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';





function App() {
    const dispatch =  useDispatch();
    const {url} = useSelector((state) => state.home);
    
  useEffect( ()=>{
    fetchApiConfig();
    genreCall();
  },[]);

  const fetchApiConfig = ()=>{
     fetchDataFromApi('/configuration')
    .then(response =>{
           const url = {
            backdrop:response.images.secure_base_url+"original",
            poster:response.images.secure_base_url+"original",
            profile:response.images.secure_base_url+"original",
      }


      dispatch(getApiConfiguration(url));
     
    })
  }


  const genreCall =async  ()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenre = {}

    endPoints.forEach( (url) =>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await  Promise.all(promises);


    data.map( ({genres}) =>{
          return genres.map( (item) =>{
        {allGenre[item.id] = item}
       })
      
    });
   dispatch(getGenres(allGenre));
  }

  return ( 
      <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/" Component={Home} />
        <Route path="/:mediaType/:id" Component={Details} />
        <Route path="/search/:query" Component={SearchResult} />
        <Route path="/explore/:mediaType" Component={Explore} />
        <Route path="*" Component={PageNotFound} />
       </Routes>
       <Footer />

      </BrowserRouter>
 
  );
}

export default App
