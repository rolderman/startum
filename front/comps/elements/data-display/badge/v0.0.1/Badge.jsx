import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Badge, Avatar } from "@mantine/core"
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const Icon = props.iconName && Icons['Icon' + props.iconName]
  const avatar = (
    <Avatar size={24} mr={5}>
      <Icon size={props.iconSize} />
    </Avatar>
  )
  return (
    <Badge pl={props.iconName && 0} leftSection={props.iconName && avatar} {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      {props.text}
    </Badge>
  )
}
const nodeParams = {
  name: 'badge',
  noodlName: 'Badge',
  version: '0.0.1',
  fieldsDefName: 'badge',
  Comp
}
const BadgeNode = getReactNode(nodeParams)
export default BadgeNode