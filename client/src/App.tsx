

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Leaderboard from './pages/Leaderboard'
import Games from './pages/Games'
import Home from './pages/Home'
import Game from './pages/Game'
import GameOver from './pages/GameOver'
import StartGame from './pages/StartGame'
import Admin from './admin/admin'
import PostGames from './admin/PostGames'

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
      <Route path='/game' element={<Game/>}/>
      <Route path='/gameover' element={<GameOver/>}/>
      <Route path='/startgame' element={<StartGame/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/postgames' element={<PostGames/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
