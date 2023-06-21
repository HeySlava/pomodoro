import { useMediaQuery } from "react-responsive";

export const useIsMoble = () => useMediaQuery({ query: "(max-width: 600px)" })

export const addZeroToStart = (num: number) => {
  if (num < 10) return `0${num}`
  return `${num}`
}
