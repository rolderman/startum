import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, id } = props

  const { isLoading, data } = useData.get({ className, id })

  useShallowEffect(() => {
    if (data) props.data(data)
  }, [data])

  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])

  return <></>
}

const nodeParams = {
  name: 'use-data-get',
  noodlName: 'UseDataGet',
  version: '0.0.2',
  fieldsDefName: 'useDataGet',
  allowChildren: false,
  Comp
}
const UseDataGetNode = getReactNode(nodeParams)
export default UseDataGetNode