import { useRef, useState } from "react";
import { IDIOMS } from "../utils/idoms";
import { CharacterData } from "./CharacterData";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Languages } from "lucide-react";
export const MainComponent = () => {
  const [idioma, setIdioma] = useState<keyof typeof IDIOMS>("spanish");
  const [data, setData] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // refs para drag-to-scroll
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragMoved = useRef(false); // evita clicks después de arrastrar

  // estado para controlar qué "tier" está activo (solo uno)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTierButton = (tier: number) => {
    return 30 + 10 * (tier - 1);
  };
  const computeItemStep = () => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return 100;
    const first = container.children[0] as HTMLElement;
    const itemWidth = first.getBoundingClientRect().width;
    let gap = 0;
    if (container.children.length > 1) {
      const second = container.children[1] as HTMLElement;
      gap =
        second.getBoundingClientRect().left -
        first.getBoundingClientRect().left -
        itemWidth;
    }
    return itemWidth + gap;
  };

  const scrollByStep = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const step = computeItemStep();
    const delta = direction === "right" ? step : -step;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  // handlers para arrastrar con mouse + touch
  const onPointerDown = (clientX: number) => {
    const container = scrollRef.current;
    if (!container) return;
    isDown.current = true;
    dragMoved.current = false;
    container.classList.add("cursor-grabbing");
    startX.current = clientX - container.getBoundingClientRect().left;
    startScrollLeft.current = container.scrollLeft;
  };
  const onPointerMove = (clientX: number) => {
    const container = scrollRef.current;
    if (!container || !isDown.current) return;
    const x = clientX - container.getBoundingClientRect().left;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) dragMoved.current = true; // ya se considera arrastre
    container.scrollLeft = startScrollLeft.current - walk;
  };
  const onPointerUp = () => {
    const container = scrollRef.current;
    isDown.current = false;
    if (container) container.classList.remove("cursor-grabbing");
    // restaurar dragMoved después del click event loop para que onClick pueda leerlo
    setTimeout(() => (dragMoved.current = false), 0);
  };
  // NEW: nuevo handler para rueda del ratón (scroll vertical -> horizontal)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    // prevenir scroll vertical de la página mientras el cursor esté sobre el carrusel
    e.preventDefault();
    const factor = 1.6; // ajustar sensibilidad si hace falta
    const delta = e.deltaY * factor;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="flex w-dvw h-dvh flex-col relative">
      <div className="flex flex-col justify-center items-center">
        <h1>{IDIOMS[idioma].titulo}</h1>
        <p>{IDIOMS[idioma].descripcion}</p>
        <button>{IDIOMS[idioma].botonInicio}</button>
      </div>
      <div>
        <div className="flex flex-row justify-center items-center  ">
          <div>tier</div>

          <button
            className="flex flex-row justify-center items-center rounded-[14px] hover:border-white border-2 border-[#151559] p-3 absolute right-2.5 transition hover:scale-105"
            onClick={() =>
              idioma === "spanish" ? setIdioma("english") : setIdioma("spanish")
            }
          >
            <Languages />
          </button>
        </div>
        <div className="flex flex-row justify-center items-center px-2">
          {/* botón izquierda */}
          <button
            className="px-2 py-1 rounded mr-2  transition hover:scale-105"
            onClick={() => scrollByStep("left")}
            aria-label="scroll left"
          >
            <ArrowBigLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex flex-row max-w-[700px] w-full gap-1.5 overflow-hidden select-none cursor-grab p-2"
            onMouseDown={(e) => onPointerDown(e.clientX)}
            onMouseMove={(e) => onPointerMove(e.clientX)}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
            onTouchEnd={onPointerUp}
            onWheel={handleWheel}
          >
            {Array(14)
              .fill(0)
              .map((_, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    // si está activo, mantener el estilo que tiene el hover (ej: border-white)
                    className={`cursor-grabbing font-bold text-xl transition hover:scale-105 w-[100px] h-[50px] flex flex-row justify-center items-center rounded-[14px] hover:border-white border-2 border-[#151559] p-2 grow shrink-0 ${
                      isActive ? "border-white" : ""
                    }`}
                    onClick={(e) => {
                      // si se arrastró, ignorar el click
                      if (dragMoved.current) return;
                      setActiveIndex(index);
                      setData(handleTierButton(index + 1));
                    }}
                  >
                    <div>{index + 1}</div>
                  </button>
                );
              })}
          </div>
          {/* botón derecha */}
          <button
            className="px-2 py-1 rounded ml-2  transition hover:scale-105"
            onClick={() => scrollByStep("right")}
            aria-label="scroll right"
          >
            <ArrowBigRight />
          </button>
        </div>
      </div>
      <CharacterData maxData={data} />
    </div>
  );
};
