import { set } from "astro:schema";
import { useState, useRef, useEffect, use } from "react";
import { NeutralCalculate } from "./NeutralCalculate";
import { UseResetIntenso } from "../hooks/UseResetIntenso";

// ...existing code...
type Props = {
  maxData: number;
};

const Characters = [
  "Amir",
  "Beryl",
  "Cassius",
  "Veronica",
  "Haru",
  "Hugo",
  "Kayron",
  "Khalipe",
  "Lucas",
  "Luke",
  "Magma",
  "Maribell",
  "Mei Ling",
  "Mika",
  "Nia",
  "Orlean",
  "Owen",
  "Rei",
  "Renoa",
  "Rin",
  "Selena",
  "Tressa",
  "Yuki",
];

export const CharacterData: React.FC<Props> = ({ maxData = 130 }) => {
  const {
    reset: resetIntenso,
    neutralDivineArray,
    setNeutralDivineArray,
    neutralActiveDivine,
    setNeutralActiveDivine,
    neutralEpiphanyArray,
    setNeutralEpiphanyArray,
    neutralActiveEpiphany,
    setNeutralActiveEpiphany,
    monsterArray,
    setMonsterArray,
    monsterCount,
    setMonsterCount,
    forbidden,
    setForbidden,
    forbiddenCount,
    setForbiddenCount,
  } = UseResetIntenso();
  const [character, setCharacter] = useState("");
  const [cardsArray, setCardsArray] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7,
  ]);
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

  // useEffect(() => {
  //   console.log(
  //     "forbidden desde character",
  //     forbidden,
  //     "forbiddenCount",
  //     forbiddenCount
  //   );
  // }, [forbiddenCount, forbidden]);
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
    setArrayNeutralCard([]);
    resetIntenso();
  }

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
  }

  function saveRemoveCard(index: number) {
    setArrayRemoveCard([...arrayRemoveCard, index]);
    if (divineArray.includes(index)) {
      setData((data) => data - 20);
      const newActiveDivine = activeDivine.filter((i) => i !== index);
      setActiveDivine(newActiveDivine);
      const newDivineArray = divineArray.filter((i) => i !== index);
      setDivineArray(newDivineArray);
    }
  }
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
  }

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
  }

  function handleClickAddCard(card: number, index: number) {
    setCardsArray([
      ...cardsArray.slice(0, index),
      card,
      ...cardsArray.slice(index),
    ]);
    if (divineArray.includes(index)) {
      setData((data) => data + 20);
      setActiveDivine((activeDivine) => [...activeDivine, index + 1]);
      setDivineArray((divineArray) => [...divineArray, index + 1]);
    }
  }

  function toggleDivineActive(index: number) {
    setActiveDivine((activeDivine) =>
      activeDivine.includes(index)
        ? activeDivine.filter((i) => i !== index)
        : [...activeDivine, index]
    );
  }

  function handleClickDivineCard(index: number) {
    if (divineArray.includes(index)) {
      setActiveDivine((prev) => prev.filter((i) => i !== index));
      setDivineArray((prev) => prev.filter((i) => i !== index));
      setData((data) => data - 20);
    } else {
      setData((data) => data + 20);
      setDivineArray([...divineArray, index]);
    }
  }

  return (
    <div
      className="min-w-[440px] flex-1 flex flex-col max-w-[33%] gap-y-2 p-2 bg-[#2c2c2c88] rounded-2xl"
      ref={containerRef}
    >
      <div className="flex gap-2 max-w-full items-center">
        <div className="inline-flex items-center rounded-xl bg-[#1D1F2C] relative">
          <button
            id="dropdownDefaultButton"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="dropdown"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center  text-white bg-brand box-border  shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5  gap-1 "
            type="button"
          >
            {character && (
              <img
                className="w-12 h-12 rounded "
                src={`/character-chaos/${character}/show.png`}
                alt="Character"
              />
            )}
            {!character && <div className="w-12 h-12 rounded bg-white"></div>}
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
            } bg-neutral-primary-medium  border-default-medium rounded-base shadow-lg w-44  top-18 overflow-auto max-h-[200px] border-0 rounded`}
            role="menu"
          >
            <ul
              className="p-2 text-sm text-body font-medium bg-black border-0"
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
                    <div className="flex gap-1 items-center">
                      <img
                        className="w-8 h-8 rounded text-base"
                        src={`/character-chaos/${char}/show.png`}
                        alt="Character"
                      />
                      <div>{char}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`h-max rounded-xl text-[#52B839] border-2 border-[#52B839] bg-[#1D1F2C] justify-center flex items-center text-2xl  w-max px-4 py-1 ${
            data > maxData ? "text-red-600 border-red-600" : ""
          } `}
        >
          {data} / {maxData}
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-0.5 flex-wrap">
          {/* las cartas basicas */}
          {character &&
            cardsArray.map((card, i) => {
              if (arrayRemoveCard.includes(i)) {
                return null;
              }
              return (
                <div key={i} className="relative">
                  <img
                    src={`/character-chaos/${character}/${card + 1}.png`}
                    alt={`${character} ${i + 1}`}
                    className="w-26 "
                  ></img>
                  <div className="w-full text-[14px] absolute flex flex-col bottom-1 left-1/2 -translate-x-1/2 justify-center items-center ">
                    <div className="flex flex-col w-max ">
                      <button
                        className="px-1 rounded-3xl  bg-blue-600 cursor-pointer"
                        onClick={() => {
                          handleClickDuplicateCard(i);
                          handleClickAddCard(card, i);
                        }}
                      >
                        Duplicar
                      </button>
                      <button
                        className={`px-1 rounded-3xl  ${
                          activeDivine.includes(i)
                            ? "bg-yellow-500"
                            : "bg-yellow-500/30 hover:bg-yellow-500/80"
                        } cursor-pointer`}
                        onClick={() => {
                          toggleDivineActive(i);
                          handleClickDivineCard(i);
                        }}
                      >
                        Divina
                      </button>
                      <button
                        className="px-1 rounded-3xl bg-purple-600 cursor-pointer"
                        onClick={() => {
                          handleClickConvertCard(i);
                          saveRemoveCard(i);
                        }}
                      >
                        Convertir
                      </button>
                      <button
                        className=" rounded-3xl  bg-red-600 cursor-pointer justify-center flex items-center"
                        onClick={() => {
                          handleClickRemoveCard();
                          saveRemoveCard(i);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              );
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
            // ----
            setNeutralDivineArray={setNeutralDivineArray}
            setNeutralActiveDivine={setNeutralActiveDivine}
            setNeutralEpiphanyArray={setNeutralEpiphanyArray}
            setNeutralActiveEpiphany={setNeutralActiveEpiphany}
            setMonsterArray={setMonsterArray}
            setMonsterCount={setMonsterCount}
            setForbidden={setForbidden}
            setForbiddenCount={setForbiddenCount}
            forbidden={forbidden}
            forbiddenCount={forbiddenCount}
            neutralDivineArray={neutralDivineArray}
            neutralActiveDivine={neutralActiveDivine}
            neutralEpiphanyArray={neutralEpiphanyArray}
            neutralActiveEpiphany={neutralActiveEpiphany}
            monsterArray={monsterArray}
            monsterCount={monsterCount}
          />
        </div>
      </div>
    </div>
  );
};
