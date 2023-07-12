import { NavLink } from '@mantine/core'
import * as Icons from '@tabler/icons-react'

function NavbarItems(props) {
  function Item(item) {
    const Icon = Icons['Icon' + item.iconName]
    return (
      <NavLink
        key={item.label}
        active={item.path === props.selectedNavbarItem?.path}
        label={item.label}
        color={item.color}
        icon={<Icon size="1rem" />}
        onClick={() => props.sendNavbarItem(item)}
      />
    )
  }

  const items = props.items.map((item) => Item(item))  
  return items
}

export default NavbarItems