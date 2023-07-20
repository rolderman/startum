import { getReactNode } from "../../../../helpers/noodl/v0.0.2/get-react-node"
import { Grid } from '@mantine/core'

function Comp(props) {
  return (
    <Grid w='100%' {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      {props.children?.map((child, idx) => <Grid.Col span={props.spans[idx]}>{child}</Grid.Col>)}
    </Grid>
  )
}

const nodeParams = {
  name: 'grid',
  noodlName: 'Grid',
  version: '0.0.1',
  fieldsDefName: 'grid',
  allowChildren: true,
  Comp
}
const GridNode = getReactNode(nodeParams)
export default GridNode