import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Paper } from '@mantine/core'

function Comp(props) {
  const { children, backgroundColor, colorShade } = props


  return (
    <Paper {...props} sx={(theme) => ({ backgroundColor: theme.colors[backgroundColor]?.[colorShade] })}>
      {children}
    </Paper>
  )
}

const nodeParams = {
  name: 'paper',
  noodlName: 'Paper',
  version: '0.0.1',
  fieldsDefName: 'paper',
  allowChildren: true,
  Comp
}
const PaperNode = getReactNode(nodeParams)
export default PaperNode