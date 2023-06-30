import { useQuery } from "@tanstack/react-query"
import kuzzle from "../../kuzzle/v0.0.4/main"
import { dataTypeVesrion } from "../../../helpers/data"

const keys = {
    all: (className) => [window.Rolder?.params.backendType, { className: className }],
    lists: (className) => [...keys.all(className), 'list'],
    list: (props) => [
        ...keys.lists(dataTypeVesrion(props.className)),
        {
            filters: props.filters ? props.filters[0] : {},
            sorts: props.sorts ? props.sorts[0] : window.Rolder.params.dataTypes[props.className].defaultSort || {},            
            options: props.options ? props.options[0] : window.Rolder.params.dataTypes[props.className].defaultOptions || {}
        }
    ]
}

function getQueryOptions(props) {
    const staleTime = props.staleTime ? props.staleTime * 1000 : Infinity
    const cacheTime = props.cacheTime ? props.cacheTime * 1000 : Infinity
    return { staleTime, cacheTime }
}

const query = {
    fetch: {
        list: (props) => {
            const queryKey = keys.list(props)
            const queryFn = () => kuzzle.fetch({...queryKey[1], ...queryKey[3]})
            const queryOptions = getQueryOptions(props)
            return useQuery({ queryKey, queryFn, ...queryOptions })
        }
    },
    invalidate: (props) => {
        queryClient.invalidateQueries(keys.lists(props.className))
    },
    updateCache: (props, newItem) => {
        queryClient.setQueryData(keys.list(props), (oldData) => {
            const newData = { ...oldData }
            newData.items.push(newItem)
            newData.fetchedCount = newData.fetchedCount++
            newData.totalCount = newData.totalCount++
            return newData
        })
    }
}

export default query