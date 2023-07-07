const sizes = {
  svg: 0.7,
  cr: 0.25,
  pomodoro: 0.05,
  timeLeft: 0.096,
  workType: 0.048,
  pomodoroCount: 0.024,
  pause: 0.15
}

export const useGetSize = (key: keyof typeof sizes) => {
  const baseSize = Math.min(window.visualViewport?.width || 0, window.visualViewport?.height || 0) * 1.2
  return sizes[key] * baseSize
}
