export const calculateDeg = (
  prev: number,
  index: number,
  currentTimeInterval: number,
  countTimeIntervals: number
) => {
  if (currentTimeInterval === index) return prev;

  const countDots =
    (countTimeIntervals - (currentTimeInterval - index)) % countTimeIntervals;

  return prev + countDots * (360 / countTimeIntervals);
};
