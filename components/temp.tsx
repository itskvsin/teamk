"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { Watchman_of_doom_redesign_version_2 } from "./Watchman_of_doom_redesign_version_2";
// import { Hostel_tree_stylized_landscape } from "./Hostel_tree_stylized_landscape";
// import { Cc0__pomelo_citrus_maxima } from "./Cc0__pomelo_citrus_maxima";
// import { Asian_buildings_set } from "./Asian_buildings_set";
// import { Idk } from "./Idk";
// import { TwinkleSparlke } from "./TwinkleSparlke";
// import { Space_station_3 } from "./Space_station_3";
// import { Various_forest_assets_pack } from "./Various_forest_assets_pack";
import { Grass_vegitation_mix } from "./Grass_vegitation_mix";
// import {Coniferous_forest_assets_pack} from "./Coniferous_forest_assets_pack"  
import { useRef } from "react";

// function RotatingSpaceStation() {
//   const ref = useRef();

//   // Infinite rotation
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <group ref={ref} scale={[1, 1.5, 1]}>
//       <Space_station_3 />
//     </group>
//   );
// }

export default function Test() {
  return (
    <div className="h-screen">
      <Canvas className="h-screen flex items-center justify-center bg-black">
        <ambientLight intensity={10} />
        <directionalLight position={[10, 10, 5]} intensity={10} />
        <OrbitControls enableDamping enableZoom />

        {/* <RotatingSpaceStation /> */}

        {/* 🌿 Joined grass patches for one continuous field */}
        <group position={[0, 0, 0]} scale={[2, 2, 2]}>
          <Grass_vegitation_mix position={[0, 0, 0]} />
          <Grass_vegitation_mix position={[2, 0, 0]} />
          <Grass_vegitation_mix position={[-2, 0, 0]}/> 
          <Grass_vegitation_mix position={[0, 0, 2]} />
          <Grass_vegitation_mix position={[0, 0, -2]}/> 
          <Grass_vegitation_mix position={[2, 0, 2]} />
          <Grass_vegitation_mix position={[-2, 0, 2]}/> 
          <Grass_vegitation_mix position={[2, 0, -2]}/> 
          <Grass_vegitation_mix position={[-2, 0, -2]} /> 
        </group> 

        {/* <Coniferous_forest_assets_pack /> */}

        {/* <Various_forest_assets_pack /> */}
      </Canvas>
    </div>
  );
}
