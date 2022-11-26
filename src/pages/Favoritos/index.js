import './favoritos.css'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

function Favoritos() {
    const [movies, setMovies] = useState([])

    useEffect (()=> {
        const myList = localStorage.getItem("@primeflix")
        setMovies(JSON.parse(myList) || [] )
    },[])

    function deletemovie (id) {
        let filterMovies = movies.filter( (item)=> {
            return(item.id !== id)
        })
        setMovies(filterMovies)
        localStorage.setItem("@primeflix",JSON.stringify(filterMovies))
        toast.success("Filme Removido Com Sucesso")
    }
    
    return(
     <div className='movies'>
        <h2>Meus Filmes</h2>
        {movies.length === 0 && <h3>Você Não Possui Filmes Salvos</h3>}
        <ul>
        {movies.map( (item)=> { 
          return(
            <>
            <li key={item.id}>
              <span>{item.title}</span>
              <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
              <button onClick={() => deletemovie(item.id)}>Excluir</button>
            </li>
            <hr/>
            </>
          )
        } )}
        </ul>
     </div>
        
    )
}
export default Favoritos