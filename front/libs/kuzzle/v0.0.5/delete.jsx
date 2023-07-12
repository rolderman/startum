import ErrorHandler from '../../error-handler/v0.0.1/ErrorHandler'
import { classVersion, dbVersion } from '../../use-data/v0.0.2/versions'
import useData from '../../use-data/v0.0.2/use-data'

const deleteItem = async ({ className, id }) => {
    const { debug, classes } = window.Rolder.params
    const index = dbVersion()
    const classNameV = classVersion(className)

    if (debug > 0) console.time(classNameV + ' delete time')
    if (debug > 1) console.log(classNameV + ' props:', { className, id })

    await Kuzzle.connect()
    return Kuzzle.document.delete(index, classNameV, id, { refresh: 'wait_for' })
        .then((response) => {
            if (!classes[className].subscribe) useData.invalidate({ className })

            if (debug > 1) console.log(classNameV + ' deleted:', response)
            if (debug > 0) console.timeEnd(classNameV + ' delete time')
            return
        })
        .catch((error) => ErrorHandler({ title: 'Системная ошибка!', message: 'Kuzzle delete ' + classNameV + ': ' + error.message }))
}

export default deleteItem