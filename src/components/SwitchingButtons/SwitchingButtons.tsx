import { calculateDeg } from "../../helpers/calculateDeg";
import styles from "./SwitchingButtons.module.scss";

interface SwitchingButtonsProps {
  countIntervals: number;
  currentInterval: number;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  setCircleDeg: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

export default function SwitchingButtons({
  countIntervals,
  currentInterval,
  setInterval,
  setCircleDeg,
  className,
}: SwitchingButtonsProps) {
  return (
    <div className={styles.main + " " + className}>
      <p>
        {currentInterval + 1}/{countIntervals}
      </p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          disabled={!currentInterval}
          onClick={() => {
            setCircleDeg((prev) =>
              calculateDeg(
                prev,
                currentInterval - 1,
                currentInterval,
                countIntervals
              )
            );
            setInterval((prev) => prev - 1);
          }}
        >
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button
          className={styles.button}
          disabled={currentInterval + 1 === countIntervals}
          onClick={() => {
            setCircleDeg((prev) =>
              calculateDeg(
                prev,
                currentInterval + 1,
                currentInterval,
                countIntervals
              )
            );
            setInterval((prev) => prev + 1);
          }}
        >
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
