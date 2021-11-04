import { Environment, PerspectiveCamera, Plane, useGLTF, Text} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, Suspense } from 'react'
import * as THREE from "three";
import styles from '../styles/scene.module.css'
import useStore from "../store";


export default function Scene() {

  let percent = useStore((state)=> state.position)

  const wrapper = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: -1
  };


return(

  <div style={wrapper}>
    <div className={styles.cover} style={{opacity: (percent/100) - 0.40}}/>
    <Canvas shadows colorManagement
    // pixelRatio={window.devicePixelRatio}

    style={{width: "100vw", height: "100vh", pointerEvents: "all"}}>
      <ambientLight intensity={0.3}/>

      <PerspectiveCamera  makeDefault position={[10, 3.3, 16]} fov={60}/>
      <Suspense fallback={null}>
  
      
        {/* <fog attach="fog" args={["white", 0, 100]} /> */}
        <Brain percent={percent} position={[13 + (-percent/7), 10, percent/100]} rotation={[0, + (percent -2) * (Math.PI / 180) * 3, 0]} scale={percent * 0.001 + 0.2}/>
        <directionalLight
          castShadow
          position={[0, 30, 0]}
          intensity={2.6}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={80}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          // shadow-camera-near={0.1}
        />
      
        <Plane
          receiveShadow
          blur={20}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          args={[3000, 3000]}
          material={new THREE.ShadowMaterial({color: "rgb(16, 16, 16)", side: 0, opacity:  (0.07 - (percent * 0.002))})}
        />
        
        <Environment files="hdr/hdr.hdr"/>


      </Suspense>

    </Canvas>
  </div>
)

}


function Brain({ position, percent, rotation, scale }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/brain.gltf')

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const mode = useStore((state)=> state.mode)


  const cloud={
    settings: {
      maxRadius: 10
    },
      nodes: [
        {name: 'RHINO', height: 6, delay: 10, radius: 10} , 
        {name: 'GRASSHOPPER', height: 2, delay: 0, radius: 14},
        {name: 'NODE JS', height: 10, delay: 30, radius: 20} , 
      ]
    }
  
  
  const material_accent = new THREE.MeshStandardMaterial({color: 0xff1e00, roughness: 0.1, metalness: 0.3, flatShading: false, side: 2})
  const material_hover = new THREE.MeshStandardMaterial({color: 0x0000FF, roughness: 0.1, metalness: 0.2, opacity: 0.6, flatShading: false, side: 2})
  const material_night = new THREE.MeshStandardMaterial({color: 0x999999, roughness: 0.2, metalness: 0.2, flatShading: false, side: 2})
  const material_day = new THREE.MeshStandardMaterial({color: 0xA9A9A9, roughness: 0.1, metalness: 0.3, flatShading: false, side: 2})

  function base_material(){
    if(mode === 'night')
      return material_night
    else
      return material_day
  }

  const value_1 = percent / 8;
  const value_2 = percent / 4;

  const assignMaterial=()=>{
    if(active){
      return material_hover
    }
    else if(hovered){
      return material_hover
      
    }
    else{
      return base_material()
    }
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // group.current.rotation.set(0.1 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
    group.current.position.y = (1 + Math.sin(t * 1.4)) / 4
  })
  
  return (
    <group ref={group}
    position={position}
    rotation={rotation}
    scale={scale}
    dispose={null} 
    onPointerOver={(event) => setHover(true)}
    onPointerOut={(event) => setHover(false)}
    onClick={(event) => setActive(!active)}

    >

      <pointLight 
      color="rgb(255, 102, 51)" 
      intensity={percent / 20} 
      position={[0, 1, 0]} 
      distance={percent * 0.6}
      decay={1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_7.geometry}
        material={assignMaterial()}
        position={[-value_1, -value_1, value_1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_8.geometry}
        material={assignMaterial()}
        position={[-value_2, value_1, value_2]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_9.geometry}
        material={assignMaterial()}
        position={[value_1, -value_1, value_1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_10.geometry}
        material={assignMaterial()}
        position={[value_2, value_1, value_2]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cereb.geometry}
        material={material_accent}
        position={[0, -value_1, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_2.geometry}
        material={assignMaterial()}
        position={[-value_2, value_1, -value_2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_3.geometry}
        material={assignMaterial()}
        position={[value_2, value_1, -value_2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pitua.geometry}
        material={material_accent}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_5.geometry}
        material={assignMaterial()}
        position={[-value_1, -value_1, -value_1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_6.geometry}
        material={assignMaterial()}
        position={[value_1, -value_1, -value_1]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stem.geometry}
        material={material_accent}
      />
        <group position={position}>
          {cloud.nodes.map((skill)=>{
            return(<Element percent={percent} name={skill.name} radius={skill.radius} cycle={80} delay={skill.delay} position={[0, skill.height,0]}/>)
          })}
       </group>
    </group>
  )
}


function Element( {cycle, position, percent, delay, radius, name} ){

  const group = useRef()
  const material = new THREE.MeshStandardMaterial({color: 0x999999, roughness: 0.2, metalness: 0.6, opacity: 0.6, transparent: true, flatShading: false, side: 1})


  const x = (Math.sin( (360/cycle) * Math.PI / 180 * (percent + delay)) * radius) + position[0];
  const y = position[1];
  const z = (Math.cos((360/cycle) * Math.PI / 180 * (percent + delay)) * radius) + position[2];


  return(
    <group ref={group} position={[x, y, z ]}  scale={percent /100}>
      {/* <Sphere width> */}
      {/* <Sphere material={material} scale={6}> */}
 
        <Text
          depthTest={false}
          material-toneMapped={false}
          scale={[30,30,30]}
          font="/fonts/Qual.otf"
          color="rgb(255, 102, 51)" // default
          anchorX="center" // default
          anchorY="middle" // default
        >
          {name}
        </Text>
      {/* </Sphere> */}

    </group>

  )
}

useGLTF.preload('/brain.gltf')