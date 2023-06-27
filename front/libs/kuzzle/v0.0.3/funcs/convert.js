const convert = (kObject) => {    
    let result = kObject._source
    result.id = kObject._id
    return result
}

export default convert