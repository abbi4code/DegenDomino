import { useEffect, useState } from "react";
import clsx from "clsx";

interface MeteorsProps {
  number?: number;
}

const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: `${Math.floor(Math.random() * window.innerHeight)}px`,
      left: `${Math.floor(Math.random() * window.innerWidth)}px`,
      animationDelay: `${Math.random() * 1 + 0.2}s`,
      animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="absolute inset-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={clsx(
            "pointer-events-none absolute h-1 w-1 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] animate-meteor"
          )}
          style={style}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
