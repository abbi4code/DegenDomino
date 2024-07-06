

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Leaderboard from './pages/Leaderboard'
import Games from './pages/Games'
import Home from './pages/Home'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/games' element={<Games/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
