import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'
import { useState } from 'react'
import { setRefs } from '../../../helpers/data/v0.0.3/data'

function UseData(props) {
  const { useDataType, className, refMap } = props
  const { isLoading, data } = useData[useDataType](props)

  useShallowEffect(() => {
    if (data) {
      const noodlObjects = data[className].map(o => Noodl.Object.create(o))
      Noodl.Object.create({
        id: className,
        items: noodlObjects,
        count: data.totalCount,
        loaded: true
      })
      props.sendLoaded()
      if (props.setRefs) {
        setRefs(refMap[0])
      }
    }
  }, [data])
  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])
  return <></>
}

function Comp(props) {
  const { useDataEnabled, useDataType, className, setRefs, refMap } = props
  const [enabled, setEnabled] = useState(false)

  useShallowEffect(() => {
    if (useDataEnabled && !className) console.warn('There is no className at ' + useDataType + ' node')
    if (setRefs && !refMap) console.warn('There is no refMap at ' + useDataType + ' node')
    else if (useDataEnabled) setEnabled(true)
  }, [useDataEnabled])
  return enabled ? <UseData {...props} /> : <></>
}

const nodeParams = {
  name: 'use-data',
  noodlName: 'UseData',
  version: '0.1.0',
  fieldsDefName: 'useData',
  allowChildren: false,
  Comp
}
const UseDataNode_v_0_1_0 = getReactNode(nodeParams)
export default UseDataNode_v_0_1_0