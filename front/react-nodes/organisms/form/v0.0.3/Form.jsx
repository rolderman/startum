import React from 'react'
import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { useForm, isNotEmpty } from "@mantine/form"
import useData from '../../../../libs/use-data/v0.0.2/use-data'

function Comp(props) {
  const form = useForm({
    initialValues: { taskName: '', complex: {}, house: {}, area: {}, result: [], startDate: new Date(), duration: 120, openTime: 120, liveTime: 240, taskMultiplier: 'single', worker: {}, weekDays: [] },
    validate: {
      taskName: isNotEmpty(), complex: isNotEmpty(), house: isNotEmpty(), area: isNotEmpty(), result: isNotEmpty(), worker: isNotEmpty(),
      weekDays: (value, values) =>
        values.taskMultiplier === 'single'
          ? null
          : value.length
            ? null
            : 'Выберите дни недели',
    },
  })
  props.form(form)

  const useMutate = useData.mutate()

  return (
    <form onSubmit={form.onSubmit((values) => {
      props.creating(true)
      const mutateProps = {
        className: 'task',
        subscribed: props.subscribed,
        body: {
          worker: { id: values.worker.id },
          area: { id: values.area.id },
          house: { id: values.house.id },
          complex: { id: values.complex.id },
          states: { flow: { value: 'planned', title: 'Запланирована' } },
          data: {
            name: values.taskName,
            startDate: { plan: values.startDate }
          }
        }
      }
      useMutate.mutate(mutateProps,
        {
          onSuccess: () => {
            props.creating(false)
            props.sendCreated()
          }
        }
      )
    })}>
      {props.children}
    </form>
  )
}

const nodeParams = {
  name: 'form',
  noodlName: 'Form',
  version: '0.0.3',
  fieldsDefName: 'form',
  propsToCheck: [],
  allowChildren: true,
  Comp
}
const FormNode = getReactNode(nodeParams)
export default FormNode