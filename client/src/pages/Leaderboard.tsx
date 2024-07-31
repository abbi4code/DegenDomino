
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '../components/aceui/herosection';
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../config";




export default function Leaderboard() {

  const [scoresInfo, setScoresInfo] = useState([])
  useEffect(() => {
    const leaderboardData = async () => {
      const token = await localStorage.getItem("usertoken");
      const res = await axios.get(`${BackendUrl}/game/bulk`, {
        headers: {
          Authorization: token,
        },
      });
      const top10 = res.data.players.slice(0, 10);
      setScoresInfo(top10)
      console.log(res.data.players);
    };

    leaderboardData();
  }, []);
  return (
    <div className="h-screen w-full bg-black flex flex-col justify-center items-center">
      <div className="h-full w-full relative flex flex-col ">
        <HeroHighlight className="w-full h-screen flex flex-col justify-center items-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-6xl font-bold text-neutral-700 text-center mt-10 dark:text-white max-w-4xl  leading-relaxed lg:leading-snug  mx-auto "
          >
            <Highlight
              className="text-white cursor-pointer text-center  "
              //@ts-ignore
              key={true}
            >
              LeaderBoard
            </Highlight>
          </motion.h1>
          <div className="min-w-[2rem] sm:min-w-[30rem] lg:min-w-[40rem] h-max border mt-10 lg:mt-20 p-4 text-white border-white rounded-xl font-bold text-3xl sm:text-5xl flex justify-center items-center">
            {/* <h1>Coming Soon ... ✌️😊</h1> */}
            <div className="w-full h-max  flex flex-col justify-between items-center gap-y-4">
              {scoresInfo.map((score: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <div
                      className={`flex flex-row justify-between w-full h-full  ${
                        index === 0
                          ? "text-[#C9B037]"
                          : index === 1
                          ? "text-[#D7D7D7]"
                          : index === 2
                          ? "text-[#6A3805]"
                          : "text-white/30"
                      }`}
                    >
                      <h1>{`${index + 1}.`}</h1>
                      <div className="w-full flex justify-center items-center ml-10 xs:mr-5">
                        <h1 className=" w-full ">{score.full_name}</h1>
                      </div>
                      <h1>{score.highest_score}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </HeroHighlight>
      </div>
    </div>
  );
}
