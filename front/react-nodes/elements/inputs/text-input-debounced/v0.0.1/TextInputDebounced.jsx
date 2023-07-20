import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { TextInput, Loader, CloseButton } from '@mantine/core'
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks'
import { useState } from 'react'
import * as Icons from '@tabler/icons-react'

function Comp(props) {
  const Icon = props.iconName && Icons['Icon' + props.iconName]

  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 350)

  useShallowEffect(() => {
    if (debounced.length > 0) {
      props.text(debounced)
      props.sendTyped()
    } else {
      props.text(debounced)
      props.sendReset()
    }
  }, [debounced])

  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={props.loading
        ? <Loader size="xs" />
        : <CloseButton onClick={() => {
          props.searchEnabled(false)          
          setValue('')
        }} />}
      icon={<Icon size={props.iconSize} />}
      {...props}
      {...props.form?.getInputProps(props.formField)}
      sx={props.sx?.length && { ...props.sx[0] }}
    />
  )
}

const nodeParams = {
  name: 'text-input-debounced',
  noodlName: 'TextInputDebounced',
  version: '0.0.1',
  fieldsDefName: 'textInputDebounced',
  allowChildren: false,
  Comp
}
const TextInputDebouncedNode = getReactNode(nodeParams)
export default TextInputDebouncedNode