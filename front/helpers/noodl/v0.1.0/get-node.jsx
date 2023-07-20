import { defineNode } from "@noodl/noodl-sdk"
import comps from "./comps"

export const getReactNode = (props) => {
  const { name, noodlName, version, Comp, fieldsDefinitionName, allowChildren, settings } = props

  return {
    name: 'rolder-kit.' + name + '_v' + version,
    displayName: noodlName + ' v' + version,
    category: noodlName,
    allowChildren: allowChildren || false,
    noodlNodeAsProp: true,
    getReactComponent() {
      return function noodleNode(props) {
        if (!props.noodlNode.updateChildIndiciesScheduled) return <Comp {...props} />
        else return <></>
      }
    },
    inputProps: { ...comps[fieldsDefinitionName]?.in, ...comps.all.in },
    outputProps: { ...comps[fieldsDefinitionName]?.out },
    dynamicports: comps[fieldsDefinitionName]?.dyn,
  }
}

export const getNode = (props) => {
  const { name, noodlName, version, fieldsDefinitionName, changed, signals } = props


  return defineNode({
    name: 'rolder-kit.' + name + '_v' + version,
    displayName: noodlName + ' v' + version,
    category: noodlName,
    inputs: { ...comps[fieldsDefinitionName]?.in },
    outputs: { ...comps[fieldsDefinitionName]?.out },
    dynamicports: comps[fieldsDefinitionName]?.dyn,
    changed, signals
  })
}