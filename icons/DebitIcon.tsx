import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DebitIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M9 4h6v8h4.84L12 19.84 4.16 12H9V4Z" 
      fill="currentColor"
    />
  </Svg>
)

export default DebitIcon
