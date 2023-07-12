import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Avatar } from "@mantine/core"

function Comp(props) {
  return (
    <Avatar {...props} sx={props.sx?.length && {...props.sx[0]}}>
      {props.children}
    </Avatar>
  )
}
const nodeParams = {
  name: 'avatar',
  noodlName: 'Avatar',
  version: '0.0.2',
  fieldsDefName: 'avatar',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const AvatarNode = getReactNode(nodeParams)
export default AvatarNode