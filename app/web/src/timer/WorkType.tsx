import { observer } from "mobx-react-lite"
import { useGetSize } from "./helpers"
import { useInjection } from "inversify-react"
import { Store } from "./Store"

const WorkType = () => {
  const store = useInjection(Store)
  const fontSize = useGetSize("workType")
  return <text
    x="50%"
    y="95%"
    dominantBaseline="middle"
    textAnchor="middle"
    fontSize={fontSize}
  >
    {store.currentWorkType}
  </text>
}

export default observer(WorkType)
