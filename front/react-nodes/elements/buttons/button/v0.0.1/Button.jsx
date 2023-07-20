import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import { Button } from "@mantine/core"
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const Icon = props.iconName && Icons['Icon' + props.iconName]
  return (
    <Button type="submit" leftIcon={props.iconName && <Icon size={props.iconSize} />} {...props} sx={props.sx?.length && { ...props.sx[0] }} onClick={() => props.sendClicked()}>
      {props.title}
    </Button>
  )
}

const nodeParams = {
  name: 'button',
  noodlName: 'Button',
  version: '0.0.1',
  fieldsDefName: 'button',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const ButtonNode = getReactNode(nodeParams)
export default ButtonNode