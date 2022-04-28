import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PayIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.293 4.177c-1.117-1.244-1.966-2.219-3.077-3.47a2.12 2.12 0 0 0-.463-.401v4.237c0 .143.054.28.152.382.099.102.232.16.372.16h3.563a2.68 2.68 0 0 0-.547-.908Zm-3.278 2.36a1.661 1.661 0 0 1-1.18-.51 1.738 1.738 0 0 1-.486-1.213V.003c-2.905-.004-5.81-.004-8.716 0C.63.007.002.75.002 1.912c-.004 2.797 0 15.016 0 16.113C.002 19.28.637 20 1.755 20H14.25c1.117 0 1.745-.708 1.745-1.975.004-4.52 0-6.986.004-11.487h-3.985ZM8.086 16.541a.361.361 0 0 1-.098.252.348.348 0 0 1-.244.106h-4.43a.346.346 0 0 1-.246-.106.361.361 0 0 1-.1-.252v-.704c0-.095.036-.185.1-.252a.345.345 0 0 1 .245-.106h4.43a.339.339 0 0 1 .245.106.355.355 0 0 1 .098.252v.704Zm4.945-3.403a.36.36 0 0 1-.1.252.347.347 0 0 1-.243.106H3.313a.346.346 0 0 1-.245-.106.361.361 0 0 1-.1-.252v-.704c0-.094.036-.185.1-.252a.345.345 0 0 1 .245-.106h9.375a.34.34 0 0 1 .244.106.354.354 0 0 1 .099.252v.704Zm0-3.403a.359.359 0 0 1-.1.25.34.34 0 0 1-.243.105H3.313a.34.34 0 0 1-.244-.104.354.354 0 0 1-.101-.25v-.707a.36.36 0 0 1 .101-.25.345.345 0 0 1 .244-.105h9.375c.091 0 .179.038.243.105.064.066.1.156.1.25v.706Z"
      fill="currentColor"
    />
  </Svg>
)

export default PayIcon
