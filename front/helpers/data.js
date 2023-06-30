export function dataTypeVesrion(className) {
    const { dataTypes } = window.Rolder.params    
    return className + '_v' + dataTypes[className].version
}