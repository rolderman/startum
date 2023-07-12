import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { TextInput } from '@mantine/core'

function Comp(props) { 
  return (
    <TextInput {...props} {...props.form?.getInputProps(props.formField)}
    />
  )
}

const nodeParams = {
  name: 'text-input',
  noodlName: 'TextInput',
  version: '0.0.2',
  fieldsDefName: 'textInput',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const TextInputNode = getReactNode(nodeParams)
export default TextInputNode