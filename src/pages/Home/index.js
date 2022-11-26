import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom' 
import api from '../../serivces/api'
import './home.css'

function Home () {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/movie/now_playing',{
      params:{
        language: 'pt-BR',
        api_key: '075681d71111b09a6aa94162477e44a0',
        pages: 1
      }
    })
    .then( (response) => {
      setFilmes(response.data.results)
      setLoading(false)
  })
    .catch( () => {
      console.log("erro")
  })


  },[])

  if(loading) {
    return (
      <div className='loading'>
        <strong>Carregando filmes...</strong>
      </div>
    )
  }

  return(
    <div className='container'>
      <h2>Filmes Em Destaque</h2>
      {filmes.map( (filme) => {
        return (

         <div className='container-movies' key={filme.id}>

          <Link to={`/filme/${filme.id}`} className='link-custom'>
          <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
          alt={filme.title} />
          </Link>
          
         </div>

        )
      })}
          <footer>
            <label>Copyright &copy; 2022 | Yure Rafael</label>
          </footer>
    </div>
  )
}
export default Home