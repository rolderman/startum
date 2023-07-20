import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import useData from '../../../../../libs/use-data/v0.0.2/use-data'
import { MultiSelect } from '@mantine/core'
import { convertForSelect } from '../../../../../helpers/data/v0.0.2/data'

function Comp(props) {
  const { className, query, sorts, options, form, labelField } = props    
  
  const { data } = useData.fetch({ className, query, sorts, options })

  return (
    <MultiSelect
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
  name: 'multi-select-s',
  noodlName: 'MultiSelectS',
  version: '0.0.2',
  fieldsDefName: 'multiSelectS',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const MultiSelectSNode = getReactNode(nodeParams)
export default MultiSelectSNode