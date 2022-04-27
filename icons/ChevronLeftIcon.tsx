import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChevronLeftIcon = (props: SvgProps) => (
  <Svg
    width={9}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.67.314c.44.418.44 1.097 0 1.515L2.717 7.5l5.955 5.671c.439.418.439 1.097 0 1.515a1.165 1.165 0 0 1-1.591 0L.33 8.258a1.036 1.036 0 0 1 0-1.516L7.08.314a1.165 1.165 0 0 1 1.59 0Z"
      fill="currentColor"
    />
  </Svg>
)

export default ChevronLeftIcon
