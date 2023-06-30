import { noodlInputs } from '../../../../../helpers/noodl'
import { TextInput } from '@mantine/core'

function Comp(props) {
  const { marginBottom, sendEnterPressed, placeholder, label, withAsterisk } = props

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      withAsterisk={withAsterisk}
      radius="md"      
      mb={marginBottom}
    />
  )
}

const name = 'text-input', noodlName = 'TextInput', version = '0.0.1'
const TextInputNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    ...noodlInputs.inputs,
    marginBottom: {
      displayName: 'Bottom margin',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px', '%'],
        defaultUnit: 'px',
      },      
    }    
  },
  outputProps: {
    sendEnterPressed: { type: 'signal', displayName: 'Enter pressed' }
  }
}

export default TextInputNode