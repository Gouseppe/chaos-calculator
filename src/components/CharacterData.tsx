import { set } from "astro:schema";
import { useState, useRef, useEffect } from "react";
import {NeutralCalculate} from "./NeutralCalculate";

// ...existing code...
type Props = {
  maxData: number;
};

const Characters = ["Amir", "Beryl", "Cassius", "Veronica"];

export const CharacterData: React.FC<Props> = ({ maxData = 130 }) => {
  const [character, setCharacter] = useState("");
  const [cardsArray, setCardsArray] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [data, setData] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [ArrayNeutralCard, setArrayNeutralCard] = useState<number[]>([]);
  const [removeCount, setRemoveCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [arrayRemoveCard, setArrayRemoveCard] = useState<number[]>([]);
  const [divineArray, setDivineArray] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [activeDivine, setActiveDivine] = useState<number[]>([]);
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

  function reset() {
    setData(0);
    setNeutralCount(0);
    setRemoveCount(0);
    setArrayRemoveCard([]);
    setDuplicateCount(0);
    setDivineArray([]);
    setActiveDivine([]);
    setCardsArray([0, 1, 2, 3, 4, 5, 6, 7]);
  };



  function handleClickRemoveCard() {
    const removeCountAux = removeCount + 1;
    setRemoveCount(removeCount + 1);
    setData((data) => data + 20);
    if (removeCountAux == 2) {
      setData((data) => data + 10);
    } else if (removeCountAux == 3) {
      setData((data) => data + 30);
    } else if (removeCountAux == 4) {
      setData((data) => data + 50);
    } else if (removeCountAux >= 5) {
      setData((data) => data + 70);
    }
  };

  function saveRemoveCard(index: number) {
    setArrayRemoveCard([...arrayRemoveCard, index]);
    if (divineArray.includes(index)) {
      setData((data) => data - 20);
      const newActiveDivine = activeDivine.filter((i) => i !== index);
      setActiveDivine(newActiveDivine);
      const newDivineArray = divineArray.filter((i) => i !== index);
      setDivineArray(newDivineArray);
    }
  };
  /*
  1: 20 
  2: 50
  3: 100
  4: 170
  5: 260
  */
  function handleClickConvertCard(index: number) {
    setData((data) => data + 30);
    setNeutralCount(neutralCount + 1);
    setArrayNeutralCard([...ArrayNeutralCard, neutralCount]);
  };

  function handleClickDuplicateCard(index: number) {
    const duplicateCountAux = duplicateCount + 1;
    setDuplicateCount(duplicateCount + 1);
    if (duplicateCountAux == 2) {
      setData((data) => data + 10);
    } else if (duplicateCountAux == 3) {
      setData((data) => data + 30);
    } else if (duplicateCountAux == 4) {
      setData((data) => data + 50);
    } else if (duplicateCountAux >= 5) {
      setData((data) => data + 70);
    }
  };

  function handleClickAddCard(card: number, index: number) {
    setCardsArray([...cardsArray.slice(0, index), card, ...cardsArray.slice(index)]);
    if (divineArray.includes(index)) {
      setData((data) => data + 20);
      setActiveDivine((activeDivine) => [...activeDivine, index + 1]);
      setDivineArray((divineArray) => [...divineArray, index + 1]);
    }
  };

  function toggleDivineActive(index: number) {
    setActiveDivine((activeDivine) => (activeDivine.includes(index) ? activeDivine.filter((i) => i !== index) : [...activeDivine, index]));
  }

  function handleClickDivineCard(index: number) {
    if (divineArray.includes(index)) {
      setActiveDivine((prev) => prev.filter((i) => i !== index));
      setDivineArray((prev) => prev.filter((i) => i !== index));
      setData((data) => data - 20);
    } else {
      setData((data) => data + 20);
      setDivineArray([...divineArray, index]);
    };
  };


  return (
    <div className="flex flex-col max-w-[24.1%] gap-y-2" ref={containerRef}>
      <div className="flex gap-2 max-w-full ">
        <div className="inline-flex items-center rounded-3xl bg-[#1D1F2C]">
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
                className="w-12 h-12 rounded "
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
            className={`z-10 ${open ? "absolute" : "hidden"
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
                      reset();
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
        <div className="flex-1 rounded-3xl bg-green-400 justify-center flex items-center text-2xl">
          {data} / {maxData}
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-0.5 flex-wrap">
          {/* las cartas basicas */}
          {character &&
            cardsArray
              .map((card, i) => {
                if (arrayRemoveCard.includes(i)) {
                  return null;
                }
                return (
                  <div key={i} className="relative">
                    <img
                      src={`/character-chaos/${character}/${card + 1}.png`}
                      alt={`${character} ${i + 1}`}
                      className="w-20 "
                    >
                    </img>
                    <div className="text-[10px]">
                      <button className="absolute w-16.5 h-4 rounded-3xl bottom-15 left-2 bg-blue-600 cursor-pointer"
                        onClick={() => { handleClickDuplicateCard(i); handleClickAddCard(card, i); }}
                      >Duplicar</button>
                      <button className={`absolute w-16.5 h-4 rounded-3xl bottom-10.5 left-2 ${activeDivine.includes(i) ? 'bg-yellow-500' : 'bg-yellow-500/30 hover:bg-yellow-500/80'} cursor-pointer`}
                        onClick={() => { toggleDivineActive(i); handleClickDivineCard(i); }}
                      >Divina</button>
                      <button className="absolute w-16.5 h-4 rounded-3xl bottom-6 left-2 bg-purple-600 cursor-pointer"
                        onClick={() => { handleClickConvertCard(i); saveRemoveCard(i); }}
                      >Convertir</button>
                      <button className="absolute w-16.5 h-4 rounded-3xl bottom-1.5 left-2 bg-red-600 cursor-pointer justify-center flex items-center"
                        onClick={() => { handleClickRemoveCard(); saveRemoveCard(i); }}
                      >Remover</button>
                    </div>
                  </div>);
              })}
          {/* las cartas neutrales */}
          <NeutralCalculate
            setNeutralCount={setNeutralCount}
            setData={setData}
            data={data}
            neutralCount={neutralCount}
            setRemoveCount={setRemoveCount}
            character={character}
            removeCount={removeCount}
            ArrayNeutralCard={ArrayNeutralCard}
            setArrayNeutralCard={setArrayNeutralCard}
            setDuplicateCount={setDuplicateCount}
            duplicateCount={duplicateCount}
          />
          
        </div>
      </div>
    </div >
  );
};
function elif(arg0: boolean) {
  throw new Error("Function not implemented.");
}


