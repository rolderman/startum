import fetch from './funcs/fetch'
import create from './funcs/create'
import init from './funcs/init'
import auth from './funcs/auth'

const kuzzle = {
    init: (props) => init(props),
    auth,
    fetch: (props) => fetch(props),
    create: (props) => create(props)
}

export default kuzzle