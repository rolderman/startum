export function classVersion(className) {
    const { classes } = window.Rolder.params    
    return className + '_v' + classes[className].version
}

export function dbVersion() {
    const { project, dbVersion } = window.Rolder.params
    return project + '_v' + dbVersion
}