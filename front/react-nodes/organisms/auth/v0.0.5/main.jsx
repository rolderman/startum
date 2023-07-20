import auth from '../../../../libs/kuzzle/v0.0.5/auth'
import { Paper, Stack, Button, TextInput, PasswordInput, Group } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useFocusTrap } from "@mantine/hooks"
import { useForm, isNotEmpty } from "@mantine/form"

function Comp(props) {
  const { sessionTimeout } = window.Rolder.params
  const { width } = props

  const loginHandler = values => {
    const { login: username, password } = values
    auth.login({ credentials: { username, password }, expiresIn: sessionTimeout })
      .then((response) => {        
        if (response.error) notifications.show({
          message: response.message,
          color: 'red'
        })
        else {
          props.authenticated()
        }
      })
  }

  const focusTrapRef = useFocusTrap()
  const form = useForm({
    initialValues: { login: '', password: '' },
    validate: {
      login: isNotEmpty(),
      password: isNotEmpty()
    },
  })

  return (
    <Paper shadow="sm" p="md" w={width}>
      <form onSubmit={form.onSubmit((values) => loginHandler(values))}>
        <Stack spacing="xs" ref={focusTrapRef}>
          <TextInput label="Логин" withAsterisk {...form.getInputProps('login')} />
          <PasswordInput label="Пароль" withAsterisk {...form.getInputProps('password')} />
          <Group position="right"><Button type="submit" mt="sm">Вход</Button></Group>
        </Stack>
      </form>
    </Paper>
  )
}

const name = 'auth', noodlName = 'Auth', version = '0.0.5'
const AuthNode = {
  name: 'rolder-kit.' + name + '_v' + version,
  displayName: noodlName + ' v' + version,
  category: noodlName,
  getReactComponent() { return Comp },
  inputProps: {
    width: {
      displayName: 'Width',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px', '%'],
        defaultUnit: 'px',
      },
      default: 300,
    },
  },
  outputProps: {
    authenticated: { type: 'signal', displayName: 'Authenticated', group: 'Auth' },
  }
}

export default AuthNode