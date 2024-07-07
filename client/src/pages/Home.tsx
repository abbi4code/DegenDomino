import gamebg from "../assets/homebg.png"

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-full w-full relative">
        <img src={gamebg} alt="bg" className="object-cover h-full w-full absolute" />
        <div className="relative z-20 bg-black/50 w-full h-full">
          
        </div>
      </div>
    </div>
  );
}
