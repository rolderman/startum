import { useQuery, useQueryClient } from "@tanstack/react-query"
import kuzzle from "../../kuzzle/v0.0.3/main"

const keys = {
    all: (className) => [window.Rolder?.params.backendType, { className: className }],
    lists: (className) => [...keys.all(className), 'list'],
    list: (props) => [...keys.lists(props.className), { filters: props.filters, sorts: props.sorts, options: props.options }]
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
            const queryFn = () => window.Rolder?.params.backendType === 'kuzzle' ? kuzzle.fetch(props) : parse.fetch(props)
            const queryOptions = getQueryOptions(props)
            return useQuery({ queryKey, queryFn, ...queryOptions })
        }
    },
    invalidate: (props) => {
        queryClient.invalidateQueries(keys.list(props))
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