import { ContactShadows, Environment, Sphere, OrbitControls, PerspectiveCamera, Plane, useGLTF, Text} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Camera, Fog, Quaternion} from 'three'
import React, { useRef, useState, useEffect, Suspense } from 'react'
import * as THREE from "three";
import styles from '../styles/scene.module.css'
import useStore from "../store";


export default function Scene() {


  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // const [timer, setTimer] = useState(0)
  // const countRef = useRef(0)

  // function start(){
  //   countRef.current = setInterval(() => {
  //     setTimer((timer) => timer + 1)
  //   }, 1000)
  // }
  
// start()
  let percent = useStore((state)=> state.position)


  const wrapper = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: -1
  };

  const cover = {
    position:"absolute",
    lef: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "var(--color-10)",
    opacity: (percent/100) - 0.3,
    zIndex: 10,
    pointerEvents: "none"

  };


return(



  <div style={wrapper}>
    <div className={styles.cover} style={{opacity: (percent/100) - 0.46}}/>
    <Canvas shadows colorManagement
    // pixelRatio={window.devicePixelRatio}

    style={{width: "100vw", height: "100vh", pointerEvents: "all"}} orthographic={false}  camera={{ position: [10, 8, 10], fov: 60 }}>
      <ambientLight intensity={0.3}/>

      
      <Suspense fallback={null}>
  
      
      {/* <fog attach="fog" args={["white", 0, 100]} /> */}
        <Brain percent={percent} position={[4+(-percent/10), 3, percent/24]} rotation={[0, + (percent + 32.5) * (Math.PI / 180) * 2, 0]} scale={percent * 0.001 + 0.225}/>
        <directionalLight
          castShadow
          position={[10, 30, 20]}
          intensity={2.6}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={80}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          // shadow-camera-near={0.1}
        />
      

      {/* <spotLight position={[0, 5, 0]} angle={1} penumbra={1} intensity={1} castShadow shadow-mapSize={[512, 512]} /> */}
        
   
      
        <Plane
          receiveShadow
          blur={2}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          args={[3000, 3000]}
          material={new THREE.ShadowMaterial({color: "rgb(16, 16, 16)", side: 0, opacity:  (0.07 - (percent * 0.002))})}
        />
  
        
        <Environment files="hdr/hdr.hdr"/>


      </Suspense>

    </Canvas>
  </div>
)

}


function Brain({ position,percent, rotation, scale }) {
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
        {name: 'Rhino', height: 6, delay: 10, radius: 10} , {name: 'Grasshopper', height: 2, delay: 0, radius: 14}
      ]
    }
  
  
  const material_accent = new THREE.MeshStandardMaterial({color: 0xff1e00, roughness: 0.1, metalness: 0.3, flatShading: false, side: 2})
  const material_night = new THREE.MeshStandardMaterial({color: 0x999999, roughness: 0.2, metalness: 0.2, flatShading: false, side: 2})
  const material_day = new THREE.MeshStandardMaterial({color: 0x181818, roughness: 0.14, metalness: 0.5, flatShading: false, side: 2})

  function base_material(){
    if(mode === 'night')
      return material_night
    else
      return material_day
  }

  const value_1 = percent / 8;
  const value_2 = percent / 4;

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
        material={hovered ? material_accent : base_material()}
        position={[-value_1, -value_1, value_1]}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_8.geometry}
        material={base_material()}
        position={[-value_2, value_1, value_2]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_9.geometry}
        material={base_material()}
        position={[value_1, -value_1, value_1]}

      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_10.geometry}
        material={base_material()}
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
        material={base_material()}
        position={[-value_2, value_1, -value_2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_3.geometry}
        material={base_material()}
        position={[value_2, value_1, -value_2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pitua.geometry}
        material={base_material()}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_5.geometry}
        material={base_material()}
        position={[-value_1, -value_1, -value_1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_6.geometry}
        material={base_material()}
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
    <group ref={group} position={[x, y, z ]} scale={percent /100}>
      {/* <Sphere width> */}
      <Sphere material={material} scale={6}>
 
        <Text
          depthTest={false}
          material-toneMapped={false}
          scale={[6,6,6]}
          color="rgb(255, 102, 51)" // default
          anchorX="center" // default
          anchorY="middle" // default
        >
          {name}
        </Text>
      </Sphere>

    </group>

  )
}

useGLTF.preload('/brain.gltf')


useGLTF.preload('/models/VictorianBuilding.gltf')