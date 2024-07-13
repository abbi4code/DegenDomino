import gameovertitle from "../assets/gameovertitle.png"
import gameover from "../assets/gameover.png"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../config";

export default function GameOver() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [HighestScore, setHighestScore] = useState({highest_score: ""})

    const score = params.get("score")
    const gameid = params.get("gameid")

    useEffect(() => {
        const sendScore = async () => {
            const res = await axios.get(`${BackendUrl}/game/gameover?gameid=${gameid}&score=${score}`, {
                headers: {
                    Authorization: localStorage.getItem("usertoken")
                }
            })
            setHighestScore(res.data.highest_score)
            console.log(res.data.highest_score)
        }
        sendScore()
    }, [])


  return (
    <div className="h-screen w-full">
      <div className="h-full w-full relative">
        <img
          src="https://img.freepik.com/free-vector/detailed-jungle-background_52683-62631.jpg?t=st=1720325720~exp=1720329320~hmac=9334c9362271ee0c9ac73d5faa3b88ec22389fe5618bba55a4905b463ddd34b7&w=1060"
          alt=""
          className="object-cover absolute h-full w-full"
        />
        <div className="z-99 text-white/85 relative h-full w-full grid xl:grid-cols-2">
          <div className="flex flex-col justify-center items-center">
            <img src={gameovertitle} alt="" className="w-[500px]" />

            <div className="rounded-xl border border-black p-4 font-custom">
              <h1 className="font-bold text-2xl">
                Your score: <span className="text-blue-800 text-3xl font-extrabold">{score}</span>
              </h1>
              <h1 className="font-bold text-2xl">
                
                Your Highest Score: <span className="text-3xl font-extrabold text-red-600">{HighestScore.highest_score}</span>
              </h1>
              {/* <------ i will put highest score of the entire game----> {with name} */}
              {/* <h1 className="font-bold text-2xl">
                Your score: <span>score</span>
              </h1> */}
              <div className="flex p-5 gap-5">
                <button
                  className="font-extrabold px-3 py-2  bg-yellow-400 text-green-600 text-2xl rounded-xl "
                  onClick={() => {
                    navigate(`/startgame?gameid=${gameid}`);
                  }}
                >
                  Play Again
                </button>
                <button
                  className="font-extrabold px-3 py-2 border border-black  bg-yellow-400 text-green-600 text-2xl rounded-xl"
                  onClick={() => {
                    navigate("/leaderboard");
                  }}
                >
                  Leaderboard
                </button>
              </div>
            </div>
          </div>
          <div className="flex  justify-center items-center max-h-full w-full">
            <img src={gameover} alt="gameOver" className=" hidden xl:max-w-[600px] xl:block  " />
          </div>
        </div>
      </div>
    </div>
  );
}
