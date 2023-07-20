import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Checkbox } from '@mantine/core'

function Comp(props) {
  const { form, formField } = props

  return <Checkbox {...props} {...form?.getInputProps(formField)} sx={props.sx?.length && { ...props.sx[0] }} />
}

const nodeParams = {
  name: 'checkbox',
  noodlName: 'Checkbox',
  version: '0.0.2',
  fieldsDefName: 'checkbox',
  allowChildren: false,
  Comp
}
const CheckboxNode = getReactNode(nodeParams)
export default CheckboxNode