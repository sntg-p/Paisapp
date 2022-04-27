import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const NotificationIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M1 12.198v-.208a3.42 3.42 0 0 1 .572-1.728 4.627 4.627 0 0 0 1.134-2.198c0-.633 0-1.275.055-1.908C3.047 3.108 6.061 1 9.038 1h.074c2.977 0 5.99 2.107 6.286 5.156.055.633 0 1.275.046 1.908a4.708 4.708 0 0 0 1.133 2.207c.347.511.544 1.105.572 1.719v.199a3.389 3.389 0 0 1-.802 2.27 4.28 4.28 0 0 1-2.71 1.303 42.828 42.828 0 0 1-9.134 0 4.327 4.327 0 0 1-2.71-1.303 3.423 3.423 0 0 1-.792-2.261Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.752 18.91a2.934 2.934 0 0 0 4.074.48c.186-.14.353-.301.498-.48"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default NotificationIcon
