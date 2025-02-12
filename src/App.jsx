import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/home"
import MovieDetails from "./pages/movie-details"
import SeatSelection from "./pages/seat-selection"
import Cart from "./pages/cart"
import { useState } from "react"

function App() {
  const [cartLength, setCartLength] = useState(0)

  return (
    <BrowserRouter>
      <Layout cartLength={cartLength}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<MovieDetails />} />
          <Route path="/:id/seat-selection" element={<SeatSelection />} />
          <Route path="/cart" element={<Cart setCartLength={setCartLength} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
