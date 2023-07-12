import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Autocomplete } from '@mantine/core'

function Comp(props) {
  const { items, form, formField } = props

  return <Autocomplete data={items || []} {...props} {...form?.getInputProps(formField)} />
}

const nodeParams = {
  name: 'autocomplete',
  noodlName: 'Autocomplete',
  version: '0.0.1',
  fieldsDefName: 'autocomplete',
  allowChildren: false,
  Comp
}
const AutocompleteNode = getReactNode(nodeParams)
export default AutocompleteNode