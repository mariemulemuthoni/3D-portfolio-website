import {Suspense, useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import { OrbitControls, Preload, meshBounds, useGLTF } from '@react-three/drei'; /*Helpers for drawing & importing 3D models*/
import CanvasLoader from '../Loader';

const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh> 
      <hemisphereLight intensity={0.15} groundColor = "black" />
      <pointLight intensity={1} />
      <primitive 
        object ={computer.scene} 
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25}} /*Position and Field of View */
      gl={{ preserveDrawingBuffer: true }} /*necessary to properly render the 3D Model */
    >
      <Suspense fallback={<CanvasLoader />} /*Model loader */> 
        <OrbitControls  /*moves the model left & right & rotates it at a specific angle & axis*/
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} 
        /> 
        <Computers />
      </Suspense>

      <Preload all/>
    </Canvas>
  );
}

export default Computers