import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { SegmentedControl } from '@mantine/core'
import { useState } from 'react'

function Comp(props) {
  const { items, form, formField, value } = props
  props.orientation = props.orientation && 'vertical'

  const [localValue, setLocalValue] = useState(items?.[0].value)

  return (
    <SegmentedControl
      value={value || localValue}
      data={items || []}
      onChange={(v) => {
        props.selectedValue(v)
        setLocalValue(v)
      }}
      {...props}
      {...form?.getInputProps(formField)}
      sx={props.sx?.length && { ...props.sx[0] }}
    />
  )
}

const nodeParams = {
  name: 'segmented-control',
  noodlName: 'SegmentedControl',
  version: '0.0.1',
  fieldsDefName: 'segmentedControl',
  allowChildren: false,
  Comp
}
const SegmentedControlNode = getReactNode(nodeParams)
export default SegmentedControlNode