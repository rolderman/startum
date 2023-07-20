import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const Icon = props.name && Icons['Icon' + props.name]
  return (
    <Icon {...props} />
  )
}
const nodeParams = {
  name: 'icon',
  noodlName: 'Icon',
  version: '0.0.1',
  fieldsDefName: 'icon',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const IconNode = getReactNode(nodeParams)
export default IconNode