import { getReactNode } from "../../../../../helpers/noodl/v0.0.2/get-react-node"
import { Slider } from '@mantine/core'

function Comp(props) {
  const { items, form, formField } = props

  return <Slider marks={items} label={(value) => items.find(i => i.value === value).tooltipLabel} {...props} {...form?.getInputProps(formField)} />
}

const nodeParams = {
  name: 'slider',
  noodlName: 'Slider',
  version: '0.0.3',
  fieldsDefName: 'slider',
  allowChildren: false,
  Comp
}
const SliderNode = getReactNode(nodeParams)
export default SliderNode