export const noodlInputs = {
    data: {
        className: { type: 'string', displayName: 'Class name', group: 'Data' },
        filters: { type: 'array', displayName: 'Filters', group: 'Data', tooltip: "Example: [{ match: { name: { query: 'ta-da!!!'}]" },
        sorts: { type: 'array', displayName: 'Sorts', group: 'Data', tooltip: "Example: [{ 'name.raw': 'asc' }]" },
        options: { type: 'array', displayName: 'Options', group: 'Data', tooltip: "Example: [{ size: 100 }]" },
    },
    inputs: {
        placeholder: { type: 'string', displayName: 'Placeholder', group: 'Text', default: 'Placeholder' },
        label: { type: 'string', displayName: 'Label', group: 'Label', default: 'Label' },
        withAsterisk: { type: 'boolaen', displayName: 'With asterisk', group: 'Label', default: false },
    }
}
export const noodlOutputs = {
    data: {
        selectedItem: { type: 'object', displayName: 'Selected item', group: 'Data' },
        itemSelected: { type: 'signal', displayName: 'Item selected', group: 'Data' },
    },
}