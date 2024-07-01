import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import { timeEvents } from "../globals/timeEvents";
import { timeIntervals } from "../globals/timeIntervals";
import { ITimeEvent } from "../types/ITimeEvent";

export const useCustomSwiper = (currentTimeIntervalId: number) => {
  const sliderRef = useRef<SwiperRef>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<ITimeEvent[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFirstRender, setFirstRender] = useState(true);
  const [timeIntervalName, setTimeIntervalName] = useState<null | string>(null);
  // const isFirstRender = useRef(true);

  useEffect(() => {
    const findEvents = () => {
      const timeInterval = timeIntervals.find(
        (el) => el.id === currentTimeIntervalId
      );

      if (!timeInterval) {
        setTimeIntervalName(null);
        return;
      }

      setTimeIntervalName(timeInterval.name);

      const events = timeEvents
        .filter(
          (el) =>
            el.year >= timeInterval.startInterval &&
            el.year < timeInterval.endInterval
        )
        .sort((a, b) => (a.year > b.year ? 1 : -1));

      setEvents(events);
    };

    gsap
      .timeline()
      .to(mainRef.current, {
        y: 50,
        opacity: 0,
        duration: isFirstRender ? 0 : 0.3,
      })
      .call(findEvents)
      .to(mainRef.current, {
        y: 0,
        opacity: 1,
        duration: isFirstRender ? 0 : 0.3,
        delay: 0.1,
      })
      .call(() => setFirstRender(false));
  }, [currentTimeIntervalId]);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.on("slideChange", () => {
        setActiveSlide(sliderRef.current?.swiper.activeIndex || 0);
      });
    }
  }, [sliderRef]);

  return {
    events,
    timeIntervalName,
    sliderRef,
    mainRef,
    swipeNext: handleNext,
    swipePrev: handlePrev,
    activeSlide,
  };
};
