import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const WalletIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M19.65 17.255h-3.354a3.839 3.839 0 0 1-3.835-3.835 3.839 3.839 0 0 1 3.835-3.834h3.355a.48.48 0 0 0 .48-.48V7.67c0-1.005-.78-1.823-1.765-1.902L15.613.96a1.894 1.894 0 0 0-2.602-.7L3.574 5.751H1.917A1.92 1.92 0 0 0 0 7.669v11.503c0 1.057.86 1.917 1.917 1.917h16.296a1.92 1.92 0 0 0 1.917-1.917v-1.438a.48.48 0 0 0-.48-.48ZM16.208 3.928l1.045 1.824h-4.178l3.133-1.824ZM5.48 5.752l8.013-4.665a.94.94 0 0 1 1.288.35l-7.41 4.315H5.48Z"
      fill="currentColor"
    />
    <Path
      d="M19.65 10.545h-3.355a2.879 2.879 0 0 0-2.875 2.875 2.879 2.879 0 0 0 2.875 2.876h3.355a1.44 1.44 0 0 0 1.438-1.438v-2.876a1.44 1.44 0 0 0-1.438-1.437Zm-3.355 3.834a.96.96 0 0 1-.958-.959.96.96 0 0 1 1.917 0 .96.96 0 0 1-.959.959Z"
      fill="currentColor"
    />
  </Svg>
)

export default WalletIcon
