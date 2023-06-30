import { useDisclosure, useShallowEffect } from '@mantine/hooks'
import { Drawer, Text, Stack } from '@mantine/core'

function Comp(props) {
  const { children, drawerVisible, drawerHided, title } = props

  const [opened, { open, close }] = useDisclosure(false)
  useShallowEffect(() => { if (drawerVisible) open() }, [drawerVisible])
  useShallowEffect(() => { if (!opened) drawerHided() }, [opened])

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={<Text fw={700}>{title}</Text>}
      position='right'
      overlayProps={{ opacity: 0.5, blur: 2 }}
      size='sm'
      children={<Stack>{children}</Stack>}
    >
    </Drawer>
  )
}

const name = 'drawer', noodlName = 'Drawer', version = '0.0.1'
const DrawerNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    title: { type: 'string', displayName: 'Drawer title', group: 'Drawer' },
    drawerVisible: { type: 'boolean', displayName: 'Drawer visible', group: 'Drawer' },
  },
  outputProps: {
    drawerHided: { type: 'signal', displayName: 'Drawer hided' },
  }
}

export default DrawerNode