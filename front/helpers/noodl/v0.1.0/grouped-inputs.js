import { inputs } from "./shared-props"
const { fz, fw, mt, mr, mb, ml, template, itemId } = inputs

const groupedInputs = {
    font: { fz, fw },
    margins: { mt, mr, mb, ml },
    formatedValue: { template, itemId },
}

export default groupedInputs