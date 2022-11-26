import axios from 'axios'
// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=075681d71111b09a6aa94162477e44a0

const api = axios.create( {
    baseURL: 'https://api.themoviedb.org/3'
})
export default api
