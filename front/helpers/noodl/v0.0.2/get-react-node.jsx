import { comps } from "./comps"

export const getReactNode = (props) => {
  const { name, noodlName, version, Comp, fieldsDefName, allowChildren } = props

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
    inputProps: { ...comps[fieldsDefName]?.in, ...comps.all.in },
    outputProps: { ...comps[fieldsDefName]?.out },
    dynamicports: comps[fieldsDefName]?.dyn
  }
}