import { noodlInputs } from "../../../../helpers/noodl"
import { Stack, Select, TextInput, Button, Group } from '@mantine/core'
import { useForm, isNotEmpty } from "@mantine/form"
import query from '../../../../libs/query/v0.0.1/main'

const SelectFunc = ({ className, filters, form, disabled, placeholder, label }) => {
  const { data } = query.fetch.list({ className, filters })
  return (
    <Select
      disabled={disabled}
      placeholder={placeholder}
      label={label}
      withAsterisk
      searchable
      nothingFound="Не найдено"
      data={data?.items.map(i => ({ value: i, label: i.name })) || []}
      error={form.errors[className]}
      onChange={(item) => form.setFieldValue(className, item)}
    />
  )
}

function Comp(props) {
  const { } = props

  const form = useForm({
    initialValues: { taskName: '', complex: '', house: '', area: '' },
    validate: { taskName: isNotEmpty(), complex: isNotEmpty(), house: isNotEmpty(), area: isNotEmpty() },
  }) 

  return (
    <form onSubmit={form.onSubmit((values) => console.log('onSubmit', values))}>
      <Stack spacing="xs">
        <TextInput label="Название" placeholder='Напишите название уборки' withAsterisk {...form.getInputProps('taskName')} />
        <SelectFunc {...{ className: 'complex', form, placeholder: 'Выберете ЖК', label: 'ЖК' }} />
        <SelectFunc {...{
          className: 'house',
          filters: form.values.complex && [{ term: { complexId: form.values.complex.id } }],
          disabled: form.values.complex ? false : true,
          form,
          placeholder: 'Выберете объект', label: 'Объект'
        }} />
        <SelectFunc {...{
          className: 'area',
          filters: form.values.house && [{ term: { houseId: form.values.house.id } }],
          disabled: form.values.house ? false : true,
          form,
          placeholder: 'Выберете зону', label: 'Зона'
        }} />
        <Group position="right"><Button type="submit" mt="md">Готово</Button></Group>
      </Stack>
    </form>
  )
}

const name = 'form', noodlName = 'Form', version = '0.0.2'
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