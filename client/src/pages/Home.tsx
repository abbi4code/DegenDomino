import gamebg from "../assets/homebg.png"
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/aceui/herosection";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate()


  const handleClick = () =>{
      navigate('/games')

  }


  return (
    <div className="h-screen w-full">
      <div className="h-full w-full relative">
        <img
          src={gamebg}
          alt="bg"
          className="object-cover h-full w-full absolute"
        />
        <div className="relative z-20 bg-black/90 w-full h-full">
        
          <HeroHighlight onClick={handleClick}>
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
              className="text-2xl px-4 md:text-4xl lg:text-6xl font-bold text-neutral-700 dark:text-white max-w-4xl  leading-relaxed lg:leading-snug text-center mx-auto "
            >
              Unleash Your Inner Gamer: <br /> The Battlefield Awaits <br />
              <Highlight className="text-[#f7f2e8] cursor-pointer">
                Go Hard or Go Home
              </Highlight>
            </motion.h1>
          </HeroHighlight>
        </div>
      </div>
    </div>
  );
}
