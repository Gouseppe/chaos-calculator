import { set } from "astro:schema";
import { useState, useRef, useEffect } from "react";

// ...existing code...
type Props = {
  maxData: number;
};

const Characters = ["Amir", "Beryl", "Cassius"];

export const CharacterData: React.FC<Props> = ({ maxData = 130 }) => {
  const [character, setCharacter] = useState("");
  const [neutralCount, setNeutralCount] = useState(0);
  const [data, setData] = useState(0);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Cerrar dropdown al hacer clic fuera o presionar Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);
  useEffect(() => {
    if (data > maxData) {
      alert("Has alcanzado el límite de datos");
    }
  }, [data]);

  const handleClickNeutralCard = () => {
    setNeutralCount(neutralCount + 1);
    setData(data + 20);
  };

  return (
    <div className="flex flex-col max-w-[33%]" ref={containerRef}>
      <div>
        <div>
          <button
            id="dropdownDefaultButton"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="dropdown"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none gap-1"
            type="button"
          >
            {character && (
              <img
                className="w-12 h-12 rounded"
                src={`/character-chaos/${character}/show.png`}
                alt="algo"
              />
            )}
            {!character && <div className="w-4 h-4 rounded bg-white"></div>}
            <span className="mr-2">{character || "escoje el personaje"}</span>
            <svg
              className="w-4 h-4 ms-1.5 -me-0.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              open ? "absolute" : "hidden"
            } bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 `}
            role="menu"
          >
            <ul
              className="p-2 text-sm text-body font-medium bg-black"
              aria-labelledby="dropdownDefaultButton"
            >
              {Characters.map((char) => (
                <li key={char}>
                  <button
                    onClick={() => {
                      setCharacter(char);
                      setOpen(false);
                    }}
                    role="menuitem"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    {char}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded border border-green-400 bg-green-400">
          {data} / {maxData}
        </div>
      </div>
      <div>
        {/* las cartas basicas */}
        <div className="flex flex-row gap-0.5 flex-wrap">
          {character &&
            Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <img
                    src={`/character-chaos/${character}/${i + 1}.png`}
                    alt={`${character} ${i + 1}`}
                    className="w-20 "
                  />
                </div>
              ))}
        </div>
        {/* el boton de arriba es para quitar cartas neutras */}
        <div className=" flex flex-row gap-0.5 flex-wrap">
          {Array(neutralCount)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-20 h-[120px] rounded bg-white hover:bg-red-300 transition"
                onClick={() => setNeutralCount(neutralCount - 1)}
              ></div>
            ))}
        </div>
        {/* el boton de abajo es para agregar cartas neutras */}
        <button
          className="w-full rounded-b-lg"
          onClick={handleClickNeutralCard}
        >
          agregar carta neutral
        </button>
      </div>
    </div>
  );
};
