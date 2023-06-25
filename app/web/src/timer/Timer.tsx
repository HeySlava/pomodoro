import './styles.css'
import { useInjection } from "inversify-react"
import { observer } from "mobx-react-lite"
import { Store } from "./Store"
import { useEffect } from "react"
import { useGetSize } from "./helpers"
import Circle from "./Circle"
import TimeLeft from './TimeLeft'
import audioSrc from './assets/click.wav'
import PomodoroCount from './PomodoroCount'
import WorkType from './WorkType'
import PauseBlock from './PauseBlock'

const audio = new Audio(audioSrc)
audio.loop = false

const Timer = () => {
  const store = useInjection(Store)
  const svgSize = useGetSize("svg")

  useEffect(() => {

    const keyHandler = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case "N":
        case "Т":
          store.newSession()
          break;
        case "t":
        case "е":
          store.toggle()
          break;
        case "n":
        case "т":
          store.nextStep()
          break;
        case "D":
        case "В":
          store.stopSession()
          break;
        case "m":
        case "ь":
          store.previousSession()
          break;
        default:
          break;
      }
    }

    store.startPolling()
    document.addEventListener("keypress", keyHandler)
    return () => {
      store.stopPolling()
      document.removeEventListener("keypress", keyHandler)
    }
  }, [])

  useEffect(() => {
    if (store.timeLeft <= 0) audio.play()
  }, [store.timeLeft])

  return <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
    <Circle />
    <TimeLeft />
    <PomodoroCount />
    <WorkType />
    <PauseBlock />
  </svg>
}

export default observer(Timer)
