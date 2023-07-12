import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { Group, Text, createStyles, Box, px } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
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

function Comp(props) {
  const { searchString } = props

  const { isLoading: isSearching, data: searchedData } = useData.search({ classes: [{ task: '*', area: '*',  worker: '*' }], query: [{ searchString, fields: ['data.name.search'] }], options: [{ size: 100 }] })
  const { isLoading, data } = useData.fetch({ classes: [{ complex: '*', house: '*', area: '*', task: '*', worker: '*' }], options: [{ size: 100 }] })

  // nesetd
  const [expandedComplexIds, setExpandedComplexIds] = useState([])
  const [expandedHouseIds, setExpandedHouseIds] = useState([])

  const [searchEnabled, setSearchEnabled] = useState(false)
  const [resultData, setResultData] = useState(undefined)
  useShallowEffect(() => setSearchEnabled(searchString?.length > 0), [searchString])

  // prepare data after search
  useShallowEffect(() => {
    if (searchEnabled) {
      let tasks = searchedData?.task || []
      tasks = tasks?.concat(data?.task?.filter(t =>
        searchedData?.area?.map(a => a.id).includes(t.area.id)
        || searchedData?.worker?.map(w => w.id).includes(t.worker.id)
        && tasks?.map(ts => ts.id !== t.id)
      ))
      if (tasks?.length) {
        setResultData({
          complex: data.complex?.filter(c => tasks?.map(t => t.complex.id).includes(c.id)),
          house: data.house?.filter(h => tasks?.map(t => t.house.id).includes(h.id)),
          worker: data.worker?.filter(w => tasks?.map(t => t.worker.id).includes(w.id)),
          area: data.area?.filter(a => tasks?.map(t => t.area.id).includes(a.id)),
          task: tasks
        })
      } else setResultData(undefined)

    } else setResultData(data)
  }, [data, searchedData, searchEnabled])

  useShallowEffect(() => {
    if (searchEnabled && resultData?.task.length) {
      setExpandedComplexIds(resultData?.task?.map(c => c.complex.id))
      setExpandedHouseIds(resultData?.task?.map(c => c.house.id))
    }
  }, [resultData])

  const { cx, classes } = useStyles()
  // columns
  const columns = [
    {
      accessor: 'data.name',
      title: 'ЖК › Дом › Уборка',
      width: '20rem',
      ellipsis: true,
      render: ({ id, data }) => (
        <Group spacing="xs" noWrap>
          <IconChevronRight
            size="1rem"
            className={cx(classes.expandIcon, {
              [classes.expandIconRotated]: expandedComplexIds.includes(id),
            })}
          />
          <Text>{data.name}</Text>
        </Group>
      ),
    },
    {
      accessor: 'area',
      title: 'Зона',
      width: '12rem',
      ellipsis: true,
      render: ({ id }) => {
        return (
          <></>/* <Text>{
            [...new Set(taskData?.              .filter(t => houseData?.                .filter(h => h.complex.id === id)
                .map(h => h.id)
                .includes(t.house.id))
              .map(t => t.area.id)
            )].length
          }</Text>*/
        )
      },
    },
    {
      accessor: 'worker',
      title: 'Сотрудник',
      width: '12rem',
      render: ({ id }) => {
        return (
          <></>//<Text>{areaData?.filter(a => houseData?.filter(h => h.complex.id === id).map(h => h.id).includes(a.house.id)).length}</Text>
        )
      },
    },
    {
      accessor: 'data.startDate.plan',
      title: 'Время начала',
      width: '10rem',
    },
    {
      accessor: 'data.state.value',
      title: 'Статус',
      width: '8rem',
    },
  ]

  function EmptyState() {
    return <Text>Нет данных</Text>
  }

  const { height: viewportHeight } = useViewportSize()
  const { ref, height: currentTableHeight } = useElementSize()

  return (
    <Box ref={ref} w='100%'>
      <DataTable
        columns={columns}
        records={resultData?.complex}
        fetching={isLoading || isSearching && searchEnabled}
        borderRadius="md"
        minHeight={90}
        height={currentTableHeight > viewportHeight - px('8rem') ? currentTableHeight : undefined}
        shadow='sm'
        fontSize='sm'
        withColumnBorders
        verticalSpacing='sm'
        emptyState={EmptyState()}
        sx={{ background: 'white' }}
        rowExpansion={{
          allowMultiple: true,
          expanded: {
            recordIds: expandedComplexIds, onRecordIdsChange: setExpandedComplexIds
          },
          content: (complex) => (<DataTable
            noHeader
            minHeight={40}
            verticalSpacing='sm'
            emptyState={EmptyState}
            columns={[
              {
                accessor: 'data.name',
                width: '20rem',
                ellipsis: true,
                render: ({ id, data }) => (
                  <Group ml="1.5rem" spacing="xs" noWrap>
                    <IconChevronRight
                      size="1rem"
                      className={cx(classes.expandIcon, {
                        [classes.expandIconRotated]: expandedHouseIds.includes(id),
                      })}
                    />
                    <Text>{data.name}</Text>
                  </Group>
                ),
              },
              {
                accessor: 'area',
                width: '12rem',
                ellipsis: true,
                render: ({ id }) => {
                  return (
                    <></>//<Text>{[...new Set(taskData?.filter(t => t.house.id === id).map(i => i.area.id))].length}</Text>
                  )
                },
              },
              {
                accessor: 'worker',
                width: '12rem',
                ellipsis: true,
                render: ({ id }) => {
                  return (
                    <></>//<Text>{taskData?.filter(t => t.house.id === id).length}</Text>
                  )
                },
              },
              {
                accessor: 'data.startDate',
                width: '10rem',
                ellipsis: true,
              },
              {
                accessor: 'data.state.value',
                ellipsis: true,
                title: 'Статус',
                width: '8rem',
              },
            ]}
            records={resultData?.house?.filter(i => i.complex.id === complex.record.id)}
            rowExpansion={{
              allowMultiple: true,
              expanded: { recordIds: expandedHouseIds, onRecordIdsChange: setExpandedHouseIds },
              content: (task) => (<DataTable
                noHeader
                minHeight={40}
                verticalSpacing='sm'
                emptyState={EmptyState()}
                columns={[
                  {
                    accessor: 'data.name',
                    width: '20rem',
                    ellipsis: true,
                    render: ({ data }) => (
                      <Group ml='3rem'>
                        <Text>{data.name}</Text>
                      </Group>
                    ),
                  },
                  {
                    accessor: 'area',
                    width: '12rem',
                    render: ({ area }) => {
                      return (
                        <Text>{resultData?.area?.find(a => a.id === area.id)?.data.name}</Text>
                      )
                    },
                  },
                  {
                    accessor: 'worker',
                    width: '12rem',
                    render: ({ worker }) => {
                      return (
                        <Text>{resultData?.worker?.find(w => w.id === worker.id)?.data.name}</Text>
                      )
                    },
                  },
                  {
                    accessor: 'data.startDate.plan',
                    width: '10rem',
                    ellipsis: true,
                    render: ({ data }) => <Text>{dayjs(data.startDate.plan).format('YYYY-MM-DD HH:mm')}</Text>,
                  },
                  {
                    accessor: 'data.state.value',
                    ellipsis: true,
                    title: 'Статус',
                    width: '8rem',
                    render: ({ state }) => <Text>{state.title}</Text>,
                  },
                ]}
                records={resultData?.task?.filter(t => t.house.id === task.record.id)}
              />
              ),
            }}
          />
          ),
        }}
      />
    </Box>
  )
}

const nodeParams = {
  name: 'e-table',
  noodlName: 'ETable',
  version: '0.0.2',
  fieldsDefName: 'eTable',
  allowChildren: false,
  Comp
}
const ETableNode = getReactNode(nodeParams)
export default ETableNode