import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Text } from '@mantine/core'
import { useViewportSize, useElementSize, useShallowEffect } from '@mantine/hooks'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import dayjs from 'dayjs'
import useData from '../../../../libs/use-data/v0.0.2/use-data'
import { getNestedValue } from '../../../../helpers/data/v0.0.2/data'

function Comp(props) {
  const { className, query, sorts, options, columns, searchString = '', searchFields } = props

  const [searchEnabled, enableSearch] = useState(false)
  useShallowEffect(() => {
    enableSearch(searchString.length > 0)
  }, [searchString])

  const { isLoading, data } = useData[searchEnabled ? 'search' : 'fetch']({
    className,
    classNames: [className],
    query: searchEnabled ? [{ searchString, fields: searchFields }] : query,
    sorts: !searchEnabled && sorts,
    options
  })
  
  props.isLoading(isLoading)

  const ColumnRender = (row, _, accessor) => {
    const cellProps = columns.find(c => c.accessor === accessor).cellProps || {}
    return <Text {...cellProps}>{getNestedValue(row, accessor)}</Text>
  }

  return (
    <DataTable
      columns={columns}
      records={data?.[className]}
      fetching={isLoading}
      loaderVariant='dots'
      noRecordsText={null}
      sx={{ background: 'white', width: props.width }}
      defaultColumnRender={ColumnRender}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'table-s',
  noodlName: 'TableS',
  version: '0.0.1',
  fieldsDefName: 'tableS',
  allowChildren: false,
  Comp
}
const TableSNode = getReactNode(nodeParams)
export default TableSNode