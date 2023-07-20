import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Paper, UnstyledButton } from '@mantine/core'

function Comp(props) {
  const { children } = props


  return (
    <UnstyledButton onClick={() => props.sendSelected()}>
      <Paper {...props} sx={props.sx?.length && { ...props.sx[0] }}>
        {children}
      </Paper>
    </UnstyledButton>
  )
}

const nodeParams = {
  name: 'paper-button',
  noodlName: 'PaperButton',
  version: '0.0.1',
  fieldsDefName: 'paperButton',
  allowChildren: true,
  Comp
}
const PaperButtonNode = getReactNode(nodeParams)
export default PaperButtonNode