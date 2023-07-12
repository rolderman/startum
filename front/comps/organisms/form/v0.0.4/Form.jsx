import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { useForm, isNotEmpty } from "@mantine/form"
import { useShallowEffect } from '@mantine/hooks'
import { useState } from 'react'
import useData from '../../../../libs/use-data/v0.0.2/use-data'

function Comp(props) {
  const { scheme, item, opType } = props

  const form = useForm(scheme)
  props.form(form)

  const useMutate = useData[opType]()
  
  return (
    <form onSubmit={form.onSubmit(() => {      
      props.working(true)      
      useMutate.mutate(item,
        {
          onSuccess: () => {
            props.working(false)
            props.sendCreated()
          }
        }
      )
    })}>
      {props.children}
    </form>
  )
}

function Init(props) {
  const { formScheme } = props

  const [scheme, setScheme] = useState(undefined)
  useShallowEffect(() => {
    if (formScheme) {
      const initialValues = {}
      formScheme.forEach(fs => {
        initialValues[fs.name] = fs.initialValue || ''
      })

      const validate = {}
      formScheme.forEach(fs => {
        const val = null
        switch (fs.validate) {
          case 'isNotEmpty': val = isNotEmpty(); break
          case 'function': val = fs.function; break
        }
        if (val) validate[fs.name] = val
      })

      setScheme({ initialValues, validate })
    }
  }, [formScheme])

  return scheme ? <Comp scheme={scheme} {...props} /> : <></>
}

const nodeParams = {
  name: 'form',
  noodlName: 'Form',
  version: '0.0.4',
  fieldsDefName: 'form',
  allowChildren: true,
  Comp: Init
}
const FormNode = getReactNode(nodeParams)
export default FormNode