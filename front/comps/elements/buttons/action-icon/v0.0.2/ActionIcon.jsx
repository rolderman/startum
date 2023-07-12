import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import { ActionIcon } from "@mantine/core"
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const Icon = Icons['Icon' + props.iconName]
  return (
    <ActionIcon {...props} sx={props.sx?.length && {...props.sx[0]}} onClick={() => props.sendClicked()}>
       <Icon size={props.iconSize} />
    </ActionIcon>
  )
}

const nodeParams = {
  name: 'action-icon',
  noodlName: 'ActionIcon',
  version: '0.0.2',
  fieldsDefName: 'actionIcon',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const ActionIconNode = getReactNode(nodeParams)
export default ActionIconNode