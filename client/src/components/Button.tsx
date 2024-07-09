


interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export default function Button({onClick,text,className} : ButtonProps) {
  return (
    <button
      className={
      
        `bg-transparent px-1 py-1 text-[1rem] sm:text-[2rem] sm:px-3 sm:py-2 border border-slate-300 text-white rounded-xl ${className}`
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
