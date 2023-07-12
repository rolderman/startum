import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Group } from '@mantine/core'

function Comp(props) {
  return (
    <Group {...props} sx={props.sx?.length && {...props.sx[0]}}>
      {props.children}
    </Group>
  )
}

const nodeParams = {
  name: 'group',
  noodlName: 'Group',
  version: '0.0.1',
  fieldsDefName: 'group',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const GroupNode = getReactNode(nodeParams)
export default GroupNode