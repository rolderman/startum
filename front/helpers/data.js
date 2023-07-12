export function dataTypeVesrion(className) {
    const { dataTypes } = window.Rolder.params
    return className + '_v' + dataTypes[className].version
}
export function dbVesrion() {
    const { project, dbVersion } = window.Rolder.params    
    return project + '_v' + dbVersion
}