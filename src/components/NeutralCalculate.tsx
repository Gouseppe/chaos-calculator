import { set } from "astro:schema";
import { useState, useRef, useEffect, Fragment } from "react";

// ...existing code...

export const NeutralCalculate = ({ setNeutralCount, setData, data, neutralCount, setRemoveCount, removeCount, character, ArrayNeutralCard, setArrayNeutralCard, duplicateCount, setDuplicateCount }) => {

    const [neutralDivineArray, setNeutralDivineArray] = useState<number[]>([]);
    const [neutralActiveDivine, setNeutralActiveDivine] = useState<number[]>([]);
    const [neutralEpiphanyArray, setNeutralEpiphanyArray] = useState<number[]>([]);
    const [neutralActiveEpiphany, setNeutralActiveEpiphany] = useState<number[]>([]);
    const [monsterArray, setMonsterArray] = useState<number[]>([]);
    const [monsterCount, setMonsterCount] = useState<number>(0);
    const [forbidden, setForbidden] = useState<number[]>([]);
    const [forbiddenCount, setForbiddenCount] = useState<number>(0);

    const handleClickNeutralCard = (neutralCount: number) => {
        setArrayNeutralCard([...ArrayNeutralCard, generateRandom0to2()]);
        setNeutralCount(neutralCount + 1);
        setData(data + 20);
    };

    const handleClickMonsterCard = (monsterCount: number) => {
        setMonsterArray([...monsterArray, generateRandom0to2()]);
        setMonsterCount(monsterCount + 1);
        setData(data + 80);
    };

    const handleClickForbiddenCard = (forbiddenCount: number) => {
        setForbidden([...forbidden, generateRandom0to2()]);
        setForbiddenCount(forbiddenCount + 1);
        setData(data + 30);
    };

    function generateRandom0to2(): number {
        return Math.floor(Math.random() * 3);
    };

    function handleClickRemoveCardNeutral() {
        const removeCountAux = removeCount + 1;
        setData((data: number) => data - 20);
        setRemoveCount(removeCount + 1);
        if (removeCountAux == 2) {
            setData((data: number) => data + 10);
        } else if (removeCountAux == 3) {
            setData((data: number) => data + 30);
        } else if (removeCountAux == 4) {
            setData((data: number) => data + 50);
        } else if (removeCountAux >= 5) {
            setData((data: number) => data + 70);
        }
    };

    function handleClickRemoveCardMonster() {
        const removeCountAux = removeCount + 1;
        setData((data: number) => data - 80);
        setRemoveCount(removeCount + 1);
        if (removeCountAux == 2) {
            setData((data: number) => data + 10);
        } else if (removeCountAux == 3) {
            setData((data: number) => data + 30);
        } else if (removeCountAux == 4) {
            setData((data: number) => data + 50);
        } else if (removeCountAux >= 5) {
            setData((data: number) => data + 70);
        }
    };

    function handleClickRemoveCardForbidden() {
        const removeCountAux = removeCount + 1;
        setData((data: number) => data - 30);
        setRemoveCount(removeCount + 1);
        if (removeCountAux == 2) {
            setData((data: number) => data + 10);
        } else if (removeCountAux == 3) {
            setData((data: number) => data + 30);
        } else if (removeCountAux == 4) {
            setData((data: number) => data + 50);
        } else if (removeCountAux >= 5) {
            setData((data: number) => data + 70);
        }
    };

    function deleteForbiddenCard(index: number) {
        const newArrayForbiddenCard = forbidden.filter((i: number, idx: number) => idx !== index);
        setForbidden(newArrayForbiddenCard);
    };

    function deleteMonsterCard(index: number) {
        const newArrayMonsterCard = monsterArray.filter((i: number, idx: number) => idx !== index);
        setMonsterArray(newArrayMonsterCard);
    }

    function deleteNeutralCard(index: number) {
        const newArrayNeutralCard = ArrayNeutralCard.filter((i: number, idx: number) => idx !== index);
        setArrayNeutralCard(newArrayNeutralCard);
    }

    function handleClickConvertCardNeutral(index: number) {
        setData((data: number) => data + 10);

        if (neutralDivineArray.includes(index)) {
            setData((data: number) => data - 20);
            setNeutralActiveDivine((prev) => prev.filter((i) => i !== index));
            setNeutralDivineArray((prev) => prev.filter((i) => i !== index));
        }
        if (neutralEpiphanyArray.includes(index)) {
            setData((data: number) => data - 10);
            setNeutralActiveEpiphany((prev) => prev.filter((i) => i !== index));
            setNeutralEpiphanyArray((prev) => prev.filter((i) => i !== index));
        };
        setArrayNeutralCard((prev: number[]) => {
            const newArr = [...prev];
            // si el índice existe, reemplazar en la misma posición
            if (index >= 0 && index < newArr.length) {
                newArr[index] = generateRandom0to2();
            } else {
                // fallback: si no existe el índice, añadir al final
                newArr.push(generateRandom0to2());
            }
            return newArr;
        });
    };

    function toggleEpiphanyActive(index: number) {
        setNeutralActiveEpiphany((neutralActiveEpiphany) => (neutralActiveEpiphany.includes(index) ? neutralActiveEpiphany.filter((i) => i !== index) : [...neutralActiveEpiphany, index]));
    };

    function handleClickEpiphanyCard(index: number) {
        if (neutralEpiphanyArray.includes(index)) {
            setNeutralActiveEpiphany((prev) => prev.filter((i) => i !== index));
            setNeutralEpiphanyArray((prev) => prev.filter((i) => i !== index));
            setData((data: number) => data - 10);
        } else {
            setData((data: number) => data + 10);
            setNeutralEpiphanyArray([...neutralEpiphanyArray, index]);
        };
    };

    function toggleDivineActive(index: number) {
        setNeutralActiveDivine((neutralActiveDivine) => (neutralActiveDivine.includes(index) ? neutralActiveDivine.filter((i) => i !== index) : [...neutralActiveDivine, index]));
    };

    function handleClickDivineCard(index: number) {
        if (neutralDivineArray.includes(index)) {
            setNeutralActiveDivine((prev) => prev.filter((i) => i !== index));
            setNeutralDivineArray((prev) => prev.filter((i) => i !== index));
            setData((data: number) => data - 20);
        } else {
            setData((data: number) => data + 20);
            setNeutralDivineArray([...neutralDivineArray, index]);
        };
    };

    function isDivine(index: number) {
        if (neutralDivineArray.includes(index)) {
            setData((data: number) => data - 20);
            const newActiveDivine = neutralActiveDivine.filter((i) => i !== index);
            setNeutralActiveDivine(newActiveDivine);
            const newDivineArray = neutralDivineArray.filter((i) => i !== index);
            setNeutralDivineArray(newDivineArray);
        }
    };

    function isEpiphany(index: number) {
        if (neutralEpiphanyArray.includes(index)) {
            setData((data: number) => data - 10);
            const newActiveEpiphany = neutralActiveEpiphany.filter((i) => i !== index);
            setNeutralActiveEpiphany(newActiveEpiphany);
            const newEpiphanyArray = neutralEpiphanyArray.filter((i) => i !== index);
            setNeutralEpiphanyArray(newEpiphanyArray);
        }
    };

    function handleClickDuplicateCardNeutral(index: number) {
        const duplicateCountAux = duplicateCount + 1;
        setDuplicateCount(duplicateCount + 1);
        setData((data: number) => data + 20);
        if (duplicateCountAux == 2) {
            setData((data: number) => data + 10);
        } else if (duplicateCountAux == 3) {
            setData((data: number) => data + 30);
        } else if (duplicateCountAux == 4) {
            setData((data: number) => data + 50);
        } else if (duplicateCountAux >= 5) {
            setData((data: number) => data + 70);
        }
    };

    function handleClickAddCardNeutral(card: number, index: number) {
        setArrayNeutralCard([...ArrayNeutralCard.slice(0, index), card, ...ArrayNeutralCard.slice(index)]);
        if (neutralDivineArray.includes(index)) {
            setData((data: number) => data + 20);
            setNeutralActiveDivine((neutralActiveDivine) => [...neutralActiveDivine, index + 1]);
            setNeutralDivineArray((neutralDivineArray) => [...neutralDivineArray, index + 1]);
        } else if (neutralEpiphanyArray.includes(index)) {
            setData((data: number) => data + 10);
            setNeutralActiveEpiphany((neutralActiveEpiphany) => [...neutralActiveEpiphany, index + 1]);
            setNeutralEpiphanyArray((neutralEpiphanyArray) => [...neutralEpiphanyArray, index + 1]);
        }

    }


    return <Fragment>
        {/*Neutral cards abajo   */}
        {ArrayNeutralCard
            .map((cardNeutral: number, i: number) => (
                <div key={i} className="relative"
                >
                    <img
                        src={`/character-chaos/Neutral/neutral${cardNeutral}.png`}
                        className="w-20"
                    />
                    <div className="text-[10px]">
                        <button className={`absolute w-16.5 h-4 bg-blue-600 rounded-3xl bottom-20 left-2 cursor-pointer`}
                            onClick={() => { handleClickDuplicateCardNeutral(i); handleClickAddCardNeutral(cardNeutral, i); }}
                        >Duplicar</button>
                        <button className={`absolute w-16.5 h-4 rounded-3xl bottom-15.5 left-2 ${neutralActiveEpiphany.includes(i) ? 'bg-sky-300' : 'bg-blue-300/30 hover:bg-sky-300/80'} cursor-pointer`}
                            onClick={() => { isDivine(i); toggleEpiphanyActive(i); handleClickEpiphanyCard(i); }}
                        >Epifania</button>
                        <button className={`absolute w-16.5 h-4 rounded-3xl bottom-11 left-2 ${neutralActiveDivine.includes(i) ? 'bg-yellow-500' : 'bg-yellow-500/30 hover:bg-yellow-500/80'} cursor-pointer`}
                            onClick={() => { isEpiphany(i); toggleDivineActive(i); handleClickDivineCard(i); }}
                        >Divina</button>
                        <button className="absolute w-16.5 h-4 rounded-3xl bottom-6.5 left-2 bg-purple-600 cursor-pointer"
                            onClick={() => { handleClickConvertCardNeutral(i); }}
                        >Convertir</button>
                        <button className="absolute w-16.5 h-4 rounded-3xl bottom-2 left-2 bg-red-600 cursor-pointer justify-center flex items-center"
                            onClick={() => {
                                handleClickRemoveCardNeutral();
                                deleteNeutralCard(i);
                            }}
                        >Remover</button>
                    </div>
                </div>
            ))
        }
        {monsterArray
            .map((cardMonster: number, i: number) => (
                <div key={i} className="relative"
                >
                    <img
                        src={`/character-chaos/Monster/${cardMonster}.png`}
                        className="w-20"
                    />
                    <div className="text-[10px]">
                        <button className="absolute w-16.5 h-4 rounded-3xl bottom-2 left-2 bg-red-600 cursor-pointer justify-center flex items-center"
                            onClick={() => {
                                handleClickRemoveCardMonster(); deleteMonsterCard(i);
                            }}
                        >Remover</button>
                    </div>
                </div>
            ))
        }
        {forbidden
            .map((cardForbidden: number, i: number) => (
                <div key={i} className="relative"
                >
                    <img
                        src={`/character-chaos/Forbidden/${cardForbidden}.png`}
                        className="w-20"
                    />
                    <div className="text-[10px]">
                        <button className="absolute w-16.5 h-4 rounded-3xl bottom-2 left-2 bg-red-600 cursor-pointer justify-center flex items-center"
                            onClick={() => {
                                handleClickRemoveCardForbidden(); deleteForbiddenCard(i);
                            }}
                        >Remover</button>
                    </div>
                </div>
            ))
        }
        {/* Agregar neutral, monster, forbidden card */}
        {character &&
            <div className="relative">
                <img
                    src={'/character-chaos/Neutral/agregarNeutral.png'}
                    className="w-20 cursor-pointer hover:scale-105 transition-transform duration-200"
                />
                <div className="text-[10px]">
                    <button className="absolute w-16.5 h-4 bg-blue-600 rounded-3xl bottom-11 left-2 cursor-pointer"
                        onClick={() => handleClickForbiddenCard(forbiddenCount)}
                    >Forbidden</button>
                    <button className="absolute w-16.5 h-4 bg-purple-600 rounded-3xl bottom-6.5 left-2 cursor-pointer"
                        onClick={() => handleClickMonsterCard(monsterCount)}
                    >Monster</button>
                    <button className="absolute w-16.5 h-4 bg-green-600 rounded-3xl bottom-2 left-2 cursor-pointer"
                        onClick={() => handleClickNeutralCard(neutralCount)}
                    >Neutral</button>
                </div>
            </div>
        }
    </Fragment>;


};