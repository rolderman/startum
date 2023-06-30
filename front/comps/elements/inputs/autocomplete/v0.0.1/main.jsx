import { noodlInputs, noodlOutputs } from '../../../../../helpers/noodl'
import { Autocomplete } from '@mantine/core'
import query from '../../../../../libs/query/v0.0.1/main'

function Comp(props) {
  const { marginBottom, disabled, itemSelected, selectedItem, placeholder, label, withAsterisk } = props

  const { data } = query.fetch.list(props)

  return (
    <Autocomplete
      disabled={disabled}
      placeholder={placeholder}
      label={label}
      withAsterisk={withAsterisk}
      radius="md"
      mb={marginBottom}
      data={data?.items.map(i => ({ ...i, value: i.name })) || []}
      onItemSubmit={(e) => {
        selectedItem(e)
        itemSelected()
      }}      
    />
  )
}

const name = 'autocomplete', noodlName = 'Autocomplete', version = '0.0.1'
const AutocompleteNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    ...noodlInputs.data, ...noodlInputs.inputs,
    marginBottom: {
      displayName: 'Bottom margin',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px', '%'],
        defaultUnit: 'px',
      },
    },
    disabled: { type: 'boolean', displayName: 'Disabled', group: 'General', default: false },
  },
  outputProps: {
    ...noodlOutputs.data,
  }
}

export default AutocompleteNode