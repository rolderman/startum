import { convertOne } from './convert'
import { classVersion } from '../../use-data/v0.0.2/versions'
import ErrorHandler from '../../error-handler/v0.0.1/ErrorHandler'

const get = async ({ queryKey: [{ dbVersion, className, id }] }) => {
    const { debug } = window.Rolder?.params
    const classNameV = classVersion(className)

    if (debug > 0) console.time(classNameV + ' get time')

    await Kuzzle.connect()
    return Kuzzle.document.get(dbVersion, classNameV, id)
        .then((response) => {
            const data = {
                [className]: convertOne(response)
            }

            if (debug > 0) console.timeEnd(classNameV + ' get time')

            return data
        }).catch((error) => ErrorHandler({ title: 'Системная ошибка!', message: 'Kuzzle get ' + classNameV + ': ' + error.message }))
}

export default get