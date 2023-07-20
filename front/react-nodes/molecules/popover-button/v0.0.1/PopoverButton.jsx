import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Popover, Text, ActionIcon, Button, Group } from '@mantine/core'
import * as Icons from '@tabler/icons-react'
import { useState } from 'react'

function Comp(props) {
  const { } = props
  const Icon = props.iconName && Icons['Icon' + props.iconName]
  const Check = Icons['IconCheck']

  const [opened, setOpened] = useState(false)
  return (
    <Popover withArrow opened={opened} onChange={setOpened} {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      <Popover.Target>
        <Button
          leftIcon={props.iconName && <Icon size={props.iconSize} />}
          onClick={() => { setOpened((o) => !o) }}
          {...props}
          sx={props.sx?.length && { ...props.sx[0] }}>
          {props.title}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <Text size="sm">Уверены?</Text>
          <ActionIcon variant="filled" color='blue' type="submit" onClick={() => {
            props.sendClicked()
            setOpened((o) => !o)
          }} >
            <Check />
          </ActionIcon>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

const nodeParams = {
  name: 'popover-button',
  noodlName: 'PopoverButton',
  version: '0.0.1',
  fieldsDefName: 'popoverButton',
  allowChildren: false,
  Comp
}
const PopoverButtonNode = getReactNode(nodeParams)
export default PopoverButtonNode