import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Text } from "@mantine/core"

function Comp(props) {
  return (
    <Text {...props} sx={props.sx?.length && {...props.sx[0]}}>
      {props.text}
    </Text>
  )
}
const nodeParams = {
  name: 'text',
  noodlName: 'Text',
  version: '0.0.2',
  fieldsDefName: 'text',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const TextNode = getReactNode(nodeParams)
export default TextNode