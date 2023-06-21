import { observer } from "mobx-react-lite"
import { useGetSize } from "./helpers"
import { useInjection } from "inversify-react"
import { Store } from "./Store"

const PauseBlock = () => {
  const size = useGetSize("pause")
  const svgSize = useGetSize("svg")
  const store = useInjection(Store)

  if (!store.isPause) return null

  return <svg x={svgSize / 2 - size / 2} y={svgSize / 2 - size / 2} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" rx="7%" fill="white" fill-opacity="0.7" />
    <rect x="27%" y="17%" width="13%" height="67%" rx="7%" fill="black" />
    <rect x="57%" y="17%" width="13%" height="67%" rx="7%" fill="black" />
  </svg>

}

export default observer(PauseBlock)
