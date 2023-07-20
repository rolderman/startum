import { inputs, outputs } from "./props";

export const comps = {
  all: {
    in: { sx: inputs.sx }
  },
  group: {
    in: { position: inputs.groupPosition, grow: inputs.grow, spacing: inputs.spacing, ...inputs.margins, ...inputs.dimensions },
  },
  grid: {
    in: { ...inputs.margins, gutter: inputs.gutter, spans: inputs.spans },
  },
  stack: {
    in: { align: inputs.flexAlign, justify: inputs.flexJustify, spacing: inputs.spacing, ...inputs.margins, ...inputs.dimensions },
  },
  flex: {
    in: { align: inputs.flexAlign2, justify: inputs.flexJustify2, gap: inputs.gap, opacity: inputs.opacity, ...inputs.margins, ...inputs.dimensions, direction: inputs.direction, wrap: inputs.wrap },
  },
  avatar: {
    in: { variant: inputs.variant, size: inputs.size, radius: inputs.radius, ...inputs.margins, color: inputs.color },
  },
  badge: {
    in: {
      variant: inputs.variant, size: inputs.size, radius: inputs.radius, ...inputs.margins, color: inputs.color, text: inputs.text,
      iconName: inputs.iconName, iconSize: inputs.iconSize
    },
  },
  scrollArea: {
    in: { ...inputs.scrollArea },
  },
  icon: {
    in: { ...inputs.icon },
  },
  text: {
    in: { ...inputs.font, ...inputs.margins, c: inputs.color, ...inputs.formatedValue, text: inputs.text },
    dyn: [
      { condition: "formatValue = false", inputs: ['value'] },
      { condition: "formatValue = true", inputs: ['template', 'itemId'] }
    ]
  },
  loader: {
    in: { ...inputs.margins, color: inputs.color, size: inputs.size, variant: inputs.loaderVariant },
  },
  actionIcon: {
    in: {
      ...inputs.margins, variant: inputs.actionVariant, size: inputs.size, radius: inputs.radius, color: inputs.color,
      iconSize: inputs.iconSize, loading: inputs.loading, disabled: inputs.disabled, iconName: inputs.iconName,
    },
    out: { sendClicked: outputs.sendClicked }
  },
  button: {
    in: {
      ...inputs.margins, variant: inputs.actionVariant, size: inputs.size, radius: inputs.radius, color: inputs.color,
      iconSize: inputs.iconSize, loading: inputs.loading, disabled: inputs.disabled, iconName: inputs.iconName, title: inputs.title
    },
    out: { sendClicked: outputs.sendClicked }
  },
  button_v_0_0_2: {
    in: {
      ...inputs.margins, variant: inputs.actionVariant, size: inputs.size, radius: inputs.radius, color: inputs.color,
      iconSize: inputs.iconSize, loading: inputs.loading, disabled: inputs.disabled, iconName: inputs.iconName, ...inputs.formatedValue
    },
    out: { sendClicked: outputs.sendClicked },
    dyn: [
      { condition: "formatValue = false", inputs: ['value'] },
      { condition: "formatValue = true", inputs: ['template', 'itemId'] }
    ]
  },
  popoverButton: {
    in: {
      ...inputs.margins, variant: inputs.actionVariant, size: inputs.size, radius: inputs.radius, color: inputs.color, shadow: inputs.shadow,
      iconSize: inputs.iconSize, loading: inputs.loading, disabled: inputs.disabled, iconName: inputs.iconName, title: inputs.title
    },
    out: { sendClicked: outputs.sendClicked }
  },
  drawer: {
    in: { position: inputs.drawerPosition, drawerTitle: inputs.title, size: inputs.sizeString, show: inputs.show, withCloseButton: inputs.withCloseButton },
    out: { hided: outputs.hided }
  },
  form: {
    in: { formScheme: inputs.formScheme, item: inputs.item, opType: inputs.opType },
    out: { form: outputs.form, working: outputs.working, sendCreated: outputs.sendCreated }
  },
  textInput: {
    in: { ...inputs.form, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder, withAsterisk: inputs.withAsterisk, disabled: inputs.disabled, radius: inputs.radius },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  textInputDebounced: {
    in: {
      ...inputs.form, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder, withAsterisk: inputs.withAsterisk, disabled: inputs.disabled,
      radius: inputs.radius, ...inputs.dimensions, iconSize: inputs.iconSize, loading: inputs.loading, iconName: inputs.iconName
    },
    out: { text: outputs.text, sendTyped: outputs.sendTyped, sendReset: outputs.sendReset },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  textInputS: {
    in: {
      ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder, withAsterisk: inputs.withAsterisk, disabled: inputs.disabled,
      radius: inputs.radius, ...inputs.dimensions, iconSize: inputs.iconSize, iconName: inputs.iconName, classNames: inputs.classNames,
      options: inputs.data.options, feilds: inputs.feilds
    },
    out: { foundedData: outputs.foundedData, searchEnabled: outputs.searchEnabled }
  },
  selectS: {
    in: {
      ...inputs.data, form: inputs.form.form, labelField: inputs.labelField, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder,
      withAsterisk: inputs.withAsterisk, disabled: inputs.disabled, radius: inputs.radius
    },
  },
  select: {
    in: {
      items: inputs.items, ...inputs.form, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder,
      withAsterisk: inputs.withAsterisk, disabled: inputs.disabled, radius: inputs.radius, value: inputs.value, labelField: inputs.labelField
    },
    dyn: [{ condition: "useForm = true", inputs: ["labelField"] }]
  },
  autocomplete: {
    in: {
      items: inputs.items, ...inputs.form, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder,
      withAsterisk: inputs.withAsterisk, disabled: inputs.disabled, radius: inputs.radius
    },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  multiSelectS: {
    in: {
      ...inputs.data, form: inputs.form.form, ...inputs.margins, label: inputs.label, labelField: inputs.labelField, placeholder: inputs.placeholder, withAsterisk: inputs.withAsterisk,
      disabled: inputs.disabled, radius: inputs.radius, clearable: inputs.clearable
    },
  },
  dateTimePicker: {
    in: {
      ...inputs.form, ...inputs.margins, label: inputs.label, placeholder: inputs.placeholder, withAsterisk: inputs.withAsterisk, disabled: inputs.disabled,
      radius: inputs.radius, dateFormat: inputs.dateFormat, limitMinDate: inputs.limitMinDate, daysOffset: inputs.daysOffset
    },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }, { condition: "limitMinDate = true", inputs: ["daysOffset"] }]
  },
  slider: {
    in: { items: inputs.items, ...inputs.form, ...inputs.margins, disabled: inputs.disabled, min: inputs.min, max: inputs.max, step: inputs.step },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  radioGroup: {
    in: { ...inputs.margins, items: inputs.items, direction: inputs.direction, ...inputs.form },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  divider: {
    in: { ...inputs.margins, orientation: inputs.orientation, size: inputs.size, label: inputs.label, variant: inputs.lineVariant }
  },
  paper: {
    in: { ...inputs.margins, shadow: inputs.shadow, radius: inputs.radius, p: inputs.p, withBorder: inputs.withBorder, ...inputs.sxBackgroundColor },
  },
  paperButton: {
    in: { ...inputs.margins, shadow: inputs.shadow, radius: inputs.radius, p: inputs.p, withBorder: inputs.withBorder },
    out: { sendSelected: outputs.sendSelected }
  },
  segmentedControl: {
    in: {
      ...inputs.margins, items: inputs.items, value: inputs.value, orientation: inputs.orientation, ...inputs.form, color: inputs.color, size: inputs.size,
      disabled: inputs.disabled
    },
    out: { selectedValue: outputs.selectedValue },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  checkboxGroup: {
    in: {
      ...inputs.margins, items: inputs.items, direction: inputs.direction, ...inputs.form, color: inputs.color, size: inputs.size, spacing: inputs.spacing, grow: inputs.grow,
      value: inputs.value, disabled: inputs.disabled
    },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  checkbox: {
    in: { ...inputs.form, ...inputs.margins, label: inputs.label, disabled: inputs.disabled, radius: inputs.radius },
    dyn: [{ condition: "useForm = true", inputs: ["formField"] }]
  },
  eTable: {
    in: { ...inputs.margins, ...inputs.eTable, shadow: inputs.shadow, refData: inputs.refData, foundedData: inputs.foundedData, searchEnabled: inputs.searchEnabled },
    out: { selectedItem: outputs.selectedItem, sendViewItem: outputs.sendViewItem, sendEditItem: outputs.sendEditItem, selectedItems: outputs.selectedItems },
  },
  tableS: {
    in: { ...inputs.margins, ...inputs.tableS, shadow: inputs.shadow, ...inputs.data },
    out: { isLoading: outputs.isLoading },
  },
  table: {
    in: { ...inputs.margins, ...inputs.table },
    out: { selectedItem: outputs.selectedItem, sendSelected: outputs.sendSelected },
    dyn: [
      { condition: 'selectable = true', inputs: ['selectableType'] },
      { condition: 'selectable = true && selectableType = singleRow', inputs: ['highlightOnHover', 'highlightSelectedRow'] }
    ],
  },
  appShell: {
    in: { ...inputs.appShell },
    out: { ...outputs.navigation },
    dyn: [
      { condition: 'enableHeader = true', inputs: ['headerHeight'] },
      { condition: 'enableNavbar = true', inputs: ['navbarWidth'] },
      { condition: 'navbarWidth = true', inputs: ['navbarWidthSm', 'navbarWidthLg'] },
    ],
  },
  useData: {
    in: { ...inputs.useData },
    out: { isLoading: inputs.isLoading, sendLoaded: outputs.sendLoaded },
    dyn: [
      { condition: 'setRefs = true', inputs: ['refMap'] },
      { condition: 'useDataType = fetch', inputs: ['query', 'sorts', 'options'] },
      { condition: 'useDataType = get', inputs: ['id'] },
      { condition: 'useDataType = mGet', inputs: ['ids'] },
    ],
  },
  useDataFetch: {
    in: { ...inputs.data },
    out: { data: outputs.data, isLoading: inputs.isLoading }
  },
  useDataGet: {
    in: { className: inputs.data.className, id: inputs.id },
    out: { data: outputs.data, isLoading: inputs.isLoading }
  },
  useDataMGet: {
    in: { className: inputs.data.className, ids: inputs.ids },
    out: { data: outputs.data, isLoading: inputs.isLoading }
  },
  useDataDelete: {
    in: { className: inputs.data.className, id: inputs.id, run: inputs.run },
    out: { sendDeleted: outputs.sendDeleted, working: outputs.working }
  },
  useDataMDelete: {
    in: { className: inputs.data.className, ids: inputs.ids, run: inputs.run },
    out: { sendDeleted: outputs.sendDeleted, working: outputs.working }
  },
  webCamera: {
    out: { selectedValue: outputs.selectedValue, sendSelected: outputs.sendSelected }
  }
}