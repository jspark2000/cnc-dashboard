export const generateRandomList = (
  length: number,
  minVal: number,
  maxVal: number
): number[] => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  )
}
