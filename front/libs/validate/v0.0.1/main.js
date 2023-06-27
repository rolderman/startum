const validateSchema = (props) => {
    const keys = Object.keys(props)
    let properties = {}
    keys.forEach(key => {
        properties[key] = { type: props[key] }
        if (props[key] === 'object') properties[key].minProperties = 1
    })

    const schema = {
        type: 'object',
        properties,
        required: keys,
        additionalProperties: true
    }
    return ajv.compile(schema)
}

export default validateSchema