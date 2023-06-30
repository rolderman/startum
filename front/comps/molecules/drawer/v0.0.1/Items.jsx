
import { NavLink } from '@mantine/core'
import GetIcon from '../../../../libs/icons/v0.0.1/main'

function NavbarItems(props) {
  function Item(item) {
    const Icon = GetIcon(item.iconName)
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