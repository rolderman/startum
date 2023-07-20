import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Group, Switch, Text } from '@mantine/core'

function Comp(props) {
  const { items, form, formField, innerSpacing, direction } = props
//{...props} {...form?.getInputProps(formField)} sx={props.sx?.length && {...props.sx[0]}}
  return (
    <Switch.Group
      size="md"
    >
      <Group mt="xs">
        <Switch value="1" onLabel={<Text fz='xs'>ПН</Text>} offLabel={<Text fz='xs'>ПН</Text>}/>
        <Switch value="2" onLabel={<Text fz='xs'>ВТ</Text>} offLabel={<Text fz='xs'>ВТ</Text>}/>
        <Switch value="3" onLabel={<Text fz='xs'>СР</Text>} offLabel={<Text fz='xs'>СР</Text>}/>
        <Switch value="4" onLabel={<Text fz='xs'>ЧТ</Text>} offLabel={<Text fz='xs'>ЧТ</Text>}/>
        <Switch value="5" onLabel={<Text fz='xs'>ПТ</Text>} offLabel={<Text fz='xs'>ПТ</Text>}/>
        <Switch value="6" color='red' onLabel={<Text fz='xs'>СБ</Text>} offLabel={<Text fz='xs'>СБ</Text>}/>
        <Switch value="7" color='red' onLabel={<Text fz='xs'>ВС</Text>} offLabel={<Text fz='xs'>ВС</Text>}/>
      </Group>
    </Switch.Group>
  )
}

const nodeParams = {
  name: 'switch-group',
  noodlName: 'SwitchGroup',
  version: '0.0.1',
  fieldsDefName: 'switchGroup',  
  allowChildren: true,
  Comp
}
const SwitchGroupNode = getReactNode(nodeParams)
export default SwitchGroupNode