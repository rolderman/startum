import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Stack } from '@mantine/core'

function Comp(props) {
  
  return (
    <Stack {...props} sx={props.sx?.length && {...props.sx[0]}}>
      {props.children}
    </Stack>
  )
}

const nodeParams = {
  name: 'stack',
  noodlName: 'Stack',
  version: '0.0.1',
  fieldsDefName: 'stack',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const StackNode = getReactNode(nodeParams)
export default StackNode