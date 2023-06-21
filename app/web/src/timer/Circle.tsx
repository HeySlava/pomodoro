import { observer } from "mobx-react-lite"
import { useGetSize } from "./helpers"
import { useInjection } from "inversify-react"
import { Store } from "./Store"

const Circle = () => {
  const store = useInjection(Store)
  const svgSize = useGetSize("svg")
  const radius = useGetSize("cr")
  const pomodoroSize = useGetSize("pomodoro")

  const svgCenter = svgSize / 2
  const circuit = radius * 2 * Math.PI


  return <circle
    className="circle"
    cx="50%"
    cy={pomodoroSize * 0.2 + svgCenter}
    r={radius}
    stroke="var(--pomodoro)"
    strokeWidth={radius / 14}
    strokeDasharray={circuit}
    strokeDashoffset={(circuit - circuit * (store.timeLeft / store.totalTime)).toString()}
    fill="none"
    strokeLinecap="round"
  />
}

export default observer(Circle)
