import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, ids, run } = props

  const useMutate = useData.mDelete()

  useShallowEffect(() => {
    if (run) {
      props.working(true)
      useMutate.mutate({ className, ids },
        {
          onSuccess: () => {
            props.working(false)
            props.sendDeleted()
          }
        }
      )
    }
  }, [run])

  return <></>
}

const nodeParams = {
  name: 'use-data-m-delete',
  noodlName: 'UseDataMDelete',
  version: '0.0.2',
  fieldsDefName: 'useDataMDelete',
  allowChildren: false,
  Comp
}
const UseDataMDeleteNode = getReactNode(nodeParams)
export default UseDataMDeleteNode