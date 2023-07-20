import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Flex } from '@mantine/core'

function Comp(props) {
  return (
    <Flex {...props} sx={props.sx?.length && {...props.sx[0]}}>
      {props.children}
    </Flex>
  )
}

const nodeParams = {
  name: 'flex',
  noodlName: 'Flex',
  version: '0.0.1',
  fieldsDefName: 'flex',
  allowChildren: true,
  Comp
}
const FlexNode = getReactNode(nodeParams)
export default FlexNode