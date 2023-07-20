import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { useDisclosure, useShallowEffect } from '@mantine/hooks'
import { Drawer, Text } from '@mantine/core'

function Comp(props) {
  const { children, show, hided, drawerTitle } = props

  const [opened, { open, close }] = useDisclosure(false)
  useShallowEffect(() => {
    if (show) open()
    else close()
  }, [show])
  useShallowEffect(() => { if (!opened) hided() }, [opened])
  
  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={<Text fw={700}>{drawerTitle}</Text>}
      overlayProps={{ opacity: 0.5, blur: 2 }}
      children={children}
      {...props}
    >
    </Drawer>
  )
}

const nodeParams = {
  name: 'drawer',
  noodlName: 'Drawer',
  version: '0.0.2',
  fieldsDefName: 'drawer',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const DrawerNode = getReactNode(nodeParams)
export default DrawerNode