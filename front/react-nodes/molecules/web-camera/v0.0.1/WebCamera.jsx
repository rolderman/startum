import { getReactNode } from '../../../../helpers/noodl/v0.0.2/get-react-node'
import { useState, useRef, useCallback } from 'react'
import Webcam from "react-webcam"
import { Button } from '@mantine/core'

function Comp(props) {
  const { } = props

  const webcamRef = useRef(null)
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };

  const [imgSrc, setImgSrc] = useState(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    props.selectedValue(imageSrc)
    props.sendSelected()
  }, [webcamRef, setImgSrc])

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        {...props}
      />
      <Button onClick={capture}>Capture photo</Button>
    </>
  )
}

const nodeParams = {
  name: 'web-camera',
  noodlName: 'WebCamera',
  version: '0.0.1',
  fieldsDefName: 'webCamera',
  allowChildren: true,
  Comp
}
const WebCameraNode = getReactNode(nodeParams)
export default WebCameraNode