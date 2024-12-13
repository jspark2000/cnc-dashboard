import { Line, Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

interface AxesProps {
  position: { x: number; y: number; z: number }
}

const Axes: React.FC<AxesProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(0, 0, 0)
    }
  })

  return (
    <group ref={groupRef}>
      {/* 좌표축 */}
      <Line
        points={[
          [-2, 0, 0],
          [2, 0, 0]
        ]}
        color="red"
        lineWidth={1}
      />
      <Line
        points={[
          [0, -2, 0],
          [0, 2, 0]
        ]}
        color="green"
        lineWidth={1}
      />
      <Line
        points={[
          [0, 0, -2],
          [0, 0, 2]
        ]}
        color="blue"
        lineWidth={1}
      />

      <Sphere position={[position.x, position.y, position.z]} args={[0.5]}>
        <meshBasicMaterial color="black" />
      </Sphere>
    </group>
  )
}

export default Axes
