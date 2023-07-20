import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Group, Text, createStyles, Box, px } from '@mantine/core'
import { IconChevronRight, IconMoodSad } from '@tabler/icons-react'
import { useViewportSize, useElementSize, useShallowEffect } from '@mantine/hooks'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import dayjs from 'dayjs'
import useData from '../../../../libs/use-data/v0.0.2/use-data'

// nested style
const useStyles = createStyles((theme) => ({
  expandIcon: {
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(90deg)',
  }
}))

function getNestedValue(obj, nestedKey) {
  const keys = nestedKey.split('.')
  let currentValue = obj
  for (let key of keys) {
    if (currentValue.hasOwnProperty(key)) {
      currentValue = currentValue[key]
    } else {
      return undefined
    }
  }
  return currentValue
}

function Comp(props) {
  const { className, sorts, options, columns, expandable, expandableAccessor, parentItem, refData, foundedData, searchEnabled } = props

  // data
  const { isLoading, data } = useData.fetch({
    className,
    query: parentItem ? [{ [Object.keys(parentItem)[0] + '.id']: parentItem[Object.keys(parentItem)[0]].id }] : undefined,
    sorts,
    options
  })

  // prepare data
  const [expandedIds, setExpandedIds] = useState([])
  const [resultData, setResultData] = useState()
  useShallowEffect(() => {
    const dataWithRefs = {}
    if (searchEnabled) {
      dataWithRefs = useData.setRefs({ foundedData, refData, className })
    } else {
      dataWithRefs = useData.setRefs({ data, refData, className })
    }
       
    setResultData(dataWithRefs)

    console.log('searchEnabled', searchEnabled)
    console.log('foundedData', foundedData)
    console.log('resultData', resultData)

  }, [data, refData, foundedData])

  // ui
  const onExpand = (ids) => {
    if (ids.length > expandedIds.length) props.expandedItem({ [className]: { id: [...ids].pop() } })
    setExpandedIds(ids)
  }

  const { cx, classes } = useStyles()

  const defaultColumnRender = (row, _, accessor) => {
    const cellProps = columns.find(c => c.accessor === accessor).cellProps || {}
    return <Text {...cellProps}>{getNestedValue(row, accessor)}</Text>
  }
  const expandableColumnRender = (row, _, accessor) => {
    const cellProps = columns.find(c => c.accessor === accessor).cellProps || {}
    if (accessor === expandableAccessor) {
      return (
        <Group spacing="xs" noWrap {...cellProps}>
          <IconChevronRight
            size="1rem"
            className={cx(classes.expandIcon, {
              [classes.expandIconRotated]: expandedIds.includes(row.id),
            })}
          />
          <Text>{getNestedValue(row, accessor)}</Text>
        </Group>
      )
    }
  }

  const rowExpansion = {
    allowMultiple: true,
    collapseProps: {
      transitionDuration: 100,
      animateOpacity: false,
    },
    expanded: {
      recordIds: expandedIds, onRecordIdsChange: onExpand
    },
    content: () => props.children
  }

  return (
    <DataTable
      columns={columns}
      records={resultData?.[className]}
      fetching={isLoading}
      loaderVariant='dots'
      noRecordsText={null}
      sx={{ background: 'white', width: props.width }}
      defaultColumnRender={expandable ? expandableColumnRender : defaultColumnRender}
      rowExpansion={expandable && rowExpansion}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'table',
  noodlName: 'Table',
  version: '0.0.1',
  fieldsDefName: 'table',
  allowChildren: true,
  Comp
}
const TableNode = getReactNode(nodeParams)
export default TableNode