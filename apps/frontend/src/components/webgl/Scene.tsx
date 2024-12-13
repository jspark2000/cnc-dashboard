import Axes from './Axes'
import BackgroundAxes from './BackgroundAxes'
import React from 'react'

interface SceneProps {
  position: { x: number; y: number; z: number }
}

const Scene: React.FC<SceneProps> = ({ position }) => {
  return (
    <>
      <BackgroundAxes />
      <Axes position={position} />
    </>
  )
}

export default Scene
