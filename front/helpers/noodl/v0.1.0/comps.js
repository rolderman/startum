import { inputs, outputs } from "./shared-props"
const { sx, value, color } = inputs
import groupedInputs from "./grouped-inputs"
const { font, margins, formatedValue } = groupedInputs

const comps = {
  all: {
    in: { sx }
  },
  text: {
    in: { ...margins, ...font, c: color, value },
  },
  formatValue: {
    in: { ...formatedValue },
    out: { value: outputs.value }
  }
}

export default comps