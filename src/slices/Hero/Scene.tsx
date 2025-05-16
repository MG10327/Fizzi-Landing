'use client' // enables use effect, use state, and use GSAP

import { useRef } from "react"
import {Environment, OrbitControls} from "@react-three/drei"
import FloatingCan from '@/components/FloatingCan'
import { Group } from "three"

import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger) // this is what makes imports like useGSAP and scrollTrigger work.

type Props = {}

const Scene = (props: Props) => {
  const can1Ref = useRef<Group>(null)
  const can2Ref = useRef<Group>(null)
  const can3Ref = useRef<Group>(null)
  const can4Ref = useRef<Group>(null)
  const can5Ref = useRef<Group>(null)

  const can1GroupRef = useRef<Group>(null)
  const can2GroupRef = useRef<Group>(null)

  const groupRef = useRef<Group>(null)

  const FLOAT_SPEED = 1.5

  useGSAP(() => {
    if(
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    ) return // stops if the can refs don't exist


    // now we write our animation
    gsap.set(can1Ref.current.position, {x: -1.5}) // more work with this since its three drei instead of normal jsx we're animating.
    gsap.set(can1Ref.current.position, {z: -0.5})

    gsap.set(can2Ref.current.position, {x: 1.5})
    gsap.set(can2Ref.current.position, {z: 0.5})

    gsap.set(can3Ref.current.position, {y: 5, z: 2})
    gsap.set(can4Ref.current.position, {x: 2, y: 4, z: 2})
    gsap.set(can5Ref.current.position, {y: -5})

    const introTimeline = gsap.timeline({
      defaults: {
        duration: 3,
        ease: 'back.out(1.4)'
      }
    }) // defines our timeline


    if(window.scrollY < 20){
            // now we animate the timeline.
      introTimeline
      .from(can1GroupRef.current.position, {y: -5, x: 1}, 0)
      .from(can1GroupRef.current.position, {z: 3}, 0)
      .from(can2GroupRef.current.position, {y: 5, x: 1}, 0)
      .from(can2GroupRef.current.position, {z: 3}, 0)

    }

    // now we make our scrollTimeline
    const scrollTimeline = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: '.hero',
        start: "top top",
        end: "bottom bottom", // ends at the bottom of the screen
        scrub: 1.5 // scrub based scroll playback
      }
    })

    // now we animate that timeline.
    scrollTimeline
    .to(groupRef.current.rotation, {y: Math.PI * 2}) // 360 degrees.

    // Can 1 black cherry
    .to(can1Ref.current.position, {x: -0.2, y: -0.7, z: -2}, 0) // starts at the start of the scroll timeline.
    .to(can1Ref.current.rotation, {z: 0.3}, 0) // starts at the start of the scroll timeline.


    // Can 2 Lemon lime
    .to(can2Ref.current.position, {x: 1, y: -.2, z: -1}, 0) // starts at the start of the scroll timeline.
    .to(can2Ref.current.rotation, {z: -0.1}, 0) // starts at the start of the scroll timeline.


    // Can 3 grape
    .to(can3Ref.current.position, {x: -0.3, y: 0.5, z: -1}, 0) // starts at the start of the scroll timeline.
    .to(can3Ref.current.rotation, {z: -0.1}, 0) // starts at the start of the scroll timeline.


    // Can 4 strawberry lemonade
    .to(can4Ref.current.position, {x: 0, y: -.3, z: .5}, 0) // starts at the start of the scroll timeline.
    .to(can4Ref.current.rotation, {z: -0.1}, 0) // starts at the start of the scroll timeline.


    // Can 5 watermelon
    .to(can5Ref.current.position, {x: .3, y: -.3, z: .5}, 0) // starts at the start of the scroll timeline.
    .to(can5Ref.current.rotation, {z: -.25}, 0) // starts at the start of the scroll timeline.

    .to(groupRef.current.position, {x: 1, duration: 3, ease: 'sine.inOut'}, 1.3)
  })


  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      </group>

      <group ref={can2GroupRef} >
        <FloatingCan ref={can2Ref} flavor="lemonLime" floatSpeed={FLOAT_SPEED} />
      </group>


      <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />

      <FloatingCan ref={can4Ref} flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED} />

      <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />

      <OrbitControls />
      <Environment files='./hdr/lobby.hdr' environmentIntensity={1.5} />
    </group>
  )
}

export default Scene