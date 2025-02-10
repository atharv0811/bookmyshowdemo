import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/home"
import MovieDetails from "./pages/movie-details"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
