import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Loader } from "@mantine/core"

function Comp(props) {
  return (
    <Loader {...props} sx={props.sx?.length && { ...props.sx[0] }} />
  )
}
const nodeParams = {
  name: 'loader',
  noodlName: 'Loader',
  version: '0.0.1',
  fieldsDefName: 'loader',
  allowChildren: false,
  Comp
}
const LoaderNode = getReactNode(nodeParams)
export default LoaderNode