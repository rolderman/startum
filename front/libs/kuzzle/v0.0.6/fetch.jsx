import { convertOne } from './convert'
import { classVersion } from '../../use-data/v0.0.2/versions'
import ErrorHandler from '../../error-handler/v0.0.1/ErrorHandler'

const fetch = async ({ queryKey: [{ dbVersion, className, query, sort, options }] }) => {
    const { debug } = window.Rolder?.params
    const classNameV = classVersion(className)

    if (debug > 0) console.time(classNameV + ' fetch time')

    await Kuzzle.connect()
    return Kuzzle.document.search(dbVersion, classNameV, { query, sort }, { ...options })
        .then((response) => {
            const data = {
                [className]: response.hits.map(k => convertOne(k)),
                fetchedCount: response.fetched,
                totalCount: response.total
            }

            if (debug > 0) console.timeEnd(classNameV + ' fetch time')

            return data
        }).catch((error) => ErrorHandler({ title: 'Системная ошибка!', message: 'Kuzzle fetch ' + classNameV + ': ' + error.message }))
}

export default fetch