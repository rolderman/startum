import { useQuery, useMutation } from "@tanstack/react-query"
import fetch from "../../kuzzle/v0.0.5/fetch"
import mGet from "../../kuzzle/v0.0.5/m-get"
import search from "../../kuzzle/v0.0.5/search"
import create from "../../kuzzle/v0.0.5/create"
import update from "../../kuzzle/v0.0.5/update"
import deleteItem from "../../kuzzle/v0.0.5/delete"
import mDelete from "../../kuzzle/v0.0.5/m-delete"
import keys from "./keys"

function getQueryOptions({ queryKey: [{ command, className, query, ids }] }) {
    const { classes } = window.Rolder.params
    let queryOptions = {}

    switch (command) {
        case 'search': queryOptions.enabled = query?.multi_match?.query.length > 0 ? true : false; break
        //case 'customFetch': queryOptions.enabled = Object.keys(query).length > 0 ? true : false; break
        case 'mGet': queryOptions.enabled = ids?.length > 0 ? true : false; break
    }
    if (command !== 'search' && classes[className].subscribe) {
        queryOptions.staleTime = Infinity
        queryOptions.cacheTime = Infinity
    } else queryOptions.staleTime = 0

    return queryOptions
}

const useData = {
    fetch: (props) => {
        const queryKey = keys.fetch(props)
        const queryOptions = getQueryOptions({ queryKey })
        return useQuery({ queryKey, queryFn: fetch, ...queryOptions })
    },
    customFetch: (props) => {
        const queryKey = keys.customFetch(props)
        const queryOptions = getQueryOptions({ queryKey })
        return useQuery({ queryKey, queryFn: fetch, ...queryOptions })
    },
    mGet: (props) => {
        const queryKey = keys.mGet(props)
        const queryOptions = getQueryOptions({ queryKey })
        return useQuery({ queryKey, queryFn: mGet, ...queryOptions })
    },
    search: (props) => {
        const queryKey = keys.search(props)
        const queryOptions = getQueryOptions({ queryKey })
        return useQuery({ queryKey, queryFn: search, ...queryOptions })
    },
    invalidate: (props) => {
        queryClient.invalidateQueries(keys.className(props.className))
    },
    create: () => useMutation({
        mutationFn: (props) => { create(props) }
    }),
    update: () => useMutation({
        mutationFn: (props) => { update(props) }
    }),
    delete: () => useMutation({
        mutationFn: (props) => { deleteItem(props) }
    }),
    mDelete: () => useMutation({
        mutationFn: (props) => { mDelete(props) }
    })
}

export default useData