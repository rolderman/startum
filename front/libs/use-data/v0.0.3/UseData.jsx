import { getReactNode } from '../../../helpers/noodl/v0.0.2/get-react-node'
import { useShallowEffect } from '@mantine/hooks'
import useData from './use-data'
import { useState } from 'react'

function Fetch(props) {
  const { className, query, sorts, options } = props
  const { isLoading, data } = useData.fetch({ className, query, sorts, options })
  useShallowEffect(() => {
    if (data) {
      props.data(data)
      props.sendLoaded()
    }
  }, [data])
  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])
  return <></>
}

function Get(props) {
  const { className, id } = props
  const { isLoading, data } = useData.get({ className, id })
  useShallowEffect(() => {
    if (data) {
      props.data(data)
      props.sendLoaded()
    }
  }, [data])
  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])
  return <></>
}

function MGet(props) {
  const { className, ids } = props
  const { isLoading, data } = useData.mGet({ className, ids })
  useShallowEffect(() => {
    if (data) {
      props.data(data)
      props.sendLoaded()
    }
  }, [data])
  useShallowEffect(() => {
    props.isLoading(isLoading)
  }, [isLoading])
  return <></>
}

function Comp(props) {
  const { useDataEnabled, useDataType, className } = props
  const [enabled, setEnabled] = useState(false)
  const [Comp, setComp] = useState(undefined)

  useShallowEffect(() => {
    if (useDataEnabled && !className) {
      console.warn('There is no className for ' + useDataType + ' node')
    } else if (useDataEnabled) {
      switch (useDataType) {
        case 'fetch': setComp(<Fetch {...props} />); break
        case 'get': setComp(<Get {...props} />); break
        case 'mGet': setComp(<MGet {...props} />); break
      }
      setEnabled(true)
    }
  }, [useDataEnabled])
  return enabled ? Comp : <></>
}

const nodeParams = {
  name: 'use-data',
  noodlName: 'UseData',
  version: '0.0.3',
  fieldsDefName: 'useData',
  allowChildren: false,
  Comp
}
const UseDataNode = getReactNode(nodeParams)
export default UseDataNode