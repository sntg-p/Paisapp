import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const TopupIcon = (props: SvgProps) => (
  <Svg
    width={13}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M7.112 21.363a.612.612 0 1 1-1.224 0 .612.612 0 0 1 1.224 0ZM11.5 4.1h-10v14.55h10V4.1Zm-2.814 8.25-1.908 1.848a.4.4 0 0 1-.556 0L4.314 12.35a.4.4 0 0 1 .557-.574L6.1 12.966V9.29a.4.4 0 0 1 .8 0v3.677l1.23-1.191a.4.4 0 1 1 .556.574Z"
      fill="currentColor"
    />
    <Path
      d="M1.6 0A1.602 1.602 0 0 0 0 1.6v20a1.602 1.602 0 0 0 1.6 1.6h9.8a1.602 1.602 0 0 0 1.6-1.6v-20A1.602 1.602 0 0 0 11.4 0H1.6Zm2.65 1.3h4.5a.4.4 0 0 1 0 .8h-4.5a.4.4 0 0 1 0-.8ZM6.5 22.774a1.412 1.412 0 1 1 0-2.823 1.412 1.412 0 0 1 0 2.823ZM12.3 3.7v15.35a.4.4 0 0 1-.4.4H1.1a.4.4 0 0 1-.4-.4V3.7c0-.22.18-.4.4-.4h10.8c.22 0 .4.18.4.4Z"
      fill="currentColor"
    />
  </Svg>
)

export default TopupIcon
