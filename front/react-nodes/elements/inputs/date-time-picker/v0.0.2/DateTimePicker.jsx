import { getReactNode } from '../../../../../helpers/noodl/v0.0.2/get-react-node'
import { Indicator } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

function Comp(props) {
  const { form, formField, dateFormat, limitMinDate, daysOffset } = props

  return (
    <DateTimePicker
      renderDay={(date) => {        
        const day = date.getDate()
        return (
          <Indicator size={6} color="blue" offset={-5} disabled={dayjs(date).dayOfYear() !== dayjs().dayOfYear()}>
            <div>{day}</div>
          </Indicator>
        )
      }}
      icon={<IconCalendar size="1.25rem" stroke={1.5} />}
      valueFormat={dateFormat}
      minDate={limitMinDate && dayjs().add(daysOffset, 'day').toDate()}
      {...form?.getInputProps(formField)}
      {...props}
    />
  )
}

const nodeParams = {
  name: 'date-time-picker',
  noodlName: 'DateTimePicker',
  version: '0.0.2',
  fieldsDefName: 'dateTimePicker',
  propsToCheck: [],
  allowChildren: false,
  Comp
}
const DateTimePickerNode = getReactNode(nodeParams)
export default DateTimePickerNode