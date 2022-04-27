import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DocumentIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      d="M9.491 23.658h11.39c.625 0 1.13-.513 1.13-1.145 0-.633-.505-1.145-1.13-1.145H9.479c-.624 0-1.13.512-1.13 1.145 0 .632.506 1.145 1.13 1.145h.013ZM9.491 16.968h11.39c.436.049.861-.16 1.094-.536a1.173 1.173 0 0 0 0-1.232 1.138 1.138 0 0 0-1.094-.536H9.477a1.153 1.153 0 0 0-1.018 1.152c0 .591.439 1.088 1.018 1.152h.014ZM9.491 10.279h4.339a1.153 1.153 0 0 0 1.018-1.152c0-.591-.439-1.088-1.018-1.153H9.49a1.153 1.153 0 0 0-1.018 1.153c0 .59.439 1.087 1.018 1.152Z"
      fill="currentColor"
    />
    <Path
      d="M20.165 0H8.64C3.84 0 .966 2.919.966 7.828v14.395c0 4.896 2.874 7.828 7.674 7.828.548-.062.962-.534.962-1.095 0-.561-.414-1.033-.962-1.095-3.668 0-5.528-1.897-5.528-5.638V7.828c0-3.742 1.86-5.639 5.528-5.639h11.525c3.669 0 5.516 1.897 5.516 5.639v14.395c0 3.741-1.847 5.639-5.516 5.639h-4.253a1.094 1.094 0 0 0-.962 1.094c0 .561.415 1.033.962 1.095h4.266c4.813 0 7.675-2.932 7.675-7.828V7.828C27.84 2.932 24.965 0 20.165 0Z"
      fill="currentColor"
    />
  </Svg>
)

export default DocumentIcon
