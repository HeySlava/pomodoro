import { useIsMoble } from "../helpers"

export const sizes = {
  svg: {
    mobile: 262,
    desk: 700
  },
  cr: {
    mobile: 95,
    desk: 250
  },
  pomodoro: {
    mobile: 19,
    desk: 50,
  },
  timeLeft: {
    mobile: 38,
    desk: 96,
  },
  workType: {
    mobile: 18,
    desk: 48
  },
  pomodoroCount: {
    mobile: 10,
    desk: 24
  },
  pause: {
    mobile: 60,
    desk: 150
  }
} as const

export const useGetSize = (key: keyof typeof sizes) => {
  const isMobile = useIsMoble()
  return sizes[key][isMobile ? "mobile" : "desk"]
}
