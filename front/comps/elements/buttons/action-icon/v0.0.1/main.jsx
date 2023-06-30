
import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

function Comp(props) {
  const { marginBottom, sendClicked } = props

  return (
    <ActionIcon
      size="lg"
      radius="md"
      variant="filled"
      color="dark"
      mb={marginBottom}
      onClick={() => sendClicked()}
    >
      <IconPlus size="1.625rem" />
    </ActionIcon>
  )
}

const name = 'action-icon', noodlName = 'ActionIcon', version = '0.0.1'
const ActionIconNode = {
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
  },
  outputProps: {
    sendClicked: { type: 'signal', displayName: 'Clicked' }
  }
}

export default ActionIconNode