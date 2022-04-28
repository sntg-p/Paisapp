import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PaymentIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      d="M11 6H8v6H3V6H0l5.5-6L11 6Zm1.5 14 5.5-6h-3V8h-5v6H7l5.5 6Z"
      fill="currentColor"
    />
  </Svg>
)

export default PaymentIcon
