import convert from './convert'

const fetch = async (props) => {
    const debug = window.Rolder?.params.debug
    const index = window.Rolder?.params.project
    let { className, filters, sorts, options } = props
    options = { size: options?.limit || 100 }

    if (debug > 0) console.time(className + ' fetch time')
    if (debug > 1) console.log(className + ' props:', props)

    await Kuzzle.connect()
    return Kuzzle.document.search(index, className, { query: filters, sort: sorts }, { ...options, lang: "koncorde" })
        .then((response) => {
            const jsonItems = response.hits.map(k => convert(k))
            const data = {
                items: jsonItems,
                fetchedCount: response.fetched,
                totalCount: response.total
            }

            if (debug > 1) console.log(className + ' fetched:', data)
            if (debug > 0) console.timeEnd(className + ' fetch time')

            return data
        })
}
export default fetch