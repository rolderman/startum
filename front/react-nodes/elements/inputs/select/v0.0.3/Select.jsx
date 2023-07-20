import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Select } from '@mantine/core'
import { convertForSelect } from "../../../../../helpers/data/v0.0.2/data"

function Comp(props) {
  const { items, useForm, form, labelField, formField, value } = props

  return <Select
    value={useForm ? form?.values[formField] : value}
    data={useForm ? items : items?.map(i => convertForSelect(i, labelField)) || []}
    {...props}
    {...form?.getInputProps(formField)} />
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