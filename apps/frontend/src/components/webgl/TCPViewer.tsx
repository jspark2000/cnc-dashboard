import Scene from './Scene'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

interface Props {
  position: { x: number; y: number; z: number }
}

const TCPViewer: React.FC<Props> = ({ position }) => {
  return (
    <Canvas camera={{ position: [18, 18, 18], fov: 45 }}>
      <Scene position={position} />
      <OrbitControls />
    </Canvas>
  )
}

export default TCPViewer
