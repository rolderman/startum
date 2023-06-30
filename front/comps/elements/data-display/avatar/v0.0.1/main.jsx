import { useRef } from 'react'
import { Box, Avatar, Text } from "@mantine/core"

function Comp(props) {
  const rootRef = useRef()
  const { marginBottom } = props

  return (
    <Box ref={rootRef} mb={marginBottom}>
      <Avatar variant='filled' size='xl' radius={64} color='dark'>
        <Text fz='xl'>ЖКХ</Text>
      </Avatar>
    </Box>
  )
}

const name = 'avatar', noodlName = 'Avatar', version = '0.0.1'
const AvatarNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    marginBottom: {
      displayName: 'Bottom margin',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px', '%'],
        defaultUnit: 'px',
      },
      default: 24,
    },
  }
}

export default AvatarNode