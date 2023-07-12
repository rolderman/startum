import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Text } from '@mantine/core'
import { useViewportSize, useElementSize, useShallowEffect } from '@mantine/hooks'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import dayjs from 'dayjs'
import useData from '../../../../libs/use-data/v0.0.2/use-data'
import { getNestedValue } from '../../../../helpers/data/v0.0.2/data'

function Comp(props) {
  const { className, columns, searchEnabled, data, refData, foundedData } = props

  // prepare data  
  const [filteredData, setFilteredData] = useState(undefined)
  const [resultData, setResultData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useShallowEffect(() => {
    if (data) {
      setFilteredData({ [className]: searchEnabled ? foundedData?.[className] : data[className] })
      setIsLoading(false)
    } else setIsLoading(true)
  }, [data, foundedData, searchEnabled])

  useShallowEffect(() => {
    if (data && filteredData?.[className]?.length) {
      searchEnabled && setExpandedIds(filteredData[className].map(d => d.id))
      setResultData(useData.setRefs({ data: filteredData, refData, className }))
    } else setResultData(undefined)
  }, [refData, searchEnabled, filteredData])

  
  const defaultColumnRender = (row, _, accessor) => {
    const cellProps = columns.find(c => c.accessor === accessor).cellProps || {}
    return <Text {...cellProps}>{getNestedValue(row, accessor)}</Text>
  }

  return (
    <DataTable
      columns={columns}
      records={resultData?.[className]}
      fetching={isLoading}
      loaderVariant='dots'
      noRecordsText={null}
      sx={{ background: 'white', width: props.width }}
      defaultColumnRender={defaultColumnRender}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'table',
  noodlName: 'Table',
  version: '0.0.2',
  fieldsDefName: 'table',
  allowChildren: true,
  Comp
}
const TableNode = getReactNode(nodeParams)
export default TableNode