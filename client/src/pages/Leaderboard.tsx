
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from '../components/aceui/herosection';
import { BorderBeam } from '../components/ui/movborder';

export default function Leaderboard() {
  return (
    <div className="h-screen w-full bg-black">
      <div className="h-full w-full relative flex flex-col">
        <HeroHighlight className="w-full h-screen">
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
        </HeroHighlight>
        {/* <div className="absolute flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Border Beam
          </span>
          
        </div> */}
        <div className="w-max min-h-20 text-white absolute">
          <h1 className="font-bold text-6xl">how rea tou</h1>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </div>
    </div>
  );
}
