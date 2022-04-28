import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const TransferIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M13.532.725c0 .4-.325.725-.725.725a5.08 5.08 0 0 0-5.074 5.074v7.008h3.141c.638 0 .96.768.524 1.226l-5.075 5.316a.724.724 0 0 1-1.047 0L.2 14.758a.726.726 0 0 1 .524-1.226h3.141V7.491C3.866 3.361 7.227 0 11.357 0h1.45c.4 0 .725.325.725.725Z"
      fill="currentColor"
    />
    <Path
      d="M20.54 9.666h-3.142v6.04c0 4.131-3.36 7.492-7.49 7.492h-1.45a.725.725 0 0 1 0-1.45 5.08 5.08 0 0 0 5.074-5.075V9.666h-3.141a.725.725 0 0 1-.524-1.226l5.074-5.316a.724.724 0 0 1 1.048 0l5.075 5.316a.726.726 0 0 1-.524 1.226Z"
      fill="currentColor"
    />
  </Svg>
)

export default TransferIcon
