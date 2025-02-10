import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;

createRoot(document.getElementById('root')).render(
  <App />
)
