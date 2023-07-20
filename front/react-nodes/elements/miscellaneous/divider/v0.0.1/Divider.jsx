import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Divider } from "@mantine/core"

function Comp(props) {
  return (
    <Divider {...props} sx={props.sx?.length && {...props.sx[0]}} />
  )
}
const nodeParams = {
  name: 'divider',
  noodlName: 'Divider',
  version: '0.0.1',
  fieldsDefName: 'divider',
  allowChildren: false,
  Comp
}
const DividerNode = getReactNode(nodeParams)
export default DividerNode