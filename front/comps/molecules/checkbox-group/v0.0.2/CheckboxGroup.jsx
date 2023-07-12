import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Group, Checkbox, Stack, Box, Text } from '@mantine/core'

function Comp(props) {
  const { items, form, formField, direction, grow, spacing, disabled } = props

  return (
    <Checkbox.Group {...props} {...form?.getInputProps(formField)} sx={props.sx?.length && { ...props.sx[0] }}>
      {direction === 'row'
        ?
        <Group grow={grow} mr='-1rem' mb='1rem'>
          {items?.map((i) => <Box><Text fz="sm">{i.label}</Text><Checkbox mt={8} value={i.value} disabled={disabled} /></Box>)}
        </Group>
        :
        <Stack spacing={spacing}>
          {items?.map((i) => <Box><Text fz="sm">{i.label}</Text><Checkbox mt={8} value={i.value} disabled={disabled} /></Box>)}
        </Stack>
      }
    </Checkbox.Group>
  )
}

const nodeParams = {
  name: 'checkbox-group',
  noodlName: 'CheckboxGroup',
  version: '0.0.2',
  fieldsDefName: 'checkboxGroup',
  allowChildren: true,
  Comp
}
const CheckboxGroupNode = getReactNode(nodeParams)
export default CheckboxGroupNode