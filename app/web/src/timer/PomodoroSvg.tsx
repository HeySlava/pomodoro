import { observer } from "mobx-react-lite"
import { useGetSize } from "./helpers"
import { FC, SVGProps } from "react"

const PomodoroSvg: FC<SVGProps<SVGSVGElement>> = (props) => {
  const size = useGetSize("pomodoro")
  return <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size}
    height={size}
    viewBox="0 0 310.56 310.56"
  >
    <path
      d="M236.65 109.927c-6.128 2.271-13.803 4.43-22.844 5.635 1.528 8.948 1.216 22.677-9.728 35.708a7.517 7.517 0 0 1-11.224.328c-9.34-9.882-27.036-26.162-37.572-30.884-10.543 4.717-28.213 20.981-37.535 30.852a7.522 7.522 0 0 1-11.226-.326c-10.956-13.04-11.273-26.771-9.751-35.719a106.712 106.712 0 0 1-16.088-3.442c.71.208 1.383.426 2.122.625-19.312 9.053-48.22 31.265-48.063 83.085.088 29.012 13.567 53.968 38.981 72.172 23.068 16.523 54.488 26.138 89.152 27.408-2.517.089-5.044.149-7.592.149 37.778 0 72.246-9.787 97.057-27.557 25.414-18.204 38.895-43.16 38.983-72.172.17-58.166-36.286-79.043-54.672-85.862zM78.453 111.423z"
      style={{
        fill: "#ce593f",
      }}
    />
    <path
      d="M228.11 93.069zM232.921 95.278zM222.736 90.8zM217.319 88.726zM203.749 101.385c8.226-.406 34.24-5.533 40.151-7.211-25.874-8.948-48.642-15.557-48.898-15.546-2.056.01-3.966-.744-5.403-2.155a7.531 7.531 0 0 1-2.256-5.357l-.013-2.468a46.55 46.55 0 0 0-2.355-.047c-2.056.01-19.765 9.788-21.203 8.378a7.527 7.527 0 0 1-2.256-5.357s-.112-22.664-.137-25.023c-.067-6.412-.308-11.473 3.639-15.528 2.143-2.2 4.82-3.379 8.326-4.001l-1.386-2.013h-2.141c-15.236 0-14.081 11.465-14.14 11.842l.018 44.728a7.519 7.519 0 0 1-2.258 5.377 7.577 7.577 0 0 1-5.419 2.147c-.283-.008-20.291-.224-49.609 11.403 2.669.37 5.472.65 8.418.797 2.505.125 4.783 1.492 6.074 3.643s1.422 4.804.352 7.073c-.217.484-4.792 10.907.286 22.359 9.567-9.348 26.971-25.057 39.527-28.938a7.465 7.465 0 0 1 4.444.003l.002-.002c12.56 3.89 29.975 19.613 39.547 28.967 5.161-11.647.321-22.222.26-22.35a7.52 7.52 0 0 1 6.43-10.721zM91.095 99.239c-.394-.087-.793-.171-1.178-.261.386.09.784.174 1.178.261zM86.861 98.213c-.208-.056-.402-.116-.608-.173.206.057.4.117.608.173zM83.858 97.341c-.325-.1-.641-.202-.958-.303.318.102.632.203.958.303zM80.965 96.394c-.271-.094-.546-.187-.81-.281.265.095.539.188.81.281zM98.308 100.542c-.37-.052-.724-.114-1.089-.169.365.055.719.117 1.089.169zM212.83 87.177zM94.671 99.955zM198.99 83.232zM175.322 79.406zM177.79 79.621zM175.004 79.382zM171.542 79.182zM180.366 79.894zM225.578 97.758zM187.127 80.843zM202.995 84.239zM194.69 82.26zM190.501 81.426zM183.644 80.315zM207.9 85.625z"
      style={{
        fill: "#84bd93",
      }}
    />
    <path
      d="M253.918 101.192a7.51 7.51 0 0 0 2.724-6.128 7.52 7.52 0 0 0-3.692-6.131c-32.363-19.08-62.663-23.529-76.4-24.547 0 0-.035-21.369 0-22.576 2.742-.393 8.046-.393 10.645-.393a7.521 7.521 0 0 0 6.189-11.796l-18.22-26.375A7.52 7.52 0 0 0 168.975 0h-9.187c-13.698 0-25.024 10.7-25.78 24.21 0 0-.043 1.011-.043 1.506l.016 38.655c-13.745 1.011-44.036 5.442-76.369 24.491a7.525 7.525 0 0 0-3.696 6.129 7.509 7.509 0 0 0 2.777 6.173C34.154 112.952 4.028 139.285 4.2 195.834c.102 33.562 16.176 63.521 45.264 84.355 27.343 19.585 64.923 30.371 105.815 30.371s78.472-10.786 105.815-30.371c29.086-20.834 45.162-50.791 45.266-84.355.168-56.5-29.907-82.84-52.442-94.642zm-1.582 166.769c-24.811 17.771-59.279 27.557-97.057 27.557s-72.246-9.787-97.057-27.557c-25.414-18.203-38.892-43.16-38.981-72.172-.176-58.254 36.387-79.106 54.747-85.891 6.12 2.265 13.772 4.418 22.779 5.623-1.522 8.947-1.204 22.679 9.752 35.719a7.517 7.517 0 0 0 11.226.326c9.323-9.871 26.992-26.134 37.535-30.852 10.537 4.722 28.232 21.002 37.572 30.884a7.516 7.516 0 0 0 11.224-.328c10.944-13.031 11.256-26.759 9.728-35.708 9.04-1.204 16.716-3.364 22.844-5.635 18.386 6.818 54.843 27.695 54.668 85.862-.086 29.012-13.566 53.968-38.98 72.172zM141.346 79.124a7.58 7.58 0 0 0 5.419-2.147 7.514 7.514 0 0 0 2.258-5.375l-.018-44.725c.059-.377-.237-11.835 10.782-11.835h5.243l8.312 12.034c-3.506.622-6.183 1.794-8.326 3.994-3.946 4.055-3.706 9.116-3.639 15.528.026 2.359.137 25.023.137 25.023a7.537 7.537 0 0 0 2.256 5.357c1.438 1.411 3.347 2.165 5.404 2.155.312-.014 29.57-.276 63.746 16.145-6.97 2.732-16.851 5.499-29.172 6.107a7.523 7.523 0 0 0-6.432 10.72c.061.127 4.9 10.702-.26 22.35-9.571-9.354-26.987-25.077-39.547-28.967l-.002.002a7.465 7.465 0 0 0-4.444-.003c-12.556 3.881-29.96 19.59-39.527 28.938-5.078-11.452-.503-21.875-.286-22.358a7.52 7.52 0 0 0-6.426-10.716c-12.219-.612-22.128-3.407-29.139-6.157 34.126-16.363 63.344-16.079 63.661-16.07z"
      style={{
        fill: "#3f2d20",
      }}
    />
  </svg>
}


export default observer(PomodoroSvg)