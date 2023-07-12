import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { SegmentedControl } from '@mantine/core'

function Comp(props) {
  const { items, form, formField, value } = props
  props.orientation = props.orientation && 'vertical'

  return (
    <SegmentedControl value={value || undefined} data={items || []} {...props} {...form?.getInputProps(formField)} sx={props.sx?.length && { ...props.sx[0] }} />
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