import { useEffect, useState } from "react";

export const UseResetIntenso = () => {
  const [neutralDivineArray, setNeutralDivineArray] = useState<number[]>([]);
  const [neutralActiveDivine, setNeutralActiveDivine] = useState<number[]>([]);
  const [neutralEpiphanyArray, setNeutralEpiphanyArray] = useState<number[]>(
    []
  );
  const [neutralActiveEpiphany, setNeutralActiveEpiphany] = useState<number[]>(
    []
  );
  const [monsterArray, setMonsterArray] = useState<number[]>([]);
  const [monsterCount, setMonsterCount] = useState<number>(0);
  const [forbidden, setForbidden] = useState<number[]>([]);
  const [forbiddenCount, setForbiddenCount] = useState<number>(0);

  const reset = () => {
    setNeutralDivineArray(() => []);
    setNeutralActiveDivine(() => []);
    setNeutralEpiphanyArray(() => []);
    setNeutralActiveEpiphany(() => []);
    setMonsterArray(() => []);
    setMonsterCount(() => 0);
    setForbidden(() => []);
    setForbiddenCount(() => 0);
  };
  useEffect(() => {
    console.log("forbidden", forbidden, "forbiddenCount", forbiddenCount);
  }, [forbiddenCount, forbidden]);

  return {
    reset,
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
  };
};
