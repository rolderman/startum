import { useRef, useState } from 'react'
import { AppShell, Navbar, Header, Text, Avatar, Container, MediaQuery, Footer, Burger, useMantineTheme, Group } from "@mantine/core"
import { useShallowEffect } from '@mantine/hooks'
import NavbarItems from './NavbarItems'
import HeaderItems from './HeaderItems'
import parsePath from './path-parser'

function Comp(props) {
  const rootRef = useRef()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const {
    enableHeader, headerHeight = 48,
    enableFooter,
    enableNavbar, navbarWidthSm = 160, navbarWidthLg = 240,
    navItems
  } = props

  const [navData, setNavData] = useState({})
  useShallowEffect(() => {
    if (navItems) {
      setNavData({
        navbarItems: navItems?.filter(i => i.path.split('/').length === 2),
        ...parsePath(navItems, window.location.pathname)
      })
    }
  }, [navItems])

  const sendNavItem = (navbarItem, headerItem) => {
    const path = navbarItem ? navbarItem.path : headerItem.path
    setNavData({
      navbarItems: navData.navbarItems,
      ...parsePath(navItems, path)
    })
    props.selectedPath(path)
    props.pathChanged()
  }

  return (
    <AppShell
      ref={rootRef}
      layout='alt'
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={enableNavbar &&
        <Navbar withBorder={false} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: navbarWidthSm, lg: navbarWidthLg }}
          sx={{ background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1] }}
        >
          <Container>
            <Navbar.Section mt="md">
              <Avatar variant='filled' size='xl' radius={64} color='dark'>
                <Text fz='xl'>ЖКХ</Text>
              </Avatar>
            </Navbar.Section>
          </Container>
          <Navbar.Section grow mt="md">
            <NavbarItems items={navData.navbarItems || []} sendNavbarItem={(navbarItem) => sendNavItem(navbarItem)} selectedNavbarItem={navData.navbarItem} />
          </Navbar.Section>
        </Navbar>
      }
      footer={enableFooter &&
        <Footer withBorder={false} height={60} p="md">
          Application footer
        </Footer>
      }
      header={enableHeader &&
        <Header withBorder={false} height={{ base: headerHeight }} px="xl">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group h='100%'>
              <HeaderItems items={navData.headerItems || []} sendHeaderItem={(headerItem) => sendNavItem(null, headerItem)} selectedHeaderItem={navData.headerItem} />
            </Group>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell >
  )
}

const name = 'app-shell', noodlName = 'AppShell', version = '0.0.3'
const AppShellNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  dynamicports: [
    { condition: 'enableHeader = true', inputs: ['headerHeight'] },
    { condition: 'enableNavbar = true', inputs: ['navbarWidth'] },
    { condition: 'navbarWidth = true', inputs: ['navbarWidthSm', 'navbarWidthLg'] },
  ],
  inputProps: {
    enableHeader: { type: 'boolean', displayName: 'Header', group: 'App layout' },
    headerHeight: { type: 'number', displayName: 'Height', group: 'Header', default: 48 },
    enableFooter: { type: 'boolean', displayName: 'Footer', group: 'App layout' },
    enableNavbar: { type: 'boolean', displayName: 'Navbar', group: 'App layout' },
    navbarWidth: { type: 'boolean', displayName: 'Change default width', group: 'Navbar' },
    navbarWidthSm: { type: 'number', displayName: 'sm', group: 'Navbar', default: 160 },
    navbarWidthLg: { type: 'number', displayName: 'lg', group: 'Navbar', default: 240 },
    navItems: { type: 'array', displayName: 'Navigation items', group: 'Navigation' },
  },
  outputProps: {
    selectedPath: { type: 'string', displayName: 'Selected path', group: 'Navigation' },
    pathChanged: { type: 'signal', displayName: 'Path changed', group: 'Navigation' },
  }
}

export default AppShellNode