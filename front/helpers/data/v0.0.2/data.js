export function getNestedValue(obj, nestedKey) {
    if (obj && nestedKey) {
        const keys = nestedKey.split('.')
        let currentValue = obj
        for (let key of keys) {
            if (currentValue.hasOwnProperty(key)) {
                currentValue = currentValue[key]
            } else {
                return undefined
            }
        }
        return currentValue
    } else return undefined
}

export function getValue(obj, nestedKey) {
    if (obj && nestedKey) {
        const hasMustche = nestedKey.split('{{')
        let value = ''
        try {
            if (hasMustche.length > 1) value = Mustache.render(nestedKey, obj)
            else value = Mustache.render('{{' + nestedKey + '}}', obj)
            return value
        } catch (error) {
            return undefined
        }
    } else return undefined
}

export function convertForSelect(obj, nestedKey) {
    if (obj && nestedKey) {
        obj.value = obj.id
        obj.label = getValue(obj, nestedKey)
        return obj
    } else return undefined
}

export function filterBy({ initialData, filterByData, filterMap }) {
    if (initialData && filterByData && filterMap.length) {
        const filteredData = {}
        filterMap.forEach(fMap => {
            fMap.self?.forEach(self => {
                if (fMap.op === 'append') {
                    filteredData[fMap.filter] = filteredData[fMap.filter].concat(
                        initialData[fMap.filter]?.filter(item => {
                            if (fMap.data === 'prevStep') {
                                return filteredData[self]?.map(fd => fd.id).includes(item.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            } else {
                                return filterByData[self]?.map(fd => fd.id).includes(item.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            }
                        }))
                } else {
                    filteredData[fMap.filter] = initialData[fMap.filter]?.filter(item => {
                        if (fMap.data === 'prevStep') return filteredData[self]?.map(fd => fd.id).includes(item.id)
                        else return filterByData[self]?.map(fd => fd.id).includes(item.id)
                    })
                }
            })
            fMap.has?.forEach(has => {
                if (fMap.op === 'append') {
                    filteredData[fMap.filter] = filteredData[fMap.filter].concat(
                        initialData[fMap.filter]?.filter(item => {
                            if (fMap.data === 'prevStep') {
                                return filteredData[has]?.map(fd => fd.id).includes(item[has]?.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            } else {
                                return filterByData[has]?.map(fd => fd.id).includes(item[has]?.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            }
                        }))
                } else {
                    filteredData[fMap.filter] = initialData[fMap.filter]?.filter(item => {
                        if (fMap.data === 'prevStep') return filteredData[has]?.map(fd => fd.id).includes(item[has]?.id)
                        else return filterByData[has]?.map(fd => fd.id).includes(item[has]?.id)
                    })
                }
            })
            fMap.by?.forEach(by => {
                if (fMap.op === 'append') {
                    filteredData[fMap.filter] = filteredData[fMap.filter].concat(
                        initialData[fMap.filter]?.filter(item => {
                            if (fMap.data === 'prevStep') {
                                return filteredData[by]?.map(fd => fd[fMap.filter].id).includes(item.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            } else {
                                return filterByData[by]?.map(fd => fd[fMap.filter].id).includes(item.id)
                                    && filteredData[fMap.filter].map(fd => fd.id !== item.id)
                            }

                        }))
                } else {
                    filteredData[fMap.filter] = initialData[fMap.filter]?.filter(item => {
                        if (fMap.data === 'prevStep') return filteredData[by]?.map(fd => fd[fMap.filter].id).includes(item.id)
                        else return filterByData[by]?.map(fd => fd[fMap.filter].id).includes(item.id)
                    })
                }
            })
        })

        return filteredData
    }
}

export function setRefs(data, classNames) {
    if (data && classNames.length) {
        const dataWithRefs = {}
        classNames.forEach(className => {
            dataWithRefs[className] = data[className]?.map(item => {
                const itemWithRefs = {}
                classNames.forEach(c => {
                    const refItem = data[c]?.find(d => d.id === item[c]?.id)
                    if (refItem) itemWithRefs[c] = refItem
                })
                Object.keys(item).forEach(key => {
                    if (!itemWithRefs[key]) itemWithRefs[key] = item[key]
                })
                return itemWithRefs
            })
        })
        Object.keys(data).forEach(className => {
            if (!dataWithRefs[className]?.length) dataWithRefs[className] = data[className]
        })
        return dataWithRefs
    }
}