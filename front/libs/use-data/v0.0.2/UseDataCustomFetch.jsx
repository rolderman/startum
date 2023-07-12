import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, query, sorts, options } = props

  const { isLoading, data } = useData.customFetch({ className, query, sorts, options })

  useShallowEffect(() => {
    if (data) props.data(data)
  }, [data])

  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])

  return <></>
}

const nodeParams = {
  name: 'use-data-custom-fetch',
  noodlName: 'UseDataCustomFetch',
  version: '0.0.2',
  fieldsDefName: 'useDataFetch',
  allowChildren: false,
  Comp
}
const UseDataCustomFetch = getReactNode(nodeParams)
export default UseDataCustomFetch