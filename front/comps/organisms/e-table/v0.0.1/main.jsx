import { useState } from 'react'
import { Group, Text, createStyles, px, TextInput } from '@mantine/core'
import { useShallowEffect, useDebouncedValue } from '@mantine/hooks'
import { IconSearch, IconChevronRight } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { dataTypeVesrion } from '../../../../helpers/data'
import query from '../../../../libs/query/v0.0.1/main'
import convert from '../../../../libs/kuzzle/v0.0.4/funcs/convert'

// nested style
const useStyles = createStyles((theme) => ({
  expandIcon: {
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(90deg)',
  },
  complexName: {
    marginLeft: px(theme.spacing.xl) * 2,
  },
}));

function Comp(props) {
  const { debug, project, dataTypes } = window.Rolder.params
  const { className, subscribe } = props
  className = dataTypeVesrion(className)

  const [filters, setFilters] = useState({})
  const [debouncedFilters] = useDebouncedValue(filters, 200)
  props.filters = debouncedFilters

  // realtime
  useShallowEffect(() => {
    if (subscribe) {
      Kuzzle.realtime.subscribe(project, className, filters || {},
        notif => {
          if (notif.type !== 'document') return
          const newItem = convert(notif.result)
          if (debug > 1) console.log('new ' + className + ' recieved:', newItem)
          query.invalidate(props)
        }
      )
    }
  }, [])


  const { isLoading, data: complexData } = query.fetch.list(props)
  const houseProps = { className: 'house' }
  const { data: houseData } = query.fetch.list(houseProps)

  // columns
  const columns = [
    {
      accessor: 'name',
      title: 'ЖК › Дом › Уборка',
      render: ({ id, name }) => (
        <Group spacing="xs">
          <IconChevronRight
            size="0.9em"
            className={cx(classes.expandIcon, {
              [classes.expandIconRotated]: expandedComplexIds.includes(id),
            })}
          />
          <Text>{name}</Text>
        </Group>
      ),
    },
  ]

  // filters
  /*   columns[1].filter = <TextInput
      placeholder="Поиск ЖК"
      icon={<IconSearch size={16} />}
      value={filters.match?.name.query}
      onChange={(e) => setFilters(() => {
        if (e.currentTarget.value.length > 1) return { match: { name: { query: e.currentTarget.value, operator: 'and', fuzziness: 2 } } }
        else return {}
      })}
    />
    columns[1].filtering = filters !== {} */

  // nesetd
  const [expandedComplexIds, setExpandedComplexIds] = useState([])
  const [expandedHouseIds, setExpandedHouseIds] = useState([])

  const { cx, classes } = useStyles()

  return (
    <DataTable
      columns={columns}
      records={complexData?.items}
      fetching={isLoading}
      borderRadius="md"
      minHeight={40}
      shadow='sm'
      verticalSpacing='sm'
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedComplexIds, onRecordIdsChange: setExpandedComplexIds },
        content: (complex) => (<DataTable
          noHeader
          minHeight={40}
          verticalSpacing='sm'
          columns={[
            {
              accessor: 'name',
              render: ({ id, name }) => (
                <Group ml="lg">
                  <Text>{name}</Text>
                </Group>
              ),
            },
          ]}
          records={houseData?.items.filter(i => i.complexId === complex.record.id)}
        />
        ),
      }}
    />
  )
}

function Init(props) {
  const [inited, setInited] = useState(false)
  useShallowEffect(() => { if (!inited) setInited(true) }, [])
  return (
    <>
      {inited && <Comp {...props}></Comp>}
    </>
  )
}

const name = 'e-table', noodlName = 'ETable', version = '0.0.1'
const ETableNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Init },
  inputProps: {
    className: { type: 'string', displayName: 'Class name', group: 'Data' },
    subscribe: { type: 'boolean', displayName: 'Subscribe', group: 'Data', default: false },
    staleTime: { type: 'number', displayName: 'Stale time (sec)', group: 'Data' },
    columns: { type: 'array', displayName: 'Columns schema', group: 'Table' },
  },
  dynamicports: [
    { condition: 'subscribe = false', inputs: ['staleTime'] }
  ],
}

export default ETableNode