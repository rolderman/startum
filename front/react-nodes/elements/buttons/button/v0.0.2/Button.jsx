import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import { Button } from "@mantine/core"
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const { formatValue, template, itemId, value, iconName, iconSize } = props

  const Icon = iconName && Icons['Icon' + iconName]
  return (
    <Button
      type="submit"
      leftIcon={iconName && <Icon size={iconSize} />}
      {...props}
      sx={props.sx?.length && { ...props.sx[0] }}
      onClick={() => props.sendClicked()}
    >
      {formatValue ? Mustache.render(template, Noodl.Objects[itemId]) : value}
    </Button>
  )
}

const nodeParams = {
  name: 'button',
  noodlName: 'Button',
  version: '0.0.2',
  fieldsDefName: 'button_v_0_0_2',
  allowChildren: false,
  Comp
}
const ButtonNode_v_0_0_2 = getReactNode(nodeParams)
export default ButtonNode_v_0_0_2