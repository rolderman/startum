import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, query, sorts, options } = props

  const { isLoading, data } = useData.fetch({ className, query, sorts, options })

  useShallowEffect(() => {
    if (data) props.data(data)
  }, [data])

  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])

  return <></>
}

const nodeParams = {
  name: 'use-data-fetch',
  noodlName: 'UseDataFetch',
  version: '0.0.2',
  fieldsDefName: 'useDataFetch',
  allowChildren: false,
  Comp
}
const UseDataFetchNode = getReactNode(nodeParams)
export default UseDataFetchNode