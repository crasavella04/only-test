import { Swiper, SwiperSlide } from "swiper/react";
import EventsSliderItem from "../EventsSliderItem/EventsSliderItem";
import styles from "./EventsSlider.module.scss";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./../../index.css";

import { Dispatch } from "react";
import { FreeMode, Mousewheel, Pagination } from "swiper/modules";
import { timeIntervals } from "../../globals/timeIntervals";
import { useCustomSwiper } from "../../hooks/useCustomSwiper";
import SwitchingButtons from "../SwitchingButtons/SwitchingButtons";

interface EventsSliderProps {
  currentTimeIntervalId: number;
  currentInterval: number;
  setInterval: Dispatch<React.SetStateAction<number>>;
  setCircleDeg: Dispatch<React.SetStateAction<number>>;
}

export default function EventsSlider({
  currentTimeIntervalId,
  currentInterval,
  setInterval,
  setCircleDeg,
}: EventsSliderProps) {
  const {
    timeIntervalName,
    sliderRef,
    activeSlide,
    swipeNext,
    swipePrev,
    events,
    mainRef,
  } = useCustomSwiper(currentTimeIntervalId);

  return (
    <>
      <div className={styles.main} ref={mainRef}>
        <div className={styles.timeIntervalName}>{timeIntervalName || ""}</div>
        <div className={styles.buttonContainer}>
          <span
            className={styles.button}
            onClick={swipePrev}
            style={{
              rotate: "180deg",
              display: activeSlide === 0 ? "none" : "flex",
            }}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <div className={styles.slider}>
          <Swiper
            ref={sliderRef}
            spaceBetween={30}
            // slidesPerView={2}
            slidesPerView={"auto"}
            freeMode={true}
            pagination={{
              el: "#containerForBullets",
              type: "bullets",
              bulletClass: "swiper-custom-bullet",
              bulletActiveClass: "swiper-custom-bullet-active",
              clickable: true,
              renderBullet: (index: number, className: string) => {
                return `<span class=` + className + `></span>`;
              },
            }}
            // pagination={true}
            modules={[FreeMode, Mousewheel, Pagination]}
            breakpoints={{ 980: { slidesPerView: 3 } }}
          >
            {events.map((el) => (
              <SwiperSlide key={el.id}>
                <EventsSliderItem year={el.year} description={el.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.buttonContainer}>
          <span
            className={styles.button}
            onClick={swipeNext}
            style={{
              display: activeSlide >= events.length - 3 ? "none" : "flex",
            }}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>
      <div className={styles.mobileSwitch}>
        <SwitchingButtons
          countIntervals={timeIntervals.length}
          currentInterval={currentInterval}
          setInterval={setInterval}
          setCircleDeg={setCircleDeg}
          // className={styles.mobilwitch}
        />
        <div className={styles.bulletsContainer} id="containerForBullets"></div>
      </div>
    </>
  );
}
