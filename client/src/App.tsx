import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import StartGame from "./pages/StartGame";
import Admin from "./admin/admin";
import PostGames from "./admin/PostGames";
import PrivateRoute from "./pages/TokenValidate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/leaderboard"
          element={<PrivateRoute element={Leaderboard} />}
        />
        <Route path="/games" element={<PrivateRoute element={Games} />} />
        <Route path="/game" element={<PrivateRoute element={Game} />} />
        <Route path="/gameover" element={<PrivateRoute element={GameOver} />} />
        <Route
          path="/startgame"
          element={<PrivateRoute element={StartGame} />}
        />
        <Route path="/admin" element={<PrivateRoute element={Admin} />} />
        <Route
          path="/postgames"
          element={<PrivateRoute element={PostGames} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
