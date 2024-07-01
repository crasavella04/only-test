import { memo } from "react";
import styles from "./EventsSliderItem.module.scss";

interface EventsSliderItemProps {
  year: number;
  description: string;
}

const EventsSliderItem = ({ year, description }: EventsSliderItemProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{year}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default memo(EventsSliderItem);
