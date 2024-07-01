import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ITimeInterval } from "../types/ITimeInterval";

export const useCountUp = (
  timeIntervals: ITimeInterval[],
  currentTimeInterval: number
) => {
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const [isFirstRender, setFirstRender] = useState(true);
  // const isFirstRender = useRef(true);

  useEffect(() => {
    gsap.to(startRef.current, {
      innerHTML: timeIntervals[currentTimeInterval].startInterval,
      duration: isFirstRender ? 0 : 0.5,
      onUpdate: function () {
        if (startRef.current) {
          startRef.current.innerHTML = Math.floor(
            this.targets()[0].innerHTML
          ).toString();
        }
      },
    });

    gsap.to(endRef.current, {
      innerHTML: timeIntervals[currentTimeInterval].endInterval,
      duration: isFirstRender ? 0 : 0.5,
      onUpdate: function () {
        if (endRef.current) {
          endRef.current.innerHTML = Math.floor(
            this.targets()[0].innerHTML
          ).toString();
        }
      },
    });

    if (isFirstRender) setFirstRender(false);
  }, [currentTimeInterval, timeIntervals, isFirstRender]);

  return {
    startRef,
    endRef,
  };
};
