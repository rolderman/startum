import { Kuzzle } from 'kuzzle-sdk'
import convert from './convert'

const create = async (props) => {
    const debug = window.Rolder.params.debug    
    const index = window.Rolder.params.project
    const dataTypes = window.Rolder?.params.dataTypes
    const { className, body } = props
    className =className + '_v' + dataTypes[className].version

    if (debug > 0) console.time(className + ' create time')
    if (debug > 1) console.log(className + ' props:', props)

    await Kuzzle.connect()
    return Kuzzle.document.create(index, className, body, null, { refresh: 'wait_for' })
        .then((response) => {
            const jsonItem = convert(response)
            if (debug > 1) console.log(className + ' created:', jsonItem)
            if (debug > 0) console.timeEnd(className + ' create time')
            return jsonItem
        })
}
export default create