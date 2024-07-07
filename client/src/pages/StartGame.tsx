import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StartGame() {
    const navigate = useNavigate()
  return (
    <div id="gameStartDivv" className="h-screen w-full flex">
      <div className="h-full w-full relative">
        <img
          src="https://img.freepik.com/free-vector/forest-daytime-scene-with-various-forest-plant-tree_1308-58732.jpg?t=st=1720322179~exp=1720325779~hmac=1b1e6c3106ddef3c98cf004024903329cdf167a98b1339df8d32d54b01cecb82&w=1380"
          alt=""
          className="object-cover w-full h-full absolute"
        />
        <div className="flex flex-col relative z-99 h-full w-full top-0 left-0 justify-center items-center">
          <h1 className="font-bold text-[10rem] text-center text-red-600 text-outline">
            Apple Catcher
          </h1>
          <div className="mt-5 p-4 rounded-xl border border-black w-max h-max">
            <h1 className="text-center text-white font-bold text-outline text-4xl">
              Welcome to the Apple Challenge!
            </h1>
            <div className="flex flex-col justify-center items-center mt-10 ">
              <ul className="list-decimal font-bold text-lg">
                <li>
                  You've got 60 seconds to master the art of apple catching.
                </li>
                <li>Catch more than 45 apples, and victory will be yours!</li>
                <li>Fall short of 45, and face the sweet taste of defeat.</li>
                <li>
                  Click the start button to embark on this fruity adventure!
                </li>
              </ul>
              <button
                // id="gameStartBtn"
                className="bg-green-500 px-3 py-2 border border-black rounded-xl w-36 mt-10"
                onClick={()=>{
                    navigate('/game')
                }}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
