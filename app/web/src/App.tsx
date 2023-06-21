import { Timer } from './timer'
import { observer } from "mobx-react-lite"

function App() {
  return <div className="wrapper">
    <Timer />
  </div>
}

export default observer(App)
