export function formatTime(input: string): string {
  const date = new Date(input)

  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const day = date.getDate()

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const formattedDay = day < 10 ? `0${day}` : `${day}`

  return `${date.getMonth() + 1}/${formattedDay} ${date.getHours()}:${formattedMinutes}:${formattedSeconds}`
}

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

export const generateRandomData = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}
