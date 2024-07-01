import { useEffect, useRef, useState } from "react";
import INIT_DEVIATION from "../../globals/INIT_DEVIATION";
import { calculateDeg } from "../../helpers/calculateDeg";
import { useCountUp } from "../../hooks/useCountUp";
import { ITimeInterval } from "../../types/ITimeInterval";
import EventsSlider from "../EventsSlider/EventsSlider";
import SwitchingButtons from "../SwitchingButtons/SwitchingButtons";
import styles from "./Main.module.scss";

// import "swiper/css/pagination";

interface MainProps {
  timeIntervals: ITimeInterval[];
}

export default function Main({ timeIntervals }: MainProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);
  const [currentTimeInterval, setTimeInterval] = useState(0);
  const [circleDeg, setCircleDeg] = useState(0);

  useEffect(() => {
    if (circleRef?.current) setRadius(circleRef.current.offsetWidth / 2);
  }, [circleRef]);

  const { startRef, endRef } = useCountUp(timeIntervals, currentTimeInterval);

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <span className={styles.titleBorder} />
        <h3 className={styles.title}>Исторические даты</h3>
      </div>
      <div className={styles.timeline}>
        <div
          ref={circleRef}
          className={styles.circle}
          style={{
            transform: `translateY(-50%) rotate(${-circleDeg}deg)`,
          }}
        >
          {timeIntervals.map((el, index) => {
            const alpha =
              INIT_DEVIATION * 2 + (360 * index) / timeIntervals.length;

            const x = radius * Math.cos((alpha * Math.PI) / 180);
            const y = radius * Math.sin((alpha * Math.PI) / 180);
            return (
              <div
                style={{
                  top: radius - y,
                  left: radius - x,
                  transform: `translate(-50%, -50%) rotate(${circleDeg}deg)`,
                  position: "absolute",
                  display: "flex",
                }}
                key={el.id}
              >
                <span
                  className={`${styles.circleItem} ${
                    el.id === timeIntervals[currentTimeInterval].id &&
                    styles.circleItem_active
                  }`}
                  onClick={() => {
                    setCircleDeg((prev) =>
                      calculateDeg(
                        prev,
                        index,
                        currentTimeInterval,
                        timeIntervals.length
                      )
                    );
                    setTimeInterval(index);
                  }}
                >
                  {index + 1}
                </span>
                <div
                  className={`${styles.circleItemName} ${
                    el.id === timeIntervals[currentTimeInterval].id &&
                    styles.circleItemNameActive
                  }`}
                >
                  {el.name}
                </div>
              </div>
            );
          })}
        </div>
        <span className={styles.middleLine} />
        <span ref={startRef} style={{ color: "#5D5FEF" }} />
        <span ref={endRef} style={{ color: "#EF5DA8" }} />
      </div>
      <div className={styles.switchContainer}>
        <SwitchingButtons
          countIntervals={timeIntervals.length}
          currentInterval={currentTimeInterval}
          setInterval={setTimeInterval}
          setCircleDeg={setCircleDeg}
        />
      </div>
      <EventsSlider
        currentTimeIntervalId={timeIntervals[currentTimeInterval].id}
        currentInterval={currentTimeInterval}
        setInterval={setTimeInterval}
        setCircleDeg={setCircleDeg}
      />
      {/* <div className={styles.mobileSwitch}>
        <SwitchingButtons
          countIntervals={timeIntervals.length}
          currentInterval={currentTimeInterval}
          setInterval={setTimeInterval}
          setCircleDeg={setCircleDeg}
          // className={styles.mobilwitch}
        />
        <div className="containerForBullets" id="containerForBullets"></div>
      </div> */}
    </div>
  );
}
