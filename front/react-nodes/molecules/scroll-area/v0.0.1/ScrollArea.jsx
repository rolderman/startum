import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { ScrollArea } from '@mantine/core'
import { useShallowEffect, useViewportSize } from '@mantine/hooks'
import { useState } from 'react'

function Comp(props) {
  const { children, bottomOffset } = props

  const { height: viewPortHeight } = useViewportSize()
  const [height, setHeight] = useState(undefined)
  useShallowEffect(() => {
    if (viewPortHeight > 0) {
      const scrollHeight = viewPortHeight - bottomOffset
      setHeight(scrollHeight)
    }
  }, [viewPortHeight])

  //const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 })
  //const [paddingRifht, setPaddingRifht] = useState(0)

  /* useShallowEffect(() => {
    if (scrollPosition.y > 0) setPaddingRifht(24)
  }, [scrollPosition]) */

  return (
    <ScrollArea.Autosize mah={height} {...props} sx={props.sx?.length && { ...props.sx[0] }}>
      {children}
    </ScrollArea.Autosize>
  )
}

const nodeParams = {
  name: 'scroll-area',
  noodlName: 'ScrollArea',
  version: '0.0.1',
  fieldsDefName: 'scrollArea',
  allowChildren: true,
  Comp
}
const ScrollAreaNode = getReactNode(nodeParams)
export default ScrollAreaNode