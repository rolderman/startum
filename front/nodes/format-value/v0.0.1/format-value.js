import { getNode } from "../../../helpers/noodl/v0.1.0/get-node"

const nodeParams = {
  name: 'format-value',
  noodlName: 'FormatValue',
  version: '0.0.1',
  fieldsDefinitionName: 'formatValue',
  signals: {
    Update: function () { this.setOutputs({ value: Mustache.render(this.inputs.template, Noodl.Objects[this.inputs.itemId]) }) },
  }
}
const FormatValue_v_0_0_1 = getNode(nodeParams)
export default FormatValue_v_0_0_1