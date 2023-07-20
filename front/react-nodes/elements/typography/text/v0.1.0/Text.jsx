import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Text } from "@mantine/core"

function Comp(props) {
  const { formatValue, template, itemId, value } = props

  return (
    <Text {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      {formatValue ? Mustache.render(template, Noodl.Objects[itemId]) : value}
    </Text>
  )
}
const nodeParams = {
  name: 'text',
  noodlName: 'Text',
  version: '0.1.0',
  fieldsDefName: 'text',
  allowChildren: false,
  Comp
}
const TextNode_v_0_1_0 = getReactNode(nodeParams)
export default TextNode_v_0_1_0