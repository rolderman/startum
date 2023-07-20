import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import useData from '../../../../../libs/use-data/v0.0.2/use-data'
import { Select } from '@mantine/core'
import { convertForSelect, getValue } from '../../../../../helpers/data/v0.0.2/data'

function Comp(props) {
  const { className, query, sorts, options, form, labelField } = props
  const { data } = useData.fetch({ className, query, sorts, options })
  
  return (
    <Select
      searchable
      nothingFound="Не найдено"
      value={form?.values[className]}
      data={data?.[className].map(i => convertForSelect(i, labelField)) || []}
      error={form?.errors[className]}
      onChange={(item) => form?.setFieldValue(className, item)}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'select-s',
  noodlName: 'SelectS',
  version: '0.0.2',
  fieldsDefName: 'selectS',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const SelectSNode = getReactNode(nodeParams)
export default SelectSNode