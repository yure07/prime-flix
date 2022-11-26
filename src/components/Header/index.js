import { Link } from 'react-router-dom'
import './header.css'

function Header () {
    return(
    <header>
     <Link to="/" className='home'>Prime Flix</Link>
     <Link to="/favoritos" className='filmes'>Meus Filmes</Link>
    </header>
    )
}
export default Header