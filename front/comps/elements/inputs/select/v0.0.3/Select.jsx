import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Select } from '@mantine/core'

function Comp(props) {
  const { items, form, formField } = props

  return <Select data={items || []} {...props} {...form?.getInputProps(formField)} />
}

const nodeParams = {
  name: 'select',
  noodlName: 'Select',
  version: '0.0.3',
  fieldsDefName: 'select',
  allowChildren: false,
  Comp
}
const SelectNode = getReactNode(nodeParams)
export default SelectNode