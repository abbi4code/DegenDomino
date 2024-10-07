import gamebg from "../assets/homebg.png";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/aceui/herosection";
import { useNavigate } from "react-router-dom";
import { TextGenerateEffect } from "../components/aceui/textani";
import { cn } from "../components/utils/cn";

import Button from "../components/Button";
export default function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("usertoken");

  const handleClick = () => {
    if (token) {
      navigate("/games");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div className="h-full w-full relative">
        <img
          src={gamebg}
          alt="bg"
          className="object-cover h-full w-full absolute"
        />
        <div className="relative z-20 bg-black/90 w-full h-full flex flex-col justify-center  gap-0">
          <Navbar
            className="absolute top-10 bg-transparent text-2xl font-bold"
            onClick={handleClick}
          />
          <TextGenerateEffect
            words={"Degen Domino"}
            className="text-center mt-20  text-[4rem] sm:text-[7rem] font-bold lg:text-[10rem] selection:text-yellow-500 selection:bg-black"
          />

          <HeroHighlight>
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
              className="text-2xl sm:text-4xl  lg:text-6xl font-bold text-white max-w-4xl  leading-relaxed lg:leading-snug text-center "
            >
              Unleash Your Inner Gamer: <br className="" /> The
              Battlefield Awaits <br />
              <Highlight
                className="text-[#f7f2e8] cursor-pointer"
                onClick={handleClick}
              >
                Go Hard or Go Home
              </Highlight>
            </motion.h1>
          </HeroHighlight>
        </div>
      </div>
    </div>
  );
}

function Navbar({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "fixed top-10 w-max bg-transparent inset-x-0 max-w-2xl mx-auto z-50 flex gap-3 border rounded-full px-3 py-1 justify-center items-center border-white",
        className
      )}
    >
      <Button onClick={onClick} text={token ? "AllGames" : "Signin"} className="border-none"/>
      <Button
        onClick={() => {
          if (!token) {
            navigate("/signin");
          } else {
            navigate("/leaderboard");
          }
        }}
        text={"Leaderboard"}
        className="text-sm border-none"
      />
      <Button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        text={token ? "Signout" : ""}
        className={token ? "border-none" : "hidden"}
      />
    </div>
  );
}
