import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Group, Radio, Stack } from '@mantine/core'

function Comp(props) {
  const { items, form, formField, innerSpacing, direction } = props

  return (
    <Radio.Group {...props} {...form?.getInputProps(formField)} sx={props.sx?.length && {...props.sx[0]}}>
      {direction === 'row'
        ?
        <Group spacing={innerSpacing}>
          {items?.map(item => <Radio value={item.value} label={item.label} />)}
        </Group>
        :
        <Stack spacing={innerSpacing}>
          {items?.map(item => <Radio value={item.value} label={item.label} />)}
        </Stack>
      }
    </Radio.Group>
  )
}

const nodeParams = {
  name: 'radio-group',
  noodlName: 'RadioGroup',
  version: '0.0.2',
  fieldsDefName: 'radioGroup',  
  allowChildren: true,
  Comp
}
const RadioGroupNode = getReactNode(nodeParams)
export default RadioGroupNode