import { dbVersion } from "./versions"

const keys = {
    all: () => [{ backend: window.Rolder?.params.backendType, dbVersion: dbVersion() }],
    className: (className) => [{ ...keys.all()[0], className }],
    command: (command, className) => [{ ...keys.className(className)[0], command }],
    fetch: (props) => [{
        ...keys.command('fetch', props.className)[0],
        query: props.query
            ? {
                bool: {
                    filter: Object.keys(props.query[0]).map(key => ({
                        term: { [key]: props.query[0][key] }
                    }))
                }
            }
            : {},
        sort: props.sort ? props.sort[0] : window.Rolder?.params.classes[props.className].defaultSort,
        options: props.options ? props.options[0] : {}
    }],
    customFetch: (props) => [{
        ...keys.command('customFetch', props.className)[0],
        query: props.query ? props.query[0] : {},
        sort: props.sort ? props.sort[0] : window.Rolder?.params.classes[props.className].defaultSort,
        options: props.options ? props.options[0] : {}
    }],
    mGet: (props) => [{ ...keys.className('mGet', props.className)[0], ids: props.ids }],
    search: (props) => [{
        ...keys.command('search', props.classNames)[0],
        query: props.query[0].searchString
            ? {
                multi_match: {
                    query: props.query[0].searchString,
                    fuzziness: 1,
                    fields: props.query[0].fields
                }
            }
            : {},
        options: props.options ? props.options[0] : {}
    }]
}
export default keys