import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Group, Text, createStyles, MultiSelect, Box, Stack, Button, ActionIcon, Checkbox, Indicator } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconChevronUp, IconEdit } from '@tabler/icons-react'
import { useViewportSize, useElementSize, useShallowEffect, useSetState, } from '@mantine/hooks'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import { getNestedValue, filterBy, setRefs } from '../../../../helpers/data/v0.0.2/data'

// nested style
const useStyles = createStyles((theme) => ({
  expandIcon: {
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(180deg)',
  }
}))

function Comp(props) {
  const { tableScheme, searchEnabled, data, foundedData } = props

  const [expandedIds, setExpandedIds] = useSetState(() => {
    const ids = {}
    tableScheme?.filter(ts => ts.level < tableScheme.length - 1).forEach(ts => ids[ts.className] = [])
    return ids
  })
  const [selectedData, setSelectedData] = useSetState(() => {
    const sData = {}
    tableScheme[0].columns.filter(c => c.filterScheme)?.forEach(c => sData[c.filterScheme.valueField] = [])
    return sData
  })

  const [selectedRecords, setSelectedRecords] = useState([])

  const [selectedFilters, setSelectedFilters] = useState([])
  const [resultData, setResultData] = useState([])

  useShallowEffect(() => {
    setSelectedRecords([])
    props.selectedItems([])
    if (data) {
      const refs = tableScheme.find(ts => ts.refClasses)?.refClasses || []
      const dataWithRefs = setRefs(data, refs)
      const filteredData = { ...dataWithRefs }

      if (selectedFilters.length) {
        setSelectedData([])
        filteredData.task = []
        dataWithRefs.task.forEach(task => {
          let count = 0
          selectedFilters.forEach(filter => {
            const dataType = tableScheme[0].columns.find(c => c.filterScheme?.valueField === filter).filterScheme.dataType
            switch (dataType) {
              case 'state': if (selectedData[filter].includes(getNestedValue(task, filter))) count++; break
              case 'date': {
                const dateValue = dayjs(getNestedValue(task, filter))
                const filterValue = selectedData[filter]
                if (filterValue[0] && filterValue[1] && dayjs(dateValue).isBetween(filterValue[0], filterValue[1], 'day', '[]')) count++
              }
                break
              default: if (selectedData[filter].includes(task[filter].id)) count++
            }
          })
          if (count === selectedFilters.length) {
            filteredData.task.push(task)
          }
        })
      }

      if (searchEnabled) {
        setSelectedData([])
        filteredData = filterBy({
          initialData: filteredData,
          filterByData: foundedData,
          filterMap: [
            { filter: 'task', self: ['task'] },
            { filter: 'task', has: ['area', 'worker'], op: 'append' },
            { filter: 'house', by: ['task'], data: 'prevStep' },
            { filter: 'complex', by: ['house'], data: 'prevStep' },
          ]
        })
      } else {
        filteredData = filterBy({
          initialData: dataWithRefs,
          filterByData: filteredData,
          filterMap: [
            { filter: 'task', self: ['task'] },
            { filter: 'house', by: ['task'] },
            { filter: 'complex', by: ['house'], data: 'prevStep' },
          ]
        })
      }

      setResultData(filteredData)
      if (searchEnabled || selectedFilters.length) {
        setExpandedIds(() => {
          const ids = {}
          tableScheme?.filter(ts => ts.level < tableScheme.length - 1).forEach(ts =>
            ids[ts.className] = filteredData ? filteredData[ts.className]?.map(d => d.id) : []
          )
          return ids
        })
      }
    }
  }, [data, foundedData, searchEnabled, selectedFilters, selectedData])

  // ui
  const { cx, classes } = useStyles()

  const ColumnRender = (row, _, accessor, currentTableScheme) => {
    const isFirstColumn = currentTableScheme.columns[0].accessor === accessor
    const isSecondColumn = currentTableScheme.columns[1].accessor === accessor
    const expandable = tableScheme[currentTableScheme.level + 1] && isFirstColumn
    const ml = isSecondColumn && currentTableScheme.level
    const currentCellProps = currentTableScheme.columns.find(ts => ts.accessor === accessor)
    const formatedValue = ''
    switch (currentCellProps.type) {
      case 'date': formatedValue = dayjs(getNestedValue(row, accessor)).format(currentCellProps.dateFormat); break
      default: formatedValue = getNestedValue(row, accessor)
    }

    if (expandable) {
      return (
        <ActionIcon
          color="dark"
          onClick={() => {
            const eIds = [...expandedIds[currentTableScheme?.className]]
            if (eIds.includes(row.id)) {
              setExpandedIds({ [currentTableScheme?.className]: eIds.filter(e => e !== row.id) })
            } else {
              eIds.push(row.id)
              setExpandedIds({ [currentTableScheme?.className]: eIds })
            }
          }}
        >
          <IconChevronUp
            size="1rem"
            className={cx(classes.expandIcon, {
              [classes.expandIconRotated]: expandedIds[currentTableScheme.className].includes(row.id),
            })}
          />
        </ActionIcon>
      )
    } else if (currentTableScheme.level === tableScheme.length - 1 && isSecondColumn) {
      return (
        <Group spacing={4} position="apart" ml={ml + 'rem'}>
          <Text>{formatedValue}</Text>
          <Group spacing={4} position="right" noWrap>
            <ActionIcon
              color="dark"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                props.selectedItem(row)
                props.sendEditItem()
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>
      )
    } else if (currentTableScheme.level === tableScheme.length - 1 && isFirstColumn) {
      return (
        <Checkbox
          ml={3}
          radius='md'
          color='dark'
          onClick={(e) => e.stopPropagation()}
          checked={selectedRecords.includes(row.id)}
          onChange={(e) => {
            const sr = [...selectedRecords]
            if (sr.includes(row.id)) {
              setSelectedRecords(sr.filter(e => e !== row.id))
              props.selectedItems(sr.filter(e => e !== row.id))
            } else {
              sr.push(row.id)
              setSelectedRecords(sr)
              props.selectedItems(sr)
            }
          }}
        />
      )
    } else return <Group ml={ml + 'rem'}><Text>{formatedValue}</Text></Group>
  }

  function NestedDataTable(parentItem, parentTableScheme, currentTableScheme) {
    const nextLevelScheme = tableScheme[currentTableScheme.level + 1]
    let currentData = { [currentTableScheme.className]: resultData?.[currentTableScheme.className].filter(d => d[parentTableScheme.className].id === parentItem.record.id) }

    const nestedProps = {
      verticalSpacing: props.verticalSpacing,
      fontSize: props.fontSize,
      ...currentTableScheme.props,
    }

    let ckickRow
    if (nextLevelScheme) ckickRow = false
    else ckickRow = (data) => {
      props.selectedItem(data)
      props.sendViewItem()
    }

    return <DataTable
      columns={currentTableScheme.columns}
      records={currentData?.[currentTableScheme.className]}
      noRecordsText={null}
      noHeader={true}
      defaultColumnRender={(row, _, accessor) => ColumnRender(row, _, accessor, currentTableScheme)}
      onRowClick={ckickRow}
      rowExpansion={nextLevelScheme && {
        allowMultiple: true,
        trigger: 'never',
        collapseProps: {
          transitionDuration: 100,
          animateOpacity: false,
        },
        expanded: { recordIds: expandedIds[currentTableScheme?.className] },
        content: (parentItem) => (nextLevelScheme && NestedDataTable(parentItem, currentTableScheme, nextLevelScheme))
      }}
      scrollAreaProps={{ type: 'never' }}
      highlightOnHover={!nextLevelScheme}
      {...nestedProps}
    />
  }

  // filters
  useShallowEffect(() => {
    let selectedFilters = []
    Object.keys(selectedData).forEach(key => {
      if (selectedData[key]?.length > 0) selectedFilters.push(key)
    })
    setSelectedFilters(selectedFilters)
  }, [selectedData])

  if (tableScheme) {
    const filters = tableScheme[0].columns.filter(c => c.filterScheme)
    if (filters) {
      filters.forEach(column => {
        const filterProps = { ...column.filterScheme }
        column.filtering = selectedData[filterProps.valueField]?.length > 0
        switch (filterProps.type) {
          case 'MultiSelect':
            column.filter = (
              <Box w={filterProps.props.width}>
                <MultiSelect
                  data={data?.[filterProps.valueField].map(item => ({ value: item.id, label: getNestedValue(item, filterProps.labelField) }))}
                  value={selectedData[filterProps.valueField]}
                  nothingFound="Не найдено"
                  onChange={(ids) => setSelectedData({ [filterProps.valueField]: ids })}
                  clearable
                  searchable
                  {...filterProps.props}
                />
              </Box>
            )
            break
          case 'MultiSelectWithData':
            column.filter = (
              <Box w={filterProps.props.width}>
                <MultiSelect
                  data={filterProps.data}
                  value={selectedData[filterProps.valueField]}
                  nothingFound="Не найдено"
                  onChange={(ids) => setSelectedData({ [filterProps.valueField]: ids })}
                  clearable
                  searchable
                  {...filterProps.props}
                />
              </Box>
            )
            break
          case 'DatePicker':
            column.filter = ({ close }) => (
              <Stack>
                <DatePicker
                  type="range"
                  value={selectedData[filterProps.valueField]}
                  onChange={(dates) => setSelectedData({ [filterProps.valueField]: dates })}
                  renderDay={(date) => {
                    const day = date.getDate()
                    return (
                      <Indicator size={6} color="blue" offset={-5} disabled={dayjs(date).dayOfYear() !== dayjs().dayOfYear()}>
                        <div>{day}</div>
                      </Indicator>
                    )
                  }}
                />
                <Button
                  disabled={!selectedData[filterProps.valueField]}
                  color="red"
                  onClick={() => {
                    setSelectedData({ [filterProps.valueField]: [] })
                    close();
                  }}
                >
                  Сбросить
                </Button>
              </Stack>
            )
            break
        }
      })
    }
    // actions    
  }

  return (
    <DataTable
      columns={tableScheme[0]?.columns}
      records={resultData?.[tableScheme[0]?.className]}
      fetching={data ? false : true}
      loaderVariant='dots'
      noRecordsText={null}
      sx={{ background: 'white', width: props.width }}
      defaultColumnRender={(row, _, accessor) => ColumnRender(row, _, accessor, tableScheme[0])}
      rowExpansion={{
        allowMultiple: true,
        trigger: 'never',
        collapseProps: {
          transitionDuration: 100,
          animateOpacity: false,
        },
        expanded: { recordIds: expandedIds[tableScheme[0]?.className] },
        content: (parentItem) => (NestedDataTable(parentItem, tableScheme[0], tableScheme[1]))
      }}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'e-table',
  noodlName: 'ETable',
  version: '0.0.3',
  fieldsDefName: 'eTable',
  allowChildren: true,
  Comp
}
const ETableNode = getReactNode(nodeParams)
export default ETableNode