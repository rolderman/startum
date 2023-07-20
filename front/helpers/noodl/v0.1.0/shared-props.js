import { enums, units, groups } from "./utils"

export const inputs = {
    sx: { type: 'array', displayName: 'Custom sx', group: 'Advanced Style', tooltip: "Example: [{ width: 100 }]" },
    disabled: { type: 'boolean', displayName: 'Disabled', group: groups.style, default: false },
    size: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Size', group: groups.dimensions },
    fz: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Size', group: groups.font },
    fw: { type: { name: 'enum', enums: enums.fontWeights }, displayName: 'Weight', group: groups.font },
    mt: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Margin top', group: groups.layout },
    mr: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Margin right', group: groups.layout },
    mb: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Margin bottom', group: groups.layout },
    ml: { type: { name: 'enum', enums: enums.sizes }, displayName: 'Margin left', group: groups.layout },
    color: { type: { name: 'enum', enums: enums.colors }, displayName: 'Color', group: groups.style },
    value: { type: 'string', displayName: 'Value', group: groups.value },
    template: { type: 'string', displayName: 'Format template', group: groups.value, tooltip: "Example: 'some text {{ content.name }} other text'" },
    itemId: { type: 'string', displayName: 'Item id', group: groups.value },
}

export const outputs = {
    value: { type: 'string', displayName: 'Value', group: groups.data },
}