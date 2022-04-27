import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={19}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M9.143 17.287A8.143 8.143 0 1 0 9.143 1a8.143 8.143 0 0 0 0 16.287Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.807 15.23 18 18.415"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SearchIcon
