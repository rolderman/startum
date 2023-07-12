import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, ids } = props

  const { isLoading, data } = useData.mGet({ className, ids })

  useShallowEffect(() => {
    if (data) props.data(data)
  }, [data])

  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])

  return <></>
}

const nodeParams = {
  name: 'use-data-m-get',
  noodlName: 'UseDataMGet',
  version: '0.0.2',
  fieldsDefName: 'useDataMGet',
  allowChildren: false,
  Comp
}
const UseDataMGetNode = getReactNode(nodeParams)
export default UseDataMGetNode