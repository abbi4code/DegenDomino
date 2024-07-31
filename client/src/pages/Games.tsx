import { TextGenerateEffect } from "../components/aceui/textani";
import { CardBody, CardContainer, CardItem } from "../components/aceui/Card";
import applebg from "../assets/applebgpng-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendUrl } from "../config";
import { useEffect, useState } from "react";
import { cn } from "../components/utils/cn";
import Button from "../components/Button";

interface gameprops {
  title: string;
  description: string;
  createdAt?: Date;
  id: string;
  tokenreq?: integer;
}

export default function Games() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const getAllgames = async () => {
      setloader(true);
      const token = localStorage.getItem("usertoken");
      const res = await axios.get(`${BackendUrl}/game/allgames`, {
        headers: {
          Authorization: token,
        },
      });
      setGames(res.data.game);
      setloader(false);
      console.log("hi there from here", res.data.game);
      console.log("games for gun", games);
    };
    getAllgames();
  }, []);

  const handleClick = async (id: any) => {
    const gameid = id;
    const res = await axios.get(`${BackendUrl}/game/allgames`, {
      headers: {
        Authorization: localStorage.getItem("usertoken"),
      },
    });
    console.log(res.data);

    navigate(`/startgame?gameid=${gameid}`);
  };

  return (
    <div className="min-h-screen w-full">
      {/* <button className="p-4 rounded-xl border border-black" onClick={getAllgames}>click</button> */}
      <div className="min-h-screen w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="h-full w-full text-white relative">
          <div className="flex justify-center flex-col items-center h-full w-full">
            <Navbar className="mb-4 w-max bg-transparent text-2xl font-bold z-99999 " />
            <TextGenerateEffect
              words={"All games available for now"}
              className="mt-32 font-extrabold text-4xl md:text-6xl text-center"
            />
            {loader ? (
              <div className="flex justify-center font-bold text-6xl items-center h-screen w-full">
                {" "}
                Games loading ...
              </div>
            ) : (
              <div className="flex ">
                {games.map((game: gameprops, id) => (
                  <CardContainer
                    className="inter-var flex flex-col items-center justify-center w-full"
                    key={id}
                  >
                    {/* <-------for now only apple game added------> {maybe later i will add more} */}
                    <CardBody
                      className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-[25rem] sm:w-[30rem] h-auto rounded-xl p-6 border cursor-pointer  "
                      //@ts-ignore
                      onClick={() => handleClick(game.id)}
                    >
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {game.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {game.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-1">
                        <Image
                          src={applebg}
                          className="h-100 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// for now removed lampcontainer add it later (keeping simple bg for now)

interface imgaeprops {
  src: string;
  className: string;
  alt: string;
}

export function Image({ src, className, alt }: imgaeprops) {
  return <img src={src} alt={alt} className={className} />;
}

function Navbar({ className }: { className?: string }) {
  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [tokenbalance, setTokenbalance] = useState(0);

  useEffect(() => {
    async function balances() {
      const res = await axios.get(`${BackendUrl}/game/allbalance`, {
        headers: {
          Authorization: token,
        },
      });
      setBalance(res.data.balance);
      setTokenbalance(res.data.tokenbalance);
      console.log(res.data);
    }
    balances();
  }, []);

  return (
    <div
      className={cn(
        "fixed top-10 w-max bg-transparent inset-x-0 max-w-2xl mx-auto z-50 flex gap-3 border rounded-xl p-3 justify-center items-center border-white",
        className
      )}
    >
      <Button
        onClick={() => {
          navigate("/");
        }}
        text={`Home`}
        className={""}
      />

      {/* <Button
        onClick={() => {
          if (!token) {
            navigate("/signin");
          } else {
            navigate("/allgames");
          }
        }}
        text={`Token Balance: ${tokenbalance}`}
        className={`${tokenbalance > 20 ? "text-green-500" : "text-red-500"}`}
      /> */}
      <div className="bg-transparent px-1 py-1 text-[1rem] sm:text-[2rem] sm:px-3 sm:py-2 border border-slate-300 text-white rounded-xl ">
        Token Balance:{" "}
        <span
          className={`${tokenbalance > 20 ? "text-green-500" : "text-red-500"}`}
        >
          {tokenbalance}
        </span>
      </div>
      <div className="bg-transparent px-1 py-1 text-[1rem] sm:text-[2rem] sm:px-3 sm:py-2 border border-slate-300 text-white rounded-xl ">
        Balance:{" "}
        <span className={`${balance > 20 ? "text-green-500" : "text-red-500"}`}>
          {balance}
        </span>
      </div>
    </div>
  );
}
