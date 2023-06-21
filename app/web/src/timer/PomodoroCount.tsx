import { useInjection } from "inversify-react"
import { observer } from "mobx-react-lite"
import { Store } from "./Store"
import PomodoroSvg from "./PomodoroSvg"
import { useGetSize } from "./helpers"

const PomodoroCount = () => {
  const store = useInjection(Store)
  const fontSize = useGetSize("pomodoroCount")

  return <>
    <PomodoroSvg y="4%" x="20%" />
    <text
      x="31%"
      y="8%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={fontSize}
    >X {store.pomodoroCount}</text>
  </>
}

export default observer(PomodoroCount)
