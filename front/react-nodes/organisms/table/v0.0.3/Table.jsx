import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Text, Avatar, Box, useMantineTheme, Highlight } from '@mantine/core'
import { useShallowEffect, useWindowEvent } from '@mantine/hooks'
import { DataTable } from 'mantine-datatable'
import { getValue } from '../../../../helpers/data/v0.0.2/data'
import { useState } from 'react'

function Comp(props) {
  const { className, data, columns, isLoading, selectable, selectableType, highlightSelectedRow } = props

  const [selectedId, setSelectedId] = useState('')
  const enableOnRowClick = selectable === true && selectableType === 'singleRow'

  // defaults
  useShallowEffect(() => {
    setSelectedId(data?.[className]?.[0].id)
    props.selectedItem(data?.[className]?.[0])
  }, [className])

  const theme = useMantineTheme()

  const ColumnRender = (row, _, accessor) => {
    const columnProps = columns.find(c => c.accessor === accessor)
    const dataType = columnProps.dataType
    const fieldFormat = columnProps.fieldFormat || accessor
    let value = getValue(row, fieldFormat)

    switch (dataType) {
      case 'date': value = dayjs(value).format(columnProps.dateFormat); break
    }
    const columnRender = columnProps.columnRender

    switch (columnRender) {
      case 'avatar':
        return value ? <Avatar m={-6} color="red.4" variant="filled" radius="xl" >{value}</Avatar> : <></>
      case 'cycle':
        return value ? <Box
          sx={(theme) => ({
            height: 16,
            width: 16,
            borderRadius: 8,
            backgroundColor: theme.colors[columnProps.dataMap[value]][6],
          })} /> : <></>
      default: return <Text >{value}</Text>
    }
  }

  return (
    <DataTable
      columns={columns}
      records={data?.[className] || []}
      fetching={isLoading}
      loaderVariant='dots'
      noRecordsText={null}
      defaultColumnRender={ColumnRender}
      sx={{ background: 'white', width: props.width, height: props.height }}
      onRowClick={enableOnRowClick && ((data) => {
        setSelectedId(data.id)
        props.selectedItem(data)
        props.sendSelected()
      })}
      rowStyle={({ id }) => (
        enableOnRowClick && selectedId === id && highlightSelectedRow
          ? { backgroundColor: theme.colors.red[3] }
          : undefined
      )}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'table',
  noodlName: 'Table',
  version: '0.0.3',
  fieldsDefName: 'table',
  allowChildren: false,
  Comp
}
const TableNode = getReactNode(nodeParams)
export default TableNode