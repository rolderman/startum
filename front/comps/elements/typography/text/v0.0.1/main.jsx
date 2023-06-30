import { useRef } from 'react'
import { Text } from "@mantine/core"

function Comp(props) {
  const rootRef = useRef()
  const { marginBottom, fontSize, fontWeight, text } = props

  return (
        <Text ref={rootRef} fz={fontSize} fw={fontWeight} mb={marginBottom}>{text}</Text>
  )
}

const name = 'text', noodlName = 'Text', version = '0.0.1'
const TextNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    marginBottom: {
      displayName: 'Bottom margin',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px', '%'],
        defaultUnit: 'px',
      },
      default: 24,
    },
    fontSize: {
      displayName: 'Font size',
      group: 'Style',
      type: 'string',
      default: 'md',
    },
    fontWeight: {
      displayName: 'Font weight',
      group: 'Style',
      type: 'number',
      default: 400,
    },
    text: {
      displayName: 'Text',
      group: 'Style',
      type: 'string',
      default: 'text',
    },
  }
}

export default TextNode