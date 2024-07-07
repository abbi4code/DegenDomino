
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '../components/aceui/herosection';
import { BorderBeam } from '../components/ui/movborder';

export default function Leaderboard() {
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
          <div className="min-w-[40rem] h-max border mt-20 text-white border-white rounded-xl font-bold text-5xl flex justify-center items-center">
            <h1>hi there</h1>
          </div>
        </HeroHighlight>

        {/* NOT including it for now creating css bugs */}
        {/* <div className="w-max h-max  text-white absolute overflow-hidden top-[20%] ">
          <div className="min-w-[80rem] h-[40rem]">
            hi there
            <div>hi there one agains</div>
          </div>
          <BorderBeam size={250} duration={12} delay={9} />
        </div> */}
      </div>
    </div>
  );
}
