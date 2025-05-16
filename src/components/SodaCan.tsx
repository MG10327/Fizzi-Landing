// this is where we pull in our 3d soda can models.

"use client"

import {useGLTF, useTexture} from "@react-three/drei"
import * as THREE from 'three'

useGLTF.preload('/Soda-can.gltf') // pulls in the 3d model.

const flavorTextures = {
    lemonLime: '/labels/lemon-lime.png',
    grape: 'labels/grape.png',
    blackCherry: '/labels/cherry.png',
    strawberryLemonade: '/labels/strawberry.png',
    watermelon: '/labels/watermelon.png'
}

// metal materials for our 3d object to customize it.
const metalMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: '#bbbbbb',
})

export type SodaCanProps = {
    flavor?: keyof typeof flavorTextures
    scale?: number // optional prop for how large we want the can to be
}

// now we make our soda can component

export function SodaCan({
    flavor = 'blackCherry',
    scale = 2,
    ...props
} : SodaCanProps) {
    const {nodes} = useGLTF('/Soda-can.gltf') // pulls in the 3d soda can object

    const labels = useTexture(flavorTextures) // these are the textures for the labels that we're gonna put on the cans.

    // now we'll fix upside down labels
    labels.strawberryLemonade.flipY = false
    labels.grape.flipY = false
    labels.blackCherry.flipY = false
    labels.lemonLime.flipY = false
    labels.watermelon.flipY = false

    const label = labels[flavor] // this takes in the label flavor prop for the flavor of soda can we call in when we use this component

    return (
        <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.cylinder as THREE.Mesh).geometry}
                material={metalMaterial} // applies the material settings to the soda can that we define above. This will affect all soda cans so its a base setting not a passed in prop.
            />

            <mesh
                castShadow // we want this to have shadows under it
                receiveShadow // we want this to take shadows on itself.
                geometry={(nodes.cylinder as THREE.Mesh).geometry} // we want this to have the physics of a cylinder in three
            >
                <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
                {/* Applies the custom roughness , metalic settings and labels to this mesh */}
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Tab as THREE.Mesh).geometry}
                material={metalMaterial}
            />
        </group>
    )
}