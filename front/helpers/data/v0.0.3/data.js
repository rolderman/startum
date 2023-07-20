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

export function setRefs(refMap) {
    const className = Object.keys(refMap)[0]
    const classNames = refMap[className]
    if (className && classNames.length) {
        const items = Noodl.Objects[className]?.items
        items.forEach(item => {
            classNames.forEach(c => {
                const refItem = Noodl.Objects[item[c].id]
                if (refItem) item[c] = refItem
            })
        })
    }
}