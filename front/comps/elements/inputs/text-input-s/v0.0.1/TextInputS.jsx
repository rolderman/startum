import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { TextInput, Loader, CloseButton } from '@mantine/core'
import { useDebouncedValue, useShallowEffect } from '@mantine/hooks'
import { useState } from 'react'
import * as Icons from '@tabler/icons-react'
import useData from "../../../../../libs/use-data/v0.0.2/use-data"

function Comp(props) {
  const { classNames, fields, options } = props
  const Icon = props.iconName && Icons['Icon' + props.iconName]

  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 350)

  const { isFetching, fetchStatus, data } = useData.search({ classNames, query: [{ searchString: debounced, fields }], options })

  useShallowEffect(() => {
    props.searchEnabled(debounced.length > 0 ? true : false)
    if (fetchStatus === 'idle') props.foundedData(data)
  }, [debounced, fetchStatus])

  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      icon={<Icon size={props.iconSize} />}
      rightSection={isFetching
        ? <Loader size="xs" />
        : <CloseButton onClick={() => {
          props.searchEnabled(false)          
          setValue('')
        }} />}
      {...props}
      sx={props.sx?.length && { ...props.sx[0] }}
    />
  )
}

const nodeParams = {
  name: 'text-input-s',
  noodlName: 'TextInputS',
  version: '0.0.1',
  fieldsDefName: 'textInputS',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const TextInputSNode = getReactNode(nodeParams)
export default TextInputSNode