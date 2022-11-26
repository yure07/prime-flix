import {useEffect, useState,} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import api from '../../serivces/api'
import './details.css'

function Filme () {
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    async function loadmovies() {
      await api.get(`/movie/${id}`, {
        params:{
        language: 'pt-BR',
        api_key: '075681d71111b09a6aa94162477e44a0',
        }
      })
      .then((response) =>{
        setMovies(response.data)
        console.log(response.data)
        setLoading(false)
      })
      .catch(()=>{
        navigate("/", {replace:true})
      })
    }
    loadmovies()
  },[navigate, id])

  function saveMovie() {
    const mylist = localStorage.getItem("@primeflix");
    
    let moviesSaved = JSON.parse(mylist) || [];
    
    const hasMovies = moviesSaved.some( (moviesSaved )=> moviesSaved.id === movies.id);
    
    if(hasMovies) {
      toast.warn("Esse Filme Já Está Na Lista");
      return;
    }
    moviesSaved.push(movies);
    localStorage.setItem("@primeflix", JSON.stringify(moviesSaved));
    toast.success("Esse Filme Foi Salvo");
  }

  if(loading) {
    return(
    <div className='load-movies'>
      <h2>Carregando Detalhes...</h2>
    </div>
    )
  }

  return(
  <div className='load-movies'> 
     <h1>{movies.title}</h1>
     <img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} 
     alt={movies.title}/>
     <h3>Sinopse</h3>
     <span>{movies.overview}</span>
     <strong>Avaliação {movies.vote_average.toFixed(1)} / 10</strong>
     
    <div className='buttons'>
     <button onClick={saveMovie}>Salvar</button>
     <button>
      <a href={`https://youtube.com/results?search_query=${movies.title} Trailer`}
      target="blank"> Trailer </a> 
     </button>
    </div>
  </div> 
    )
  }
  export default Filme