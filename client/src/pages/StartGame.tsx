import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";
import {  MutatingDots } from "react-loader-spinner";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


export default function StartGame() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loader, setLoader] = useState(false);
  

const gameid = params.get("gameid");

  const handleStartGame = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${BackendUrl}/game/startgame`, {
        headers: {
          Authorization: localStorage.getItem("usertoken"),
        },
      });
      console.log(res.data);

      if(res.data.msg  === "game page"){
        navigate(`/game?gameid=${gameid}`);
        setLoader(false);
        
      }else{

        toast.error("Insufficient balance, please top up your account")
      }

      

      
      setLoader(false);
    } catch (error) {
      console.log(error);
    } 
  };
  
  return (
    <div id="gameStartDivv" className="h-screen w-full flex">
      <div className="h-full w-full relative">
        <img
          src="https://img.freepik.com/free-vector/forest-daytime-scene-with-various-forest-plant-tree_1308-58732.jpg?t=st=1720322179~exp=1720325779~hmac=1b1e6c3106ddef3c98cf004024903329cdf167a98b1339df8d32d54b01cecb82&w=1380"
          alt=""
          className=" object-cover w-full h-full absolute bg-no-repeat bg-cover bg-center"
        />
        <div className="flex flex-col relative z-99 h-full w-full top-0 left-0 justify-center items-center">
          {loader ? (
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="black"
              secondaryColor="white"
              radius="20"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>
              <h1 className="font-bold text-[6rem] md:text-[8rem] lg-text-[10rem] text-center text-red-600 text-outline">
                Mango Catcher
              </h1>
              <div className="mt-5 p-2 sm:p-4 rounded-xl border border-black w-max h-[17rem] sm:h-[25rem]">
                <h1 className="text-center text-white font-bold text-outline text-xl sm:text-4xl">
                  Welcome to the Mango Challenge!
                </h1>
                <div className="flex flex-col h-full justify-center items-center ">
                  <ul className="sm:list-decimal font-bold text-md sm:text-lg">
                    <li>
                      You've got 60 seconds to collect as many mangoes as you
                      can.
                    </li>
                    <li>
                      Use the arrow keys {" "}
                      <span className="font-extrabold text-orange-500 text-outline ">
                        *recommended
                      </span>{" "}
                      to move the monkey.
                    </li>
                    <li>You can also use the mouse to move the monkey.</li>
                    <li>Currently available on desktop only!</li>
                  </ul>
                  <div className="flex w-full justify-around">
                    <button
                      className="bg-green-500 px-3 py-2 border border-black rounded-xl w-36 mt-10"
                      onClick={handleStartGame}
                    >
                      Start
                    </button>
                    <button
                      className="bg-green-500 px-3 py-2 border border-black rounded-xl w-36 mt-10"
                      onClick={() => navigate("/games")}
                    >
                      All games
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}
