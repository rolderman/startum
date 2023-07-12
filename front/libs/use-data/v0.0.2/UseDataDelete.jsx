import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'

function Comp(props) {
  const { className, id, run } = props

  const useMutate = useData.delete()

  useShallowEffect(() => {
    if (run) {
      props.working(true)
      useMutate.mutate({ className, id },
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
  name: 'use-data-delete',
  noodlName: 'UseDataDelete',
  version: '0.0.2',
  fieldsDefName: 'useDataDelete',
  allowChildren: false,
  Comp
}
const UseDataDeleteNode = getReactNode(nodeParams)
export default UseDataDeleteNode