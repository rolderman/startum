import { noodlInputs } from "../../../../helpers/noodl"
import { Stack, Autocomplete, TextInput, Button, Group } from '@mantine/core'
import { useShallowEffect } from "@mantine/hooks"
import { useForm, isNotEmpty } from "@mantine/form"
import { useState } from 'react'
import query from '../../../../libs/query/v0.0.1/main'

function Comp(props) {
  const { } = props

  const [selectedComplex, setSelectedComplex] = useState('')
  const [selectedHouse, setSelectedHouse] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const { data: complexData } = query.fetch.list(props)
  const complexItems = complexData?.items.map(i => ({ ...i, value: i.name }))

  const [houseDataProps, setHouseDataProps] = useState({ className: 'house' })
  useShallowEffect(() => {
    if (selectedComplex.value) setHouseDataProps({ ...houseDataProps, filters: [{ term: { complexId: selectedComplex.id } }] })
  }, [selectedComplex])

  const { data: houseData } = query.fetch.list(houseDataProps)
  const houseItems = houseData?.items.map(i => ({ ...i, value: i.name }))

  const [areaDataProps, setAreaDataProps] = useState({ className: 'area' })
  useShallowEffect(() => {
    if (selectedHouse.value) setAreaDataProps({ ...areaDataProps, filters: [{ term: { houseId: selectedHouse.id } }] })
  }, [selectedHouse])

  const { data: areaData } = query.fetch.list(areaDataProps)
  const areaItems = areaData?.items.map(i => ({ ...i, value: i.name }))

  const form = useForm({
    initialValues: {
      taskName: '',
      complex: '',
      house: '',
      area: ''
    },
    validate: {
      taskName: isNotEmpty(),
      complex: isNotEmpty(),
      house: isNotEmpty(),
      area: isNotEmpty(),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => console.log('onSubmit', values))}>
      <Stack spacing="xs">
        <TextInput label="Название" placeholder='Напишите название уборки' withAsterisk {...form.getInputProps('taskName')} />
        <Autocomplete
          placeholder='Выберете ЖК'
          label='ЖК'
          withAsterisk
          data={complexItems || []}
          onItemSubmit={(item) => setSelectedComplex(item)}
          {...form.getInputProps('complex')}
        />
        <Autocomplete
          disabled={selectedComplex.value ? false : true}
          placeholder='Выберете объект'
          label='Объект'
          withAsterisk
          limit={10}
          data={houseItems || []}
          onItemSubmit={(item) => setSelectedHouse(item)}
          {...form.getInputProps('house')}
        />
        <Autocomplete
          disabled={selectedHouse.value ? false : true}
          placeholder='Выберете зону'
          label='Зона'
          withAsterisk
          limit={10}
          data={areaItems || []}
          onItemSubmit={(item) => setSelectedArea(item)}
          {...form.getInputProps('area')}
        />
        <Group position="right"><Button type="submit" mt="md">Готово</Button></Group>
      </Stack>
    </form>
  )
}

const name = 'form', noodlName = 'Form', version = '0.0.1'
const FormNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    ...noodlInputs.data
  },
  outputProps: {

  }
}

export default FormNode