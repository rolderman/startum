import { getReactNode } from "../../../../../helpers/noodl/v0.1.0/get-node"
import { Text } from "@mantine/core"

function Comp(props) {
  return (
    <Text {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      {props.value}
    </Text>
  )
}
const nodeParams = {
  name: 'text',
  noodlName: 'Text',
  version: '0.2.0',
  fieldsDefinitionName: 'text',
  allowChildren: false,
  Comp
}
const TextNode_v_0_2_0 = getReactNode(nodeParams)
export default TextNode_v_0_2_0