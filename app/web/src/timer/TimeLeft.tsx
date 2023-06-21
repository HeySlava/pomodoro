import { useInjection } from "inversify-react"
import { observer } from "mobx-react-lite"
import { Store } from "./Store"
import { useGetSize } from "./helpers"

const TimeLeft = () => {
  const store = useInjection(Store)
  const fontSize = useGetSize("timeLeft")

  return <text className="timeLeft" fontSize={fontSize} x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
    {store.formatedTime}
  </text>
}

export default observer(TimeLeft)
